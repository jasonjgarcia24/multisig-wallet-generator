import dotenv from "dotenv";
dotenv.config();

import { expect } from "chai";
import { ethers as hre } from "hardhat";
import { Wallet, ethers } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { FactoryOptions } from "hardhat/types";
import { MultiSig } from "../../typechain-types";
import { IEIP712Domain, IWithdrawableInfo } from "./utils/types";
import { signData, recoverSigner, ISigner } from "./utils/signatures";
import * as accounts from "../../accounts.json";

const NAME: string = "MultiSig";
const VERSION: string = "0.0.1";
const threshold: number = 3;

let nonce: number = 1;
let name: string = NAME;
let version: string = VERSION;
let verifyingContract: string;

let signers: HardhatEthersSigner[];
let altNetworkSigners: Wallet[];
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

        const altNetworkProvider = new ethers.JsonRpcProvider(
            `http://localhost:${process.env.TEST_PORT}`
        );

        altNetworkSigners = parseAccounts("signers").map((privKey) => {
            return new hre.Wallet(privKey.toString(), altNetworkProvider);
        });

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

        verifyingContract = multiSig.target as string;

        // Fund contract
        const tx = await signers[0].sendTransaction({
            to: multiSig.target,
            value: 2,
        });
        await tx.wait();
    });

    describe("00 :: Constructor", function () {
        it("00.00.00 :: PASS", async function () {});

        it("00.00.01 :: state variables", async function () {
            expect(await multiSig.name()).to.equal(name);
            expect(await multiSig.version()).to.equal(version);
            expect(await multiSig.threshold()).to.equal(threshold);

            await testSigners();
            await testCheckSigners();
            await testCheckNotSigners();
        });
    });

    describe("01 :: Withdraw", function () {
        async function EIP712Fixture(signer: ISigner) {
            const chainId = await signer.provider
                .getNetwork()
                .then((network: ethers.Network) => network.chainId);

            const domain: IEIP712Domain = {
                name: name,
                version: version,
                chainId: Number(chainId),
                verifyingContract: verifyingContract,
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

        async function eip712SignedFixture(
            signers: Array<HardhatEthersSigner> | Array<Wallet>
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

        describe("01.00 :: Pass", function () {
            it("01.00.00 :: withdraw valid", async function () {
                // Get signatures
                const numSignatures = threshold;
                const _nonce = nonce;

                const signatures = await eip712SignedFixture(
                    signers.slice(0, numSignatures)
                );

                await multiSig.withdraw(
                    { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                    signatures
                );
            });
        });

        describe("01.01 :: Fail", function () {
            describe("InvalidSignatureCount", function () {
                it("01.01.00 :: signature nonce too low", async function () {
                    // Get signatures
                    const numSignatures = threshold;

                    const signatures = await eip712SignedFixture(
                        signers.slice(0, numSignatures)
                    );

                    // Test with too low of a nonce
                    await expect(
                        multiSig.withdraw(
                            { amount: 1, to: notSignersAddr[0], nonce: 0 },
                            signatures
                        )
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "InvalidSignatureNonce"
                    );
                });

                it("01.01.01 :: signature reuse", async function () {
                    // Get signatures
                    const numSignatures = threshold;
                    const _nonce = nonce;

                    const signatures = await eip712SignedFixture(
                        signers.slice(0, numSignatures)
                    );

                    await multiSig.withdraw(
                        { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                        signatures
                    );

                    await expect(
                        multiSig.withdraw(
                            { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                            signatures
                        )
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "InvalidSignatureNonce"
                    );
                });
            });

            describe("InsufficientSignatureCount", function () {
                it("01.01.02 :: signature count too low", async function () {
                    // Get signatures
                    const numSignatures = threshold - 1;
                    const _nonce = nonce;

                    // Test with too little signatures
                    const signatures = await eip712SignedFixture(
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
            });

            describe("UnauthorizedSigner", function () {
                it("01.01.03 :: non-signer", async function () {
                    // Get signatures
                    const numSignatures = threshold;
                    const _nonce = nonce;

                    // Test with non-signer
                    const signatures = await eip712SignedFixture(
                        // Use signers 3, 4 and non-signer 0
                        signers.slice(3, numSignatures + 3)
                    );

                    await expect(
                        multiSig.withdraw(
                            { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                            signatures
                        )
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "UnauthorizedSigner"
                    );
                });

                it("01.01.04 :: signature nonce too high", async function () {
                    // Get signatures
                    const numSignatures = threshold;

                    // Test with too high of a nonce
                    const signatures = await eip712SignedFixture(
                        signers.slice(0, numSignatures)
                    );

                    await expect(
                        multiSig.withdraw(
                            { amount: 1, to: notSignersAddr[0], nonce: nonce },
                            signatures
                        )
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "UnauthorizedSigner"
                    );
                });

                it("01.01.05 :: signature contract name invalid", async function () {
                    // Get signatures
                    const numSignatures = threshold;
                    const _nonce = nonce;
                    name = "InvalidName";

                    // Test with invalid name
                    const signatures = await eip712SignedFixture(
                        signers.slice(0, numSignatures)
                    );

                    await expect(
                        multiSig.withdraw(
                            { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                            signatures
                        )
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "UnauthorizedSigner"
                    );

                    name = NAME;
                });

                it("01.01.06 :: signature contract version invalid", async function () {
                    // Get signatures
                    const numSignatures = threshold;
                    const _nonce = nonce;
                    version = "InvalidVersion";

                    // Test with invalid version
                    const signatures = await eip712SignedFixture(
                        signers.slice(0, numSignatures)
                    );

                    await expect(
                        multiSig.withdraw(
                            { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                            signatures
                        )
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "UnauthorizedSigner"
                    );

                    version = VERSION;
                });

                it("01.01.07 :: signature chainId invalid", async function () {
                    // Get signatures
                    const numSignatures = threshold;
                    const _nonce = nonce;

                    // Test with invalid chainId
                    const signatures = await eip712SignedFixture(
                        altNetworkSigners.slice(0, numSignatures)
                    );

                    await expect(
                        multiSig.withdraw(
                            { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                            signatures
                        )
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "UnauthorizedSigner"
                    );
                });

                it("01.01.08 :: signature verifyingContract invalid", async function () {
                    // Get signatures
                    const numSignatures = threshold;
                    const _nonce = nonce;
                    const _originalVerifyingContract = verifyingContract;
                    verifyingContract =
                        "0xa0Ee7A142d267C1f36714E4a8F75612F20a79720";

                    // Test with invalid verifyingContract
                    const signatures = await eip712SignedFixture(
                        signers.slice(0, numSignatures)
                    );

                    await expect(
                        multiSig.withdraw(
                            { amount: 1, to: notSignersAddr[0], nonce: _nonce },
                            signatures
                        )
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "UnauthorizedSigner"
                    );

                    verifyingContract = _originalVerifyingContract;
                });
            });
        });
    });

    describe("02 :: Revoke Signer", function () {
        describe("02.00 :: Pass", async function () {
            it("02.00.00 :: revoke other signer", async function () {
                await testSigners();
                await testCheckSigners();

                await multiSig.connect(signers[0]).revokeSigner(signersAddr[1]);

                expect(await multiSig.signers(0)).to.equal(signersAddr[0]);
                expect(await multiSig.signers(1)).to.equal(signersAddr[4]);
                expect(await multiSig.signers(2)).to.equal(signersAddr[2]);
                expect(await multiSig.signers(3)).to.equal(signersAddr[3]);

                // address[]: Signable.signers expected to be at storage slot 3.
                expect(
                    parseInt(
                        await hre.provider.getStorage(multiSig.target, 3),
                        16
                    )
                ).to.equal(4);

                expect(await multiSig.checkSigner(signersAddr[0])).to.be.true;
                expect(await multiSig.checkSigner(signersAddr[1])).to.be.false;
                expect(await multiSig.checkSigner(signersAddr[2])).to.be.true;
                expect(await multiSig.checkSigner(signersAddr[3])).to.be.true;
                expect(await multiSig.checkSigner(signersAddr[4])).to.be.true;

                await testCheckNotSigners();
            });

            it("02.00.01 :: revoke self signer", async function () {
                await multiSig.connect(signers[0]).revokeSigner(signersAddr[0]);

                expect(await multiSig.signers(0)).to.equal(signersAddr[4]);
                expect(await multiSig.signers(1)).to.equal(signersAddr[1]);
                expect(await multiSig.signers(2)).to.equal(signersAddr[2]);
                expect(await multiSig.signers(3)).to.equal(signersAddr[3]);

                // address[]: Signable.signers expected to be at storage slot 3.
                expect(
                    parseInt(
                        await hre.provider.getStorage(multiSig.target, 3),
                        16
                    )
                ).to.equal(4);

                expect(await multiSig.checkSigner(signersAddr[0])).to.be.false;
                expect(await multiSig.checkSigner(signersAddr[1])).to.be.true;
                expect(await multiSig.checkSigner(signersAddr[2])).to.be.true;
                expect(await multiSig.checkSigner(signersAddr[3])).to.be.true;
                expect(await multiSig.checkSigner(signersAddr[4])).to.be.true;

                await testCheckNotSigners();
            });
        });

        describe("02.01 :: Fail", async function () {
            describe("InvalidSignerCount", async function () {
                it("02.01.00 :: revoke beyond threshold", async function () {
                    await multiSig
                        .connect(signers[0])
                        .revokeSigner(signersAddr[4]);
                    await multiSig
                        .connect(signers[0])
                        .revokeSigner(signersAddr[3]);

                    // Expect to not allow revoking past threshold.
                    await expect(
                        multiSig
                            .connect(signers[0])
                            .revokeSigner(signersAddr[2])
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "InvalidSignerCount"
                    );

                    expect(await multiSig.signers(0)).to.equal(signersAddr[0]);
                    expect(await multiSig.signers(1)).to.equal(signersAddr[1]);
                    expect(await multiSig.signers(2)).to.equal(signersAddr[2]);

                    // address[]: Signable.signers expected to be at storage slot 3.
                    expect(
                        parseInt(
                            await hre.provider.getStorage(multiSig.target, 3),
                            16
                        )
                    ).to.equal(3);

                    await testCheckNotSigners();
                });
            });

            describe("UnauthorizedSigner", async function () {
                it("02.01.01 :: revoke non-signer caller", async function () {
                    await expect(
                        multiSig
                            .connect(signers[5])
                            .revokeSigner(signersAddr[0])
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "UnauthorizedSigner"
                    );

                    await testSigners();
                    await testCheckSigners();
                    await testCheckNotSigners();
                });
            });
        });
    });

    describe("03 :: Grant Signer", function () {
        describe("03.00 :: Pass", async function () {
            it("03.00.00 :: grant signer", async function () {
                await testSigners();
                await testCheckSigners();

                await multiSig
                    .connect(signers[0])
                    .grantSigner(notSignersAddr[0]);

                expect(await multiSig.signers(0)).to.equal(signersAddr[0]);
                expect(await multiSig.signers(1)).to.equal(signersAddr[1]);
                expect(await multiSig.signers(2)).to.equal(signersAddr[2]);
                expect(await multiSig.signers(3)).to.equal(signersAddr[3]);
                expect(await multiSig.signers(4)).to.equal(signersAddr[4]);
                expect(await multiSig.signers(5)).to.equal(notSignersAddr[0]);

                // address[]: Signable.signers expected to be at storage slot 3.
                expect(
                    parseInt(
                        await hre.provider.getStorage(multiSig.target, 3),
                        16
                    )
                ).to.equal(6);

                await testCheckSigners();

                expect(await multiSig.checkSigner(notSignersAddr[0])).to.be
                    .true;
                expect(await multiSig.checkSigner(notSignersAddr[1])).to.be
                    .false;
                expect(await multiSig.checkSigner(notSignersAddr[2])).to.be
                    .false;
                expect(await multiSig.checkSigner(notSignersAddr[3])).to.be
                    .false;
                expect(await multiSig.checkSigner(notSignersAddr[4])).to.be
                    .false;
            });
        });

        describe("03.01 :: Fail", async function () {
            describe("UnauthorizedSigner", async function () {
                it("03.01.00 :: grant duplicate signer", async function () {
                    // Expect to not allow granting a duplicate signer.
                    await expect(
                        multiSig.connect(signers[0]).grantSigner(signersAddr[0])
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "UnauthorizedSigner"
                    );

                    // address[]: Signable.signers expected to be at storage slot 3.
                    expect(
                        parseInt(
                            await hre.provider.getStorage(multiSig.target, 3),
                            16
                        )
                    ).to.equal(5);

                    await testSigners();
                    await testCheckSigners();
                    await testCheckNotSigners();
                });
            });

            describe("UnauthorizedSigner", async function () {
                it("03.01.01 :: grant non-signer caller", async function () {
                    await expect(
                        multiSig
                            .connect(signers[5])
                            .grantSigner(notSignersAddr[0])
                    ).to.be.revertedWithCustomError(
                        multiSig,
                        "UnauthorizedSigner"
                    );

                    await testSigners();
                    await testCheckSigners();
                    await testCheckNotSigners();
                });
            });
        });
    });
});

async function testSigners() {
    expect(await multiSig.signers(0)).to.equal(signersAddr[0]);
    expect(await multiSig.signers(1)).to.equal(signersAddr[1]);
    expect(await multiSig.signers(2)).to.equal(signersAddr[2]);
    expect(await multiSig.signers(3)).to.equal(signersAddr[3]);
    expect(await multiSig.signers(4)).to.equal(signersAddr[4]);
}

async function testCheckSigners() {
    expect(await multiSig.checkSigner(signersAddr[0])).to.be.true;
    expect(await multiSig.checkSigner(signersAddr[1])).to.be.true;
    expect(await multiSig.checkSigner(signersAddr[2])).to.be.true;
    expect(await multiSig.checkSigner(signersAddr[3])).to.be.true;
    expect(await multiSig.checkSigner(signersAddr[4])).to.be.true;
}

async function testCheckNotSigners() {
    expect(await multiSig.checkSigner(notSignersAddr[0])).to.be.false;
    expect(await multiSig.checkSigner(notSignersAddr[1])).to.be.false;
    expect(await multiSig.checkSigner(notSignersAddr[2])).to.be.false;
    expect(await multiSig.checkSigner(notSignersAddr[3])).to.be.false;
    expect(await multiSig.checkSigner(notSignersAddr[4])).to.be.false;
}

const parseAccounts = (type: string) => {
    // @ts-ignore
    return accounts[type].private_keys.map((privKey) => {
        return BigInt(privKey).toString(16);
    }) as Array<BigInt>;
};
