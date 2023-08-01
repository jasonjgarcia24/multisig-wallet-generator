// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./IMultiSig.sol";
import {LibSigners} from "./Signable.sol";
import {LibMultiSig} from "./LibMultiSig.sol";
import {MultiSigDomain} from "./MultiSigDomain.sol";

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MultiSig is ReentrancyGuard, MultiSigDomain {
    using LibMultiSig for *;
    using LibSigners for mapping(address => SignerStatus);

    string private __name;
    string private __version;

    uint256 public threshold = 3;
    uint256 public nonce;

    mapping(address signer => SignerStatus) public _isSigner;

    constructor(
        string memory _name,
        string memory _version,
        address[] memory _signers
    ) MultiSigDomain(_name, _version) {
        __name = _name;
        __version = _version;

        for (uint256 i = 0; i < _signers.length; i++)
            _isSigner.grantSigner(_signers[i]);
    }

    modifier onlyUnusedNonce(uint256 _nonce) {
        if (_nonce != nonce) revert InvalidNonce();
        _;
        ++nonce;
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

        _isSigner.verifySignature(_info, _signatures);

        // try _isSigner.verifySignature(_info, _signatures) {} catch (
        //     bytes memory _err
        // ) {
        //     _revert(_err);
        // }
    }

    function __transfer(WithdrawableInfo calldata _info) private {
        (bool _success, ) = _info._to.call{value: _info._amount}("");
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
}
