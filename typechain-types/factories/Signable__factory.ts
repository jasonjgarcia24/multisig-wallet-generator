/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { Signable, SignableInterface } from "../Signable";

const _abi = [
  {
    inputs: [],
    name: "InvalidSignerStatus",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedCaller",
    type: "error",
  },
  {
    inputs: [],
    name: "UnauthorizedSigner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
    ],
    name: "checkSigner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
    ],
    name: "grantSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
    ],
    name: "revokeSigner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "signers",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_signer",
        type: "address",
      },
    ],
    name: "submitSignoff",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class Signable__factory {
  static readonly abi = _abi;
  static createInterface(): SignableInterface {
    return new Interface(_abi) as SignableInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Signable {
    return new Contract(address, _abi, runner) as unknown as Signable;
  }
}
