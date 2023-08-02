// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import {UnauthorizedCaller, UnauthorizedSigner, InvalidSignatureNonce} from "../interfaces/ISignable.sol";

uint256 constant _NONCE_POS_ = 8;
uint256 constant _NONCE_MASK_ = 0xff;
uint256 constant _NONCE_MAP_ = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00;
uint256 constant _NONCE_MAX_ = 0x00ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

abstract contract Signable {
    address immutable _self;
    uint256 public nonce;

    address[] public signers;
    mapping(address signer => uint256 nonce) public __signatureNonces;

    constructor(address[] memory _signers) {
        _self = address(this);
        nonce = 1;

        for (uint256 i = 0; i < _signers.length; i++) _grantSigner(_signers[i]);
    }

    modifier onlySigner() {
        if (!checkSigner(msg.sender)) revert UnauthorizedSigner(msg.sender);
        _;
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
            // _nonce must be less than the current nonce.
            ((__signatureNonces[_signer] & _NONCE_MAP_) >> _NONCE_POS_) <
            _nonce;
    }

    function _submitSignoff(address _signer, uint256 _nonce) internal {
        _verifySignature(_signer, _nonce);
        __useSignature(_signer, _nonce);
    }

    function grantSigner(address _signer) external onlySigner {
        _grantSigner(_signer);
    }

    function revokeSigner(address _signer) external onlySigner {
        _revokeSigner(_signer);
    }

    function _grantSigner(address _signer) internal {
        __signatureNonces[_signer] |= 0x01;
    }

    function _revokeSigner(address _signer) internal {
        __signatureNonces[_signer] &= 0x00;
    }

    function _verifySignature(address _signer, uint256 _nonce) internal view {
        if (!checkNonce(_signer, _nonce)) revert InvalidSignatureNonce();
        if (!checkSigner(_signer)) revert UnauthorizedSigner(_signer);
    }

    function __useSignature(address _signer, uint256 _nonce) private {
        __signatureNonces[_signer] = (_nonce << _NONCE_POS_) | 0x01;
    }
}
