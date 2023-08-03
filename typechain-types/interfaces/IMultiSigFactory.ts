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
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export type MultiSigArgsStruct = {
  name: string;
  version: string;
  threshold: BigNumberish;
  signers: AddressLike[];
};

export type MultiSigArgsStructOutput = [
  name: string,
  version: string,
  threshold: bigint,
  signers: string[]
] & { name: string; version: string; threshold: bigint; signers: string[] };

export interface IMultiSigFactoryInterface extends Interface {
  getFunction(
    nameOrSignature: "deploy" | "getAddress" | "getBytecode"
  ): FunctionFragment;

  getEvent(nameOrSignatureOrTopic: "Deployed"): EventFragment;

  encodeFunctionData(
    functionFragment: "deploy",
    values: [MultiSigArgsStruct, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getAddress",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBytecode",
    values: [MultiSigArgsStruct]
  ): string;

  decodeFunctionResult(functionFragment: "deploy", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getAddress", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBytecode",
    data: BytesLike
  ): Result;
}

export namespace DeployedEvent {
  export type InputTuple = [
    contractAddress: AddressLike,
    deployer: AddressLike
  ];
  export type OutputTuple = [contractAddress: string, deployer: string];
  export interface OutputObject {
    contractAddress: string;
    deployer: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface IMultiSigFactory extends BaseContract {
  connect(runner?: ContractRunner | null): IMultiSigFactory;
  waitForDeployment(): Promise<this>;

  interface: IMultiSigFactoryInterface;

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

  deploy: TypedContractMethod<
    [_multiSigArgs: MultiSigArgsStruct, _salt: BytesLike],
    [void],
    "payable"
  >;

  getAddress: TypedContractMethod<
    [_bytecode: BytesLike, _salt: BigNumberish],
    [string],
    "view"
  >;

  getBytecode: TypedContractMethod<
    [_multiSigArgs: MultiSigArgsStruct],
    [string],
    "view"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "deploy"
  ): TypedContractMethod<
    [_multiSigArgs: MultiSigArgsStruct, _salt: BytesLike],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "getAddress"
  ): TypedContractMethod<
    [_bytecode: BytesLike, _salt: BigNumberish],
    [string],
    "view"
  >;
  getFunction(
    nameOrSignature: "getBytecode"
  ): TypedContractMethod<[_multiSigArgs: MultiSigArgsStruct], [string], "view">;

  getEvent(
    key: "Deployed"
  ): TypedContractEvent<
    DeployedEvent.InputTuple,
    DeployedEvent.OutputTuple,
    DeployedEvent.OutputObject
  >;

  filters: {
    "Deployed(address,address)": TypedContractEvent<
      DeployedEvent.InputTuple,
      DeployedEvent.OutputTuple,
      DeployedEvent.OutputObject
    >;
    Deployed: TypedContractEvent<
      DeployedEvent.InputTuple,
      DeployedEvent.OutputTuple,
      DeployedEvent.OutputObject
    >;
  };
}