// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import "./IMultiSig.sol";
import {Signable} from "./Signable.sol";
import {LibMultiSig, _FAIL_WITH_INTENT_SELECTOR_} from "./LibMultiSig.sol";
import {MultiSigDomain} from "./MultiSigDomain.sol";

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MultiSig is ReentrancyGuard, Signable, MultiSigDomain {
    string private __name;
    string private __version;

    uint256 public threshold = 1;
    uint256 public nonce;

    constructor(
        string memory _name,
        string memory _version,
        address[] memory _signers
    ) Signable(_signers) MultiSigDomain(_name, _version) {
        __name = _name;
        __version = _version;
    }

    modifier onlyUnusedNonce(uint256 _nonce) {
        if (_nonce != nonce) revert InvalidNonce();
        _;
        ++nonce;
    }

    function name() external view returns (string memory) {
        return __name;
    }

    function version() external view returns (string memory) {
        return __version;
    }

    function withdraw(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) external nonReentrant {
        _verifySignature(_info, _signatures);
        __transfer(_info);
    }

    function _verifySignature(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) internal onlyUnusedNonce(_info.nonce) {
        if (_signatures.length < threshold) revert InsufficientSignatureCount();

        try
            LibMultiSig.verifySignature(_info, _domainSeparator, _signatures)
        {} catch (bytes memory _err) {
            if (bytes4(_err) != _FAIL_WITH_INTENT_SELECTOR_) _revert(_err);
        }
    }

    function __transfer(WithdrawableInfo calldata _info) private {
        (bool _success, ) = _info.to.call{value: _info.amount}("");
        if (!_success) revert FailedTransfer();
    }

    function _revert(bytes memory _error) internal pure {
        uint256 _lenError = _error.length;
        bytes32 _numError = bytes32(_error);

        assembly {
            mstore(0x00, _numError)
            revert(0x00, _lenError)
        }
    }

    receive() external payable {}
}
