// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {SignerStatus} from "./IMultiSig.sol";

error InvalidSigner();

library LibSigners {
    function grantSigner(
        mapping(address => SignerStatus) storage _isSigner,
        address _signer
    ) internal {
        _isSigner[_signer] = SignerStatus.Allowed;
    }

    function revokeSigner(
        mapping(address => SignerStatus) storage _isSigner,
        address _signer
    ) internal {
        _isSigner[_signer] = SignerStatus.Disallowed;
    }

    function useSignature(
        mapping(address => SignerStatus) storage _isSigner,
        address _signer
    ) internal {
        _isSigner[_signer] = SignerStatus.Used;
    }

    function checkSigner(
        mapping(address => SignerStatus) storage _isSigner,
        address _signer
    ) public view returns (SignerStatus) {
        return _isSigner[_signer];
    }

    function verifySigner(
        mapping(address => SignerStatus) storage _isSigner,
        address _signer
    ) internal view {
        if (checkSigner(_isSigner, _signer) != SignerStatus.Allowed)
            revert InvalidSigner();
    }
}
