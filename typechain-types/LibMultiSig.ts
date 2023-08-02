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

export declare namespace LibMultiSig {
  export type DomainSeparatorStruct = {
    name: string;
    version: string;
    chainId: BigNumberish;
    contractAddress: AddressLike;
  };

  export type DomainSeparatorStructOutput = [
    name: string,
    version: string,
    chainId: bigint,
    contractAddress: string
  ] & {
    name: string;
    version: string;
    chainId: bigint;
    contractAddress: string;
  };
}

export interface LibMultiSigInterface extends Interface {
  getFunction(
    nameOrSignature: "domainSeparator" | "hashData" | "hashStruct"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "domainSeparator",
    values: [LibMultiSig.DomainSeparatorStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "hashData",
    values: [WithdrawableInfoStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "hashStruct",
    values: [WithdrawableInfoStruct]
  ): string;

  decodeFunctionResult(
    functionFragment: "domainSeparator",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "hashData", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hashStruct", data: BytesLike): Result;
}

export interface LibMultiSig extends BaseContract {
  connect(runner?: ContractRunner | null): LibMultiSig;
  waitForDeployment(): Promise<this>;

  interface: LibMultiSigInterface;

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

  domainSeparator: TypedContractMethod<
    [_domainSeparator: LibMultiSig.DomainSeparatorStruct],
    [string],
    "view"
  >;

  hashData: TypedContractMethod<
    [_info: WithdrawableInfoStruct, _domainSeparator: BytesLike],
    [string],
    "view"
  >;

  hashStruct: TypedContractMethod<
    [_info: WithdrawableInfoStruct],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "domainSeparator"
  ): TypedContractMethod<
    [_domainSeparator: LibMultiSig.DomainSeparatorStruct],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "hashData"
  ): TypedContractMethod<
    [_info: WithdrawableInfoStruct, _domainSeparator: BytesLike],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "hashStruct"
  ): TypedContractMethod<[_info: WithdrawableInfoStruct], [string], "view">;

  filters: {};
}