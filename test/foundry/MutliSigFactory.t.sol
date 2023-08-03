// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import {console} from "forge-std/console.sol";
import {Vm} from "forge-std/Vm.sol";

import {Setup, StrUtils} from "./Setup.t.sol";

import {MultiSig} from "../../src/MultiSig.sol";
import {MultiSigFactory} from "../../src/MultiSigFactory.sol";
import {IMultiSigFactory, MultiSigArgs} from "../../src/interfaces/IMultiSigFactory.sol";

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

abstract contract MultiSigFactoryHarness is IMultiSigFactory {
    function deploy(
        MultiSigArgs memory _multiSigArgs,
        bytes32 _salt
    ) external payable virtual override {}

    function getAddress(
        bytes memory _bytecode,
        uint256 _salt
    ) public view virtual override returns (address) {}

    function getBytecode(
        MultiSigArgs memory _multiSigArgs
    ) public pure virtual override returns (bytes memory) {}
}

abstract contract MultiSigFactoryInit is Setup {
    MultiSigFactory public multiSigFactory;

    function setUp() public override {
        super.setUp();

        multiSigFactory = new MultiSigFactory();
    }
}

abstract contract MultiSigFactoryUtils is
    MultiSigFactoryInit,
    MultiSigFactoryHarness
{
    using Strings for uint256;
    using StrUtils for string;

    bytes32 constant DEPLOYED_EVENT_HASH =
        keccak256("Deployed(address,address)");

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
        address[] memory _signers
    ) internal {
        MultiSig _multiSig = MultiSig(payable(_contractAddress));

        // Test signers
        for (uint256 i; i < _signers.length; i++) {
            assertEq(
                _multiSig.signers(i),
                _signers[i],
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
        address[] memory _signers
    ) internal {
        MultiSig _multiSig = MultiSig(payable(_contractAddress));

        // Test checkSigners signers
        for (uint256 i; i < _signers.length; i++) {
            assertTrue(
                _multiSig.checkSigner(_signers[i]),
                i
                    .toString()
                    .concat(" :: _testCheckSigners :: signer ")
                    .concat(i.toString())
                    .concat(" mismatch")
            );
        }

        // Test checkSigners not signers
        for (uint256 i; i < notSigners.length; i++) {
            assertFalse(
                _multiSig.checkSigner(notSigners[i]),
                i
                    .toString()
                    .concat(" :: _testCheckSigners :: not signer ")
                    .concat(i.toString())
                    .concat(" invalid")
            );
        }
    }
}

contract MutiSigFactoryTest is MultiSigFactoryUtils {
    function testDeploy(bytes32 _salt) public {
        MultiSigArgs memory _multiSigArgs = MultiSigArgs({
            name: name,
            version: version,
            threshold: threshold,
            signers: signers
        });

        address _multiSigAddress = _deploy(_multiSigArgs, _salt);

        _testName(_multiSigAddress, name);
        _testVersion(_multiSigAddress, version);
        _testThreshold(_multiSigAddress, threshold);
        _testSigners(_multiSigAddress, signers);
        _testCheckSigners(_multiSigAddress, signers);
    }
}
