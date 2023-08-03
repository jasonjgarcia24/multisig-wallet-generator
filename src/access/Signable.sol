// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import {UnauthorizedCaller, UnauthorizedSigner, InvalidSignatureNonce} from "../interfaces/ISignable.sol";

uint256 constant _NONCE_POS_ = 8;
uint256 constant _NONCE_MASK_ = 0xff;
uint256 constant _NONCE_MAP_ = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00;
uint256 constant _NONCE_MAX_ = 0x00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

uint256 constant _SIGNER_ADD_ = 0x01;
uint256 constant _SIGNER_RMV_ = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe;

abstract contract Signable {
    uint256 private __nonce;

    address[] public signers;
    mapping(address signer => uint256 nonce) public __signatureNonces;

    constructor(address[] memory _signers) {
        __nonce = 1;

        for (uint256 i = 0; i < _signers.length; i++) _grantSigner(_signers[i]);
    }

    modifier onlySigner() {
        if (!checkSigner(msg.sender)) revert UnauthorizedSigner(msg.sender);
        _;
    }

    modifier nonceUpdater() {
        _;
        __nonce += 1;
    }

    function checkSigner(address _signer) public view returns (bool) {
        return (__signatureNonces[_signer] & _NONCE_MASK_) == 0x01;
    }

    function checkNonce(
        address _signer,
        uint256 _nonce
    ) public view returns (bool) {
        return
            // _nonce must not be greater than max.
            _nonce <= _NONCE_MAX_ &&
            // _nonce must be at least the current nonce.
            _nonce >= __nonce &&
            // _nonce must not be signed off by signer.
            ((__signatureNonces[_signer] & _NONCE_MAP_) >> _NONCE_POS_) <
            _nonce;
    }

    function grantSigner(address _signer) public virtual onlySigner {
        _grantSigner(_signer);
    }

    function revokeSigner(address _signer) public virtual onlySigner {
        _revokeSigner(_signer);
    }

    function _submitSignoff(address _signer, uint256 _nonce) internal {
        __useSignature(_signer, _nonce);
    }

    function _grantSigner(address _signer) internal {
        if (_signer == address(0)) revert UnauthorizedSigner(_signer);

        // Revert if signer already exists.
        if (checkSigner(_signer)) revert UnauthorizedSigner(_signer);

        signers.push(_signer);
        __signatureNonces[_signer] |= _SIGNER_ADD_;
    }

    function _revokeSigner(address _signer) internal {
        // Get index of signer in signers array.
        uint256 i;
        for (i; i < signers.length; ) if (signers[i++] == _signer) break;

        // Revert if signer not found.
        if (i-- > signers.length) revert UnauthorizedSigner(_signer);

        // Swap/pop signer from signers array.
        signers[i] = signers[signers.length - 1];
        signers.pop();

        __signatureNonces[_signer] &= _SIGNER_RMV_;
    }

    function _verifySignature(address _signer, uint256 _nonce) internal view {
        if (!checkNonce(_signer, _nonce)) revert InvalidSignatureNonce();
        if (!checkSigner(_signer)) revert UnauthorizedSigner(_signer);
    }

    function __useSignature(address _signer, uint256 _nonce) private {
        _verifySignature(_signer, _nonce);
        __signatureNonces[_signer] = (_nonce << _NONCE_POS_) | 0x01;
    }
}
