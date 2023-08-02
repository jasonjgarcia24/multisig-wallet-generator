import { expect } from "chai";
import { ethers as hre } from "hardhat";
import { ethers } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { FactoryOptions } from "hardhat/types";
import { MultiSig } from "../../typechain-types";
import { IEIP712Domain, IWithdrawableInfo } from "./utils/types";
import { signTx, ISigner } from "./utils/signatures";

const name = "MultiSig";
const version = "0.0.1";

const withdrawableTypeHash = ethers.keccak256(
    ethers.toUtf8Bytes(
        "WithdrawableInfo(uint256 amount,address to, uint256 nonce)"
    )
);

let signers: HardhatEthersSigner[];
let signersAddr: Array<string>, notSignersAddr: Array<string>;
let multiSig: MultiSig & {
        deploymentTransaction(): ethers.ContractTransactionResponse;
    },
    libMultiSig;

describe("MultiSig", function () {
    before(async function () {
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
        multiSig = await multiSigFactory.deploy(name, version, signersAddr);
        console.log("MultiSig deployed to:", multiSig.target);
    });

    describe("0.0 :: constructor", function () {
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
                nonce: 0,
            };

            const signature = await signTx(signer, domain, withdrawableInfo);

            return { signature, domain, withdrawableInfo };
        }

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

        it("0.0.02 :: Withdraw", async function () {
            // Fund contract
            const tx = await signers[0].sendTransaction({
                to: multiSig.target,
                value: 2,
            });
            await tx.wait();

            const abiCoder = new ethers.AbiCoder();

            // Get domain separator hash

            const { signature } = await EIP712Fixture(signers[0]);

            // const recoverAddress = ethers.verifyTypedData(
            //     EIP712Domain as TypedDataDomain,
            //     WithdrawableInfo as Record,
            //     typeData.message,
            //     signature
            // );

            await multiSig.withdraw(
                { amount: 1, to: notSignersAddr[0], nonce: 0 },
                [signature]
            );
        });
    });
});
