/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  DeployContractOptions,
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomicfoundation/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Signable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Signable__factory>;
    getContractFactory(
      name: "LibMultiSig",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.LibMultiSig__factory>;
    getContractFactory(
      name: "IMultiSig",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.IMultiSig__factory>;
    getContractFactory(
      name: "ISignable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ISignable__factory>;
    getContractFactory(
      name: "MultiSig",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.MultiSig__factory>;

    getContractAt(
      name: "Signable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.Signable>;
    getContractAt(
      name: "LibMultiSig",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.LibMultiSig>;
    getContractAt(
      name: "IMultiSig",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.IMultiSig>;
    getContractAt(
      name: "ISignable",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.ISignable>;
    getContractAt(
      name: "MultiSig",
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<Contracts.MultiSig>;

    deployContract(
      name: "Signable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Signable>;
    deployContract(
      name: "LibMultiSig",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LibMultiSig>;
    deployContract(
      name: "IMultiSig",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IMultiSig>;
    deployContract(
      name: "ISignable",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISignable>;
    deployContract(
      name: "MultiSig",
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MultiSig>;

    deployContract(
      name: "Signable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.Signable>;
    deployContract(
      name: "LibMultiSig",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.LibMultiSig>;
    deployContract(
      name: "IMultiSig",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.IMultiSig>;
    deployContract(
      name: "ISignable",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.ISignable>;
    deployContract(
      name: "MultiSig",
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<Contracts.MultiSig>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string | ethers.Addressable,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
    deployContract(
      name: string,
      args: any[],
      signerOrOptions?: ethers.Signer | DeployContractOptions
    ): Promise<ethers.Contract>;
  }
}
