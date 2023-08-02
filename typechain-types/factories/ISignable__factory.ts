/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { ISignable, ISignableInterface } from "../ISignable";

const _abi = [
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
] as const;

export class ISignable__factory {
  static readonly abi = _abi;
  static createInterface(): ISignableInterface {
    return new Interface(_abi) as ISignableInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): ISignable {
    return new Contract(address, _abi, runner) as unknown as ISignable;
  }
}
