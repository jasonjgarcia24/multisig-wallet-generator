// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

error UnauthorizedCaller();
error UnauthorizedSigner(address _account);
error InvalidSignatureNonce();

bytes4 constant _INVALID_SIGNER_STATUS_SELECTOR_ = 0xc4689a54;

interface ISignable {
    function checkSigner(address _signer) external view returns (bool);

    function checkNonce(
        address _signer,
        uint256 _nonce
    ) external view returns (bool);

    function grantSigner(address _signer) external;

    function revokeSigner(address _signer) external;
}
