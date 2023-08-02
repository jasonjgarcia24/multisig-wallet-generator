/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "./common";

export type WithdrawableInfoStruct = {
  amount: BigNumberish;
  to: AddressLike;
  nonce: BigNumberish;
};

export type WithdrawableInfoStructOutput = [
  amount: bigint,
  to: string,
  nonce: bigint
] & { amount: bigint; to: string; nonce: bigint };

export interface MultiSigInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "checkSigner"
      | "grantSigner"
      | "name"
      | "nonce"
      | "revokeSigner"
      | "signers"
      | "submitSignoff"
      | "threshold"
      | "version"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "checkSigner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantSigner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(functionFragment: "nonce", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "revokeSigner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "signers",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "submitSignoff",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "threshold", values?: undefined): string;
  encodeFunctionData(functionFragment: "version", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [WithdrawableInfoStruct, BytesLike[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "checkSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "grantSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "nonce", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "revokeSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "signers", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "submitSignoff",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "threshold", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "version", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export interface MultiSig extends BaseContract {
  connect(runner?: ContractRunner | null): MultiSig;
  waitForDeployment(): Promise<this>;

  interface: MultiSigInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  checkSigner: TypedContractMethod<[_signer: AddressLike], [boolean], "view">;

  grantSigner: TypedContractMethod<
    [_signer: AddressLike],
    [void],
    "nonpayable"
  >;

  name: TypedContractMethod<[], [string], "view">;

  nonce: TypedContractMethod<[], [bigint], "view">;

  revokeSigner: TypedContractMethod<
    [_signer: AddressLike],
    [void],
    "nonpayable"
  >;

  signers: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  submitSignoff: TypedContractMethod<
    [_signer: AddressLike],
    [void],
    "nonpayable"
  >;

  threshold: TypedContractMethod<[], [bigint], "view">;

  version: TypedContractMethod<[], [string], "view">;

  withdraw: TypedContractMethod<
    [_info: WithdrawableInfoStruct, _signatures: BytesLike[]],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "checkSigner"
  ): TypedContractMethod<[_signer: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "grantSigner"
  ): TypedContractMethod<[_signer: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "name"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "nonce"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "revokeSigner"
  ): TypedContractMethod<[_signer: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "signers"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "submitSignoff"
  ): TypedContractMethod<[_signer: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "threshold"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "version"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<
    [_info: WithdrawableInfoStruct, _signatures: BytesLike[]],
    [void],
    "nonpayable"
  >;

  filters: {};
}