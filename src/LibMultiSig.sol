// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import {_MSG_PREFIX_, _DOMAIN_SEPARATOR_TYPE_HASH_} from "./EIP712Constants.sol";
import {SignerStatus, _INVALID_SIGNER_STATUS_SELECTOR_} from "./ISignable.sol";
import {WithdrawableInfo, _WITHDRAWABLE_TYPE_HASH_} from "./IMultiSig.sol";

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

bytes4 constant _FAIL_WITH_INTENT_SELECTOR_ = 0x17eebd0d;

library LibMultiSig {
    struct DomainSeparator {
        string name;
        string version;
        uint256 chainId;
        address contractAddress;
    }

    function domainSeparator(
        DomainSeparator memory _domainSeparator
    ) public view returns (bytes32) {
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
    ) public view returns (bytes32) {
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
    ) public view returns (bytes32) {
        return ECDSA.toTypedDataHash(_domainSeparator, hashStruct(_info));
    }

    function verifySignature(
        WithdrawableInfo calldata _info,
        bytes32 _domainSeparator,
        bytes[] calldata _signatures
    ) public {
        bytes32 _dataHash = hashData(_info, _domainSeparator);

        for (uint256 i; i < _signatures.length; ) {
            bytes memory _signature = _signatures[i];
            address _signerAddress = ECDSA.recover(_dataHash, _signature);

            (bool _success, bytes memory _data) = address(this).call(
                abi.encodeWithSignature(
                    "submitSignoff(address)",
                    _signerAddress
                )
            );
            if (!_success) _revert(_INVALID_SIGNER_STATUS_SELECTOR_);

            unchecked {
                ++i;
            }
        }

        _revert(_FAIL_WITH_INTENT_SELECTOR_);
    }

    function _revert(bytes4 _err) private pure {
        assembly {
            mstore(0x20, _err)
            revert(0x20, 0x04)
        }
    }
}
