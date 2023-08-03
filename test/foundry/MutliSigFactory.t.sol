// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";
import {Vm} from "forge-std/Vm.sol";

import {Setup, StrUtils} from "./Setup.t.sol";

import {MultiSig} from "../../src/MultiSig.sol";
import {MultiSigFactory} from "../../src/MultiSigFactory.sol";
import {IMultiSigFactory, MultiSigArgs} from "../../src/interfaces/IMultiSigFactory.sol";

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

abstract contract MultiSigFactoryInit is Setup {
    MultiSigFactory public multiSigFactory;

    function setUp() public override {
        super.setUp();

        multiSigFactory = new MultiSigFactory();
    }
}

abstract contract MultiSigFactoryUtils is MultiSigFactoryInit {
    using Strings for uint256;
    using StrUtils for string;

    bytes32 constant DEPLOYED_EVENT_HASH =
        keccak256("Deployed(address,address)");

    mapping(address account => bool usedStatus) internal _usedAccountStatus;

    function _deploy(
        MultiSigArgs memory _multiSigArgs,
        bytes32 _salt
    ) internal returns (address) {
        address _deployer = makeAddr("DEPLOYER");

        // Get the bytecode and expected address for the contract.
        bytes memory _bytecode = multiSigFactory.getBytecode(_multiSigArgs);
        address _contractAddress = multiSigFactory.getAddress(
            _bytecode,
            uint256(_salt)
        );

        // Deploy the contract with create2.
        vm.deal(_deployer, 2 ether);
        vm.startPrank(_deployer);
        vm.recordLogs();
        (bool _success, ) = address(multiSigFactory).call{value: 1 ether}(
            abi.encodeWithSignature(
                "deploy((string,string,uint256,address[]),bytes32)",
                _multiSigArgs,
                _salt
            )
        );
        assertTrue(_success, "0 :: _deploy :: deploy failed");

        Vm.Log[] memory _entries = vm.getRecordedLogs();
        vm.stopPrank();

        // Check the Deployed event to ensure the contract was deployed
        // to the expected address.
        for (uint256 i; i < _entries.length; i++) {
            if (_entries[i].topics[0] == DEPLOYED_EVENT_HASH) {
                assertEq(
                    address(uint160(uint256((_entries[i].topics[1])))),
                    _contractAddress,
                    "1 :: _deploy :: _contractAddress mismatch"
                );

                assertEq(
                    address(uint160(uint256((_entries[i].topics[2])))),
                    _deployer,
                    "2 :: _deploy :: _deployer mismatch"
                );

                break;
            }

            if (i == _entries.length - 1)
                fail("3 :: _deploy :: no Deployed event found");
        }

        return _contractAddress;
    }

    function _testName(address _contractAddress, string memory _name) internal {
        MultiSig _multiSig = MultiSig(payable(_contractAddress));

        assertEq(_multiSig.name(), _name, "_testName :: name mismatch");
    }

    function _testVersion(
        address _contractAddress,
        string memory _version
    ) internal {
        MultiSig _multiSig = MultiSig(payable(_contractAddress));

        assertEq(
            _multiSig.version(),
            _version,
            "_testVersion :: version mismatch"
        );
    }

    function _testThreshold(
        address _contractAddress,
        uint256 _threshold
    ) internal {
        MultiSig _multiSig = MultiSig(payable(_contractAddress));

        assertEq(
            _multiSig.threshold(),
            _threshold,
            "_testThreshold :: threshold mismatch"
        );
    }

    function _testSigners(
        address _contractAddress,
        address[] memory _tempSigners
    ) internal {
        MultiSig _multiSig = MultiSig(payable(_contractAddress));

        // Test signers
        for (uint256 i; i < _tempSigners.length; i++) {
            assertEq(
                _multiSig.signers(i),
                _tempSigners[i],
                i
                    .toString()
                    .concat(" :: _testSigners :: signer ")
                    .concat(i.toString())
                    .concat(" mismatch")
            );
        }
    }

    function _testCheckSigners(
        address _contractAddress,
        address[] memory _tempSigners,
        address[] memory _notSigners
    ) internal {
        MultiSig _multiSig = MultiSig(payable(_contractAddress));

        // Test checkSigners signers
        for (uint256 i; i < _tempSigners.length; i++) {
            assertTrue(
                _multiSig.checkSigner(_tempSigners[i]),
                i
                    .toString()
                    .concat(" :: _testCheckSigners :: signer ")
                    .concat(i.toString())
                    .concat(" mismatch")
            );
        }

        // Test checkSigners not signers
        for (uint256 i; i < _notSigners.length; i++) {
            assertFalse(
                _multiSig.checkSigner(_notSigners[i]),
                i
                    .toString()
                    .concat(" :: _testCheckSigners :: not signer ")
                    .concat(i.toString())
                    .concat(" invalid")
            );
        }
    }

    function _sortSigners(
        address[] memory _accounts
    ) internal returns (address[] memory, address[] memory) {
        vm.assume(_accounts.length > 5);

        // Collect not signers.
        address[] memory _notSigners = new address[](5);

        uint256 _accountIdx;
        uint256 _counter;
        for (; _accountIdx < _accounts.length; _accountIdx++) {
            if (!_usedAccountStatus[_accounts[_accountIdx]]) {
                _notSigners[_counter++] = _accounts[_accountIdx];
                _usedAccountStatus[_accounts[_accountIdx]] = true;
                if (_counter == 5) break;
            }
        }
        vm.assume(_notSigners.length > 0);

        // Collect signers array with possible empty trailing elements.
        address[] memory _tempSigners = new address[](_accounts.length - 5);

        _accountIdx += 1;
        _counter = 0;
        for (; _accountIdx < _accounts.length; _accountIdx++) {
            if (!_usedAccountStatus[_accounts[_accountIdx]]) {
                vm.assume(_accounts[_accountIdx] != address(0));
                _tempSigners[_counter++] = _accounts[_accountIdx];
                _usedAccountStatus[_accounts[_accountIdx]] = true;
            }
        }

        // Collect signers array without empty trailing elements.
        address[] memory _signers = new address[](_counter);

        for (uint256 i; i < _counter; i++) {
            _signers[i] = _tempSigners[i];
        }
        vm.assume(_signers.length > 0);

        return (_signers, _notSigners);
    }
}

contract MutiSigFactoryTest is MultiSigFactoryUtils {
    function testDeploy(
        MultiSigArgs memory _multiSigArgs,
        bytes32 _salt
    ) public {
        (
            address[] memory _signers,
            address[] memory _notSigners
        ) = _sortSigners(_multiSigArgs.signers);

        _multiSigArgs.threshold = bound(
            _multiSigArgs.threshold,
            1,
            _signers.length
        );
        _multiSigArgs.signers = _signers;

        address _multiSigAddress = _deploy(_multiSigArgs, _salt);

        _testName(_multiSigAddress, _multiSigArgs.name);
        _testVersion(_multiSigAddress, _multiSigArgs.version);
        _testThreshold(_multiSigAddress, _multiSigArgs.threshold);
        _testSigners(_multiSigAddress, _multiSigArgs.signers);
        _testCheckSigners(_multiSigAddress, _signers, _notSigners);
    }
}
