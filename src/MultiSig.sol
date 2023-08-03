// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import "./interfaces/IMultiSig.sol";
import {MultiSigMetadata} from "./extensions/MultiSigMetadata.sol";
import {Signable} from "./access/Signable.sol";
import {Domain} from "./Domain.sol";
import {LibMultiSig} from "./cryptography/LibMultiSig.sol";

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MultiSig is
    IMultiSig,
    MultiSigMetadata,
    Signable,
    Domain,
    ReentrancyGuard
{
    using LibMultiSig for WithdrawableInfo;

    uint256 public cap = type(uint256).max;
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

    function withdraw(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) external nonReentrant {
        __sign(_info, _signatures);
        __transfer(_info);
    }

    function grantSigner(address _signerAddress) public override {
        if (signers.length == cap) revert InvalidSignerCount();

        super.grantSigner(_signerAddress);
    }

    function revokeSigner(address _signerAddress) public override {
        if (signers.length == threshold) revert InvalidSignerCount();

        super.revokeSigner(_signerAddress);
    }

    function __sign(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) private nonceUpdater {
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

    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value, block.timestamp);
    }
}
