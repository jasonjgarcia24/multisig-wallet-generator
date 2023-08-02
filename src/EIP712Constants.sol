// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

bytes32 constant _MSG_PREFIX_ = "\x19\x01";

bytes32 constant _DOMAIN_SEPARATOR_TYPE_HASH_ = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
);
