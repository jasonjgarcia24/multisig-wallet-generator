// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import "./interfaces/IMultiSig.sol";
import {Signable} from "./access/Signable.sol";
import {LibMultiSig} from "./cryptography/LibMultiSig.sol";
import {MultiSigDomain} from "./MultiSigDomain.sol";

import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract MultiSig is ReentrancyGuard, Signable, MultiSigDomain {
    string private __name;
    string private __version;
    uint256 public threshold;

    constructor(
        string memory _name,
        string memory _version,
        uint256 _threshold,
        address[] memory _signers
    ) Signable(_signers) MultiSigDomain(_name, _version) {
        __name = _name;
        __version = _version;
        threshold = _threshold;
    }

    using LibMultiSig for WithdrawableInfo;

    function name() external view returns (string memory) {
        return __name;
    }

    function version() external view returns (string memory) {
        return __version;
    }

    function withdraw(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) external nonReentrant {
        _verifySignature(_info, _signatures);
        __transfer(_info);
    }

    function _verifySignature(
        WithdrawableInfo calldata _info,
        bytes[] calldata _signatures
    ) public {
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

        nonce += 1;
    }

    function __transfer(WithdrawableInfo calldata _info) private {
        (bool _success, ) = _info.to.call{value: _info.amount}("");
        if (!_success) revert FailedTransfer();
    }

    function _revert(bytes memory _error) internal pure {
        uint256 _lenError = _error.length;
        bytes32 _numError = bytes32(_error);

        assembly {
            mstore(0x00, _numError)
            revert(0x00, _lenError)
        }
    }

    receive() external payable {}
}
