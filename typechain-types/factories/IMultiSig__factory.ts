/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type { IMultiSig, IMultiSigInterface } from "../IMultiSig";

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
        ],
        internalType: "struct WithdrawableInfo",
        name: "_info",
        type: "tuple",
      },
      {
        internalType: "bytes[]",
        name: "_signatures",
        type: "bytes[]",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IMultiSig__factory {
  static readonly abi = _abi;
  static createInterface(): IMultiSigInterface {
    return new Interface(_abi) as IMultiSigInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): IMultiSig {
    return new Contract(address, _abi, runner) as unknown as IMultiSig;
  }
}
