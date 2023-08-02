// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

error UnauthorizedCaller();
error UnauthorizedSigner();
error InvalidSignerStatus();

bytes4 constant _INVALID_SIGNER_STATUS_SELECTOR_ = 0xb2e91fb2;

enum SignerStatus {
    Disallowed,
    Allowed,
    Used
}

interface ISignable {
    function checkSigner(address _signer) external view returns (bool);

    function grantSigner(address _signer) external;

    function revokeSigner(address _signer) external;
}
