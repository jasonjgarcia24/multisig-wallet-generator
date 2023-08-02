// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import "./interfaces/IMultiSig.sol";
import {Signable} from "./access/Signable.sol";
import {LibMultiSig} from "./cryptography/LibMultiSig.sol";
import {MultiSigMetadata} from "./extensions/MultiSigMetadata.sol";
import {Domain} from "./Domain.sol";

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MultiSig is MultiSigMetadata, Signable, Domain, ReentrancyGuard {
    uint256 public threshold;

    constructor(
        string memory _name,
        string memory _version,
        uint256 _threshold,
        address[] memory _signers
    )
        MultiSigMetadata(_name, _version)
        Domain(_name, _version)
        Signable(_signers)
    {
        threshold = _threshold;
    }

    using LibMultiSig for WithdrawableInfo;

    function withdraw(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) external nonReentrant {
        __sign(_info, _signatures);
        __transfer(_info);
    }

    function __sign(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) private nonceIncrementor {
        if (_signatures.length < threshold) revert InsufficientSignatureCount();

        bytes32 _dataHash = _info.hashData(_domainSeparator);

        for (uint256 i; i < _signatures.length; ) {
            bytes memory _signature = _signatures[i];
            address _signerAddress = ECDSA.recover(_dataHash, _signature);

            _submitSignoff(_signerAddress, _info.nonce);

            unchecked {
                ++i;
            }
        }
    }

    function __transfer(WithdrawableInfo calldata _info) private {
        (bool _success, ) = _info.to.call{value: _info.amount}("");
        if (!_success) revert FailedTransfer();
    }

    receive() external payable {}
}
