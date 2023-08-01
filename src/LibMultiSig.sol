// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {SignerStatus, WithdrawableInfo, _WITHDRAWABLE_TYPE_HASH_} from "./IMultiSig.sol";
import {LibSigners} from "./Signable.sol";

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

bytes4 constant _FAIL_WITH_INTENT_SELECTOR_ = 0x17eebd0d;
string constant _MSG_PREFIX_ = "\x19\x01";

bytes32 constant _DOMAIN_SEPARATOR_TYPE_HASH_ = keccak256(
    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
);

library LibMultiSig {
    using LibSigners for mapping(address => SignerStatus);

    struct DomainSeparator {
        string name;
        string version;
        uint256 chainId;
        address contractAddress;
    }

    function hashData(
        WithdrawableInfo calldata _info,
        bytes32 _domainSeparator,
        uint256 _nonce
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    _MSG_PREFIX_,
                    _domainSeparator,
                    hashStruct(_info)
                )
            );
    }

    function domainSeparator(
        DomainSeparator memory _domainSeparator
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    _DOMAIN_SEPARATOR_TYPE_HASH_,
                    keccak256(abi.encodePacked(_domainSeparator.name)),
                    keccak256(abi.encodePacked(_domainSeparator.version)),
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

    function verifySignature(
        mapping(address => SignerStatus) storage _isSigner,
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) public {
        bytes32 _dataHash = hashData(_info);

        address _signerAddress;
        for (uint256 i; i < _signatures.length; ) {
            bytes memory _signature = _signatures[i];
            _signerAddress = ECDSA.recover(_dataHash, _signature);

            _isSigner.verifySigner(_signerAddress);
            _isSigner.useSignature(_signerAddress);

            unchecked {
                ++i;
            }
        }

        assembly {
            mstore(0x20, _FAIL_WITH_INTENT_SELECTOR_)
            revert(0x20, 0x04)
        }
    }
}
