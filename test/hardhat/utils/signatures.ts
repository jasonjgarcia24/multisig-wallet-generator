import { ethers, SignatureLike, TypedDataDomain, TypedDataField } from "ethers";
import { buildTypedData, IEIP712Domain, IWithdrawableInfo } from "./types";

export interface ISigner {
    signTypedData(
        domain: TypedDataDomain,
        types: Record<string, Array<TypedDataField>>,
        value: Record<string, any>
    ): Promise<string>;
    verifyTypedData(
        domain: TypedDataDomain,
        types: Record<string, Array<TypedDataField>>,
        value: Record<string, any>,
        signature: SignatureLike
    ): string;
    getChainId(): Promise<number>;
}

export async function signData(
    signer: ISigner,
    eip712Domain: IEIP712Domain,
    withdrawableInfo: IWithdrawableInfo
): Promise<string> {
    const { domain, message, types } = buildTypedData(
        eip712Domain,
        withdrawableInfo
    );

    return signer.signTypedData(domain, types, message);
}

export function recoverSigner(
    eip712Domain: IEIP712Domain,
    withdrawableInfo: IWithdrawableInfo,
    signature: SignatureLike
): string {
    const { domain, message, types } = buildTypedData(
        eip712Domain,
        withdrawableInfo
    );

    return ethers.verifyTypedData(domain, types, message, signature);
}
