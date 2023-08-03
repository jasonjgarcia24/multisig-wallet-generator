# Multisig Wallet Generator

A generator of mutilsig wallets with a deterministic address.<br>

This project uses the `create2` opcode to generate MultiSig wallets with deterministic addresses.

## Test

```bash
$ npm run test

> multisig-wallet-generator@1.0.0 test
> hh test ; forge test -vv

Compiled 17 Solidity files successfully


  MultiSig
    00 :: Constructor
      ✔ 00.00.00 :: PASS
      ✔ 00.00.01 :: state variables (74ms)
    01 :: Withdraw
      01.00 :: Pass
        ✔ 01.00.00 :: withdraw valid (44ms)
      01.01 :: Fail
        InvalidSignatureCount
          ✔ 01.01.00 :: signature nonce too low
          ✔ 01.01.01 :: signature reuse (48ms)
        InsufficientSignatureCount
          ✔ 01.01.02 :: signature count too low
        UnauthorizedSigner
          ✔ 01.01.03 :: non-signer
          ✔ 01.01.04 :: signature nonce too high
          ✔ 01.01.05 :: signature contract name invalid
          ✔ 01.01.06 :: signature contract version invalid
          ✔ 01.01.07 :: signature chainId invalid
          ✔ 01.01.08 :: signature verifyingContract invalid
    02 :: Revoke Signer
      02.00 :: Pass
        ✔ 02.00.00 :: revoke other signer (88ms)
        ✔ 02.00.01 :: revoke self signer (55ms)
      02.01 :: Fail
        InvalidSignerCount
          ✔ 02.01.00 :: revoke beyond threshold (53ms)
        UnauthorizedSigner
          ✔ 02.01.01 :: revoke non-signer caller (53ms)
    03 :: Grant Signer
      03.00 :: Pass
        ✔ 03.00.00 :: grant signer (83ms)
      03.01 :: Fail
        UnauthorizedSigner
          ✔ 03.01.00 :: grant duplicate signer (54ms)
        UnauthorizedSigner
          ✔ 03.01.01 :: grant non-signer caller (56ms)


  19 passing (2s)

[⠔] Compiling...
No files changed, compilation skipped

Running 1 test for test/foundry/MutliSigFactory.t.sol:MutiSigFactoryTest
[PASS] testDeploy((string,string,uint256,address[]),bytes32) (runs: 256, μ: 11349713, ~: 11312218)
Test result: ok. 1 passed; 0 failed; finished in 2.35s
```
