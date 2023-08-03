// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";

import "./MultiSig.sol";
import "./interfaces/IMultiSigFactory.sol";

contract MultiSigFactory is IMultiSigFactory {
    function deploy(
        MultiSigArgs memory _multiSigArgs,
        bytes32 _salt
    ) external payable {
        MultiSig _multiSig = new MultiSig{salt: _salt, value: msg.value}(
            _multiSigArgs.name,
            _multiSigArgs.version,
            _multiSigArgs.threshold,
            _multiSigArgs.signers
        );

        emit Deployed(address(_multiSig), msg.sender);
    }

    function getAddress(
        bytes memory _bytecode,
        uint256 _salt
    ) public view returns (address) {
        bytes32 _hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                _salt,
                keccak256(_bytecode)
            )
        );

        return address(uint160(uint256(_hash)));
    }

    function getBytecode(
        MultiSigArgs memory _multiSigArgs
    ) public pure returns (bytes memory) {
        bytes memory _bytecode = type(MultiSig).creationCode;

        return
            abi.encodePacked(
                _bytecode,
                abi.encode(
                    _multiSigArgs.name,
                    _multiSigArgs.version,
                    _multiSigArgs.threshold,
                    _multiSigArgs.signers
                )
            );
    }
}
