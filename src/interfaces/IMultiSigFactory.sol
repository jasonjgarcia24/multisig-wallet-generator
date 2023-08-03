// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

struct MultiSigArgs {
    string name;
    string version;
    uint256 threshold;
    address[] signers;
}

interface IMultiSigFactory {
    event Deployed(address indexed contractAddress, address indexed deployer);

    function deploy(
        MultiSigArgs memory _multiSigArgs,
        bytes32 _salt
    ) external payable;

    function getAddress(
        bytes memory _bytecode,
        uint256 _salt
    ) external view returns (address);

    function getBytecode(
        MultiSigArgs memory _multiSigArgs
    ) external pure returns (bytes memory);
}
