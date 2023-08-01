// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {LibMultiSig} from "./LibMultiSig.sol";

abstract contract MultiSigDomain {
    using LibMultiSig for LibMultiSig.DomainSeparator;

    bytes32 internal immutable _domainSeparator;

    constructor(string memory _name, string memory _version) {
        _domainSeparator = LibMultiSig
            .DomainSeparator({
                name: _name,
                version: _version,
                chainId: block.chainid,
                contractAddress: address(this)
            })
            .domainSeparator();
    }
}
