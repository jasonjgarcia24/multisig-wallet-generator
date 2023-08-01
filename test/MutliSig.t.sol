// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";
import {Test} from "forge-std/Test.sol";

import {MultiSig} from "../src/MultiSig.sol";
import {WithdrawableInfo} from "../src/IMultiSig.sol";
import {LibMultiSig} from "../src/LibMultiSig.sol";

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MultiSigHarness is MultiSig {
    constructor(address[] memory _signers) MultiSig(_signers) {}

    function exposed__verifySignature(
        WithdrawableInfo calldata _info,
        uint256 _nonce,
        bytes[] calldata _signatures
    ) external {
        _verifySignature(_info, _nonce, _signatures);
    }
}

contract MutiSigInit is Test {
    MultiSigHarness public multiSigHarness;

    address[] notSigners = new address[](5);
    address[] signers = new address[](5);
    uint256[] privKeys = new uint256[](5);

    function setUp() public {
        (signers[0], privKeys[0]) = makeAddrAndKey("SIGNER_00");
        (signers[1], privKeys[1]) = makeAddrAndKey("SIGNER_01");
        (signers[2], privKeys[2]) = makeAddrAndKey("SIGNER_02");
        (signers[3], privKeys[3]) = makeAddrAndKey("SIGNER_03");
        (signers[4], privKeys[4]) = makeAddrAndKey("SIGNER_04");

        notSigners[0] = makeAddr("NOT_SIGNER_00");
        notSigners[1] = makeAddr("NOT_SIGNER_01");
        notSigners[2] = makeAddr("NOT_SIGNER_02");
        notSigners[3] = makeAddr("NOT_SIGNER_03");
        notSigners[4] = makeAddr("NOT_SIGNER_04");

        multiSigHarness = new MultiSigHarness(signers);
    }

    function test_exposed__verifySignature() public {
        uint256 _nonce = multiSigHarness.nonce();

        WithdrawableInfo memory _info = WithdrawableInfo({
            _amount: 100,
            _to: notSigners[0]
        });

        bytes32 _dataHash = LibMultiSig.hashData(_info, _nonce);

        bytes[] memory _signatures = new bytes[](5);

        for (uint256 i; i < 5; i++) {
            (uint8 _v, bytes32 _r, bytes32 _s) = vm.sign(
                privKeys[i],
                _dataHash
            );

            _signatures[i] = abi.encodePacked(_v, _r, _s);
        }

        multiSigHarness.exposed__verifySignature(_info, _nonce, _signatures);
    }
}
