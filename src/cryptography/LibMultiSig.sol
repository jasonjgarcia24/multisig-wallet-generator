// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import {_MSG_PREFIX_, _DOMAIN_SEPARATOR_TYPE_HASH_} from "./EIP712Constants.sol";
import {WithdrawableInfo, _WITHDRAWABLE_TYPE_HASH_} from "../interfaces/IMultiSig.sol";

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

library LibMultiSig {
    struct DomainSeparator {
        string name;
        string version;
        uint256 chainId;
        address contractAddress;
    }

    function domainSeparator(
        DomainSeparator memory _domainSeparator
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    _DOMAIN_SEPARATOR_TYPE_HASH_,
                    keccak256(bytes(_domainSeparator.name)),
                    keccak256(bytes(_domainSeparator.version)),
                    _domainSeparator.chainId,
                    _domainSeparator.contractAddress
                )
            );
    }

    function hashStruct(
        WithdrawableInfo calldata _info
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    _WITHDRAWABLE_TYPE_HASH_,
                    _info.amount,
                    _info.to,
                    _info.nonce
                )
            );
    }

    function hashData(
        WithdrawableInfo calldata _info,
        bytes32 _domainSeparator
    ) public pure returns (bytes32) {
        return ECDSA.toTypedDataHash(_domainSeparator, hashStruct(_info));
    }
}
