// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

error InvalidNonce();
error InvalidSignerCount();
error InsufficientSignatureCount();
error FailedTransfer();

struct WithdrawableInfo {
    uint256 amount;
    address to;
    uint256 nonce;
}

bytes32 constant _WITHDRAWABLE_TYPE_HASH_ = keccak256(
    "WithdrawableInfo(uint256 amount,address to,uint256 nonce)"
);

interface IMultiSig {
    event PaymentReceived(
        address indexed from,
        uint256 amount,
        uint256 timestamp
    );

    function withdraw(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) external;
}
