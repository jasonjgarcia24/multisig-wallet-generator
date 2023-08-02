// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

interface IMultiSigMetadata {
    function name() external view returns (string memory);

    function version() external view returns (string memory);
}
