// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import {SignerStatus, UnauthorizedCaller, UnauthorizedSigner, InvalidSignerStatus} from "./ISignable.sol";

abstract contract Signable {
    address immutable _self;
    address[] public signers;
    mapping(address signer => SignerStatus) private __signerStatus;

    constructor(address[] memory _signers) {
        _self = address(this);

        for (uint256 i = 0; i < _signers.length; i++) _grantSigner(_signers[i]);
    }

    modifier onlySigner(address _signer) {
        if (!checkSigner(_signer)) revert UnauthorizedSigner();
        _;
    }

    modifier onlySelf() {
        if (msg.sender != _self) revert UnauthorizedCaller();
        _;
    }

    function checkSigner(address _signer) public view returns (bool) {
        return __signerStatus[_signer] != SignerStatus.Disallowed;
    }

    function submitSignoff(address _signer) external onlySelf {
        _verifySigner(_signer);
        _useSignature(_signer);
    }

    function grantSigner(address _signer) external onlySigner(_signer) {
        _grantSigner(_signer);
    }

    function revokeSigner(address _signer) external onlySigner(_signer) {
        _revokeSigner(_signer);
    }

    function _grantSigner(address _signer) internal {
        __signerStatus[_signer] = SignerStatus.Allowed;
    }

    function _revokeSigner(address _signer) internal {
        __signerStatus[_signer] = SignerStatus.Disallowed;
    }

    function _verifySigner(address _signer) internal view {
        if (__signerStatus[_signer] != SignerStatus.Allowed)
            revert InvalidSignerStatus();
    }

    function _useSignature(address _signer) internal {
        __signerStatus[_signer] = SignerStatus.Used;
    }
}
