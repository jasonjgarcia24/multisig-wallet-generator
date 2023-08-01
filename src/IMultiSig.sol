// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

error InvalidNonce();
error InsufficientSignatureCount();
error FailedTransfer();

struct WithdrawableInfo {
    uint256 amount;
    address to;
    uint256 nonce;
}

enum SignerStatus {
    Disallowed,
    Allowed,
    Used
}

bytes32 constant _WITHDRAWABLE_TYPE_HASH_ = keccak256(
    "WithdrawableInfo(uint256 amount,address to, uint256 nonce)"
);

interface IMultiSig {
    function withdraw(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) external;
}
