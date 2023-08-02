// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract MultiSigMetadata {
    string private __name;
    string private __version;

    constructor(string memory _name, string memory _version) {
        __name = _name;
        __version = _version;
    }

    function name() external view returns (string memory) {
        return __name;
    }

    function version() external view returns (string memory) {
        return __version;
    }
}
