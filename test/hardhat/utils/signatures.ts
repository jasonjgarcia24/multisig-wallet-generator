import { TypedDataDomain, TypedDataField } from "ethers";
import { buildTypedData, IEIP712Domain, IWithdrawableInfo } from "./types";

export interface ISigner {
    signTypedData(
        domain: TypedDataDomain,
        types: Record<string, Array<TypedDataField>>,
        value: Record<string, any>
    ): Promise<string>;
    getChainId(): Promise<number>;
}

export async function signTx(
    signer: ISigner,
    eip712Domain: IEIP712Domain,
    withdrawableInfo: IWithdrawableInfo
) {
    const { domain, message, types } = buildTypedData(
        eip712Domain,
        withdrawableInfo
    );

    return signer.signTypedData(domain, types, message);
}
