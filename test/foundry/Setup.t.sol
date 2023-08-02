// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";
import {Test} from "forge-std/Test.sol";
import {stdJson} from "forge-std/StdJson.sol";

abstract contract Setup is Test {
    address[] notSigners = new address[](5);
    address[] signers = new address[](5);
    uint256[][] privKeys = new uint256[][](2);

    function setUp() public virtual {
        privKeys[0] = new uint256[](5);
        privKeys[1] = new uint256[](5);

        (signers[0], privKeys[0][0]) = makeAddrAndKey("SIGNER_00");
        (signers[1], privKeys[0][1]) = makeAddrAndKey("SIGNER_01");
        (signers[2], privKeys[0][2]) = makeAddrAndKey("SIGNER_02");
        (signers[3], privKeys[0][3]) = makeAddrAndKey("SIGNER_03");
        (signers[4], privKeys[0][4]) = makeAddrAndKey("SIGNER_04");

        (notSigners[0], privKeys[1][0]) = makeAddrAndKey("NOT_SIGNER_00");
        (notSigners[1], privKeys[1][1]) = makeAddrAndKey("NOT_SIGNER_01");
        (notSigners[2], privKeys[1][2]) = makeAddrAndKey("NOT_SIGNER_02");
        (notSigners[3], privKeys[1][3]) = makeAddrAndKey("NOT_SIGNER_03");
        (notSigners[4], privKeys[1][4]) = makeAddrAndKey("NOT_SIGNER_04");

        recordAccounts();
    }

    function recordAccounts() internal {
        // Signers
        string memory _signersObj = sortAccountsObj(
            "signers",
            signers,
            privKeys[0]
        );

        // Not Signers
        string memory _notSignersObj = sortAccountsObj(
            "not_signers",
            notSigners,
            privKeys[1]
        );

        // Base
        stdJson.serialize("base_level", "signers", _signersObj);
        string memory _baseObj = stdJson.serialize(
            "base_level",
            "not_signers",
            _notSignersObj
        );

        vm.writeJson(_baseObj, "./accounts.json");
    }

    function sortAccountsObj(
        string memory objKey,
        address[] memory _accounts,
        uint256[] memory _privKeys
    ) internal returns (string memory _accountsObj) {
        string[] memory _privKeysStr = new string[](_privKeys.length);

        for (uint256 i; i < _privKeys.length; i++) {
            _privKeysStr[i] = vm.toString(_privKeys[i]);
        }

        stdJson.serialize(objKey, "addresses", _accounts);
        _accountsObj = stdJson.serialize(objKey, "private_keys", _privKeysStr);
    }
}
