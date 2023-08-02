// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";
import {Setup} from "./Setup.t.sol";

import {MultiSig} from "../../src/MultiSig.sol";
import {WithdrawableInfo} from "../../src/interfaces/IMultiSig.sol";
import {LibMultiSig} from "../../src/cryptography/LibMultiSig.sol";

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MultiSigHarness is MultiSig {
    constructor(
        address[] memory _signers
    ) MultiSig("Test", "1.0.0", _signers) {}

    function exposed__verifySignature(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) external {
        _verifySignature(_info, _signatures);
    }
}

contract MutiSigInit is Setup {
    MultiSigHarness public multiSigHarness;

    function setUp() public override {
        super.setUp();

        multiSigHarness = new MultiSigHarness(signers);
    }

    function test_exposed__verifySignature() public {
        uint256 _nonce = multiSigHarness.nonce();

        WithdrawableInfo memory _info = WithdrawableInfo({
            amount: 100,
            to: notSigners[0],
            nonce: _nonce
        });

        // bytes32 _dataHash = LibMultiSig.hashData(_info);

        // bytes[] memory _signatures = new bytes[](5);

        // for (uint256 i; i < 5; i++) {
        //     (uint8 _v, bytes32 _r, bytes32 _s) = vm.sign(
        //         privKeys[i],
        //         _dataHash
        //     );

        //     _signatures[i] = abi.encodePacked(_v, _r, _s);
        // }

        // multiSigHarness.exposed__verifySignature(_info, _nonce, _signatures);
    }
}
