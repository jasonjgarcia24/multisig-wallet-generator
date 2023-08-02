import { expect } from "chai";
import { ethers as hre } from "hardhat";
import { ethers } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { FactoryOptions } from "hardhat/types";
import { MultiSig } from "../../typechain-types";
import { IEIP712Domain, IWithdrawableInfo } from "./utils/types";
import { signData, recoverSigner, ISigner } from "./utils/signatures";

const name = "MultiSig";
const version = "0.0.1";
const threshold = 3;
let nonce = 1;

let signers: HardhatEthersSigner[];
let signersAddr: Array<string>, notSignersAddr: Array<string>;
let libMultiSig,
    multiSig: MultiSig & {
        deploymentTransaction(): ethers.ContractTransactionResponse;
    };

describe("MultiSig", function () {
    beforeEach(async function () {
        // Deploy the libraries
        libMultiSig = await hre.deployContract("LibMultiSig", []);
        await libMultiSig.waitForDeployment();

        signers = await hre.getSigners();

        const factoryOptions: FactoryOptions = {
            signer: signers[0],
            libraries: {
                LibMultiSig: libMultiSig.target,
            },
        };

        // Get the account addresses
        signersAddr = signers.slice(0, 5).map((signer) => {
            return signer.address;
        });
        notSignersAddr = signers.slice(5, 10).map((signer) => {
            return signer.address;
        });

        // Create the MultiSig factory
        const multiSigFactory = await hre.getContractFactory(
            "MultiSig",
            factoryOptions
        );

        // Deploy the MultiSig contract
        multiSig = await multiSigFactory.deploy(
            name,
            version,
            threshold,
            signersAddr
        );

        // Fund contract
        const tx = await signers[0].sendTransaction({
            to: multiSig.target,
            value: 2,
        });
        await tx.wait();
    });

    describe("0.0 :: constructor", function () {
        it("0.0.00 :: PASS", async function () {});

        it("0.0.01 :: State Variables", async function () {
            expect(await multiSig.name()).to.equal(name);
            expect(await multiSig.version()).to.equal(version);

            expect(await multiSig.checkSigner(signersAddr[0])).to.be.true;
            expect(await multiSig.checkSigner(signersAddr[1])).to.be.true;
            expect(await multiSig.checkSigner(signersAddr[2])).to.be.true;
            expect(await multiSig.checkSigner(signersAddr[3])).to.be.true;
            expect(await multiSig.checkSigner(signersAddr[4])).to.be.true;

            expect(await multiSig.checkSigner(notSignersAddr[0])).to.be.false;
            expect(await multiSig.checkSigner(notSignersAddr[1])).to.be.false;
            expect(await multiSig.checkSigner(notSignersAddr[2])).to.be.false;
            expect(await multiSig.checkSigner(notSignersAddr[3])).to.be.false;
            expect(await multiSig.checkSigner(notSignersAddr[4])).to.be.false;
        });
    });

    describe("0.1 :: withdraw", function () {
        async function EIP712Fixture(signer: ISigner) {
            const chainId = await signers[0].provider
                .getNetwork()
                .then((network: ethers.Network) => network.chainId);

            const domain: IEIP712Domain = {
                name: name,
                version: version,
                chainId: Number(chainId),
                verifyingContract: multiSig.target as string,
            };

            const withdrawableInfo: IWithdrawableInfo = {
                amount: 1,
                to: notSignersAddr[0],
                nonce: nonce,
            };

            const signature = await signData(signer, domain, withdrawableInfo);
            const recoveredAddress = recoverSigner(
                domain,
                withdrawableInfo,
                signature
            );

            return { signature, domain, withdrawableInfo, recoveredAddress };
        }

        async function getSignatures(
            signers: Array<HardhatEthersSigner>
        ): Promise<string[]> {
            const signatures = await Promise.all(
                signers.map(async (signer) => {
                    const { signature, recoveredAddress } = await EIP712Fixture(
                        signer as unknown as ISigner
                    );

                    expect(recoveredAddress).to.equal(signer.address);

                    return signature;
                })
            );

            nonce += 1;

            return signatures;
        }

        it("0.1.00 :: Withdraw Pass", async function () {
            // Get signatures
            const numSignatures = threshold;
            const _nonce = nonce;

            const signatures = await getSignatures(
                signers.slice(0, numSignatures)
            );

            await multiSig.withdraw(
                { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                signatures
            );
        });

        it("0.1.01 :: Withdraw Fail :: InvalidSignatureNonce", async function () {
            // Get signatures
            const numSignatures = threshold;

            const signatures = await getSignatures(
                signers.slice(0, numSignatures)
            );

            // Test with too low of a nonce
            await expect(
                multiSig.withdraw(
                    { amount: 1, to: notSignersAddr[0], nonce: 0 },
                    signatures
                )
            ).to.be.revertedWithCustomError(multiSig, "InvalidSignatureNonce");
        });

        it("0.1.02 :: Withdraw Fail :: InsufficientSignatureCount", async function () {
            // Get signatures
            const numSignatures = threshold - 1;
            const _nonce = nonce;

            // Test with too little signatures
            const signatures = await getSignatures(
                signers.slice(0, numSignatures)
            );

            await expect(
                multiSig.withdraw(
                    { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                    signatures
                )
            ).to.be.revertedWithCustomError(
                multiSig,
                "InsufficientSignatureCount"
            );
        });

        it("0.1.03 :: Withdraw Fail :: UnauthorizedSigner", async function () {
            // Get signatures
            const numSignatures = threshold;
            const _nonce = nonce;

            // Test with non-signer
            let signatures = await getSignatures(
                // Use signers 3, 4 and non-signer 0
                signers.slice(3, numSignatures + 3)
            );

            await expect(
                multiSig.withdraw(
                    { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                    signatures
                )
            ).to.be.revertedWithCustomError(multiSig, "UnauthorizedSigner");

            // Test with too high of a nonce
            signatures = await getSignatures(signers.slice(0, numSignatures));

            await expect(
                multiSig.withdraw(
                    { amount: 1, to: notSignersAddr[0], nonce: nonce },
                    signatures
                )
            ).to.be.revertedWithCustomError(multiSig, "UnauthorizedSigner");
        });
    });
});
