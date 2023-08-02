const EIP712DomainType = [
    { name: "name", type: "string" },
    { name: "version", type: "string" },
    { name: "chainId", type: "uint256" },
    { name: "verifyingContract", type: "address" },
];

const WithdrawableInfoType = [
    { name: "amount", type: "uint256" },
    { name: "to", type: "address" },
    { name: "nonce", type: "uint256" },
];

export interface IEIP712Domain {
    name: string;
    version: string;
    chainId: number;
    verifyingContract: string;
}

export interface IWithdrawableInfo {
    amount: number;
    to: string;
    nonce: number;
}

export function buildTypedData(
    eip712Domain: IEIP712Domain,
    withdrawableInfo: IWithdrawableInfo
) {
    const { name, version, chainId, verifyingContract } = eip712Domain;
    const { amount, to, nonce } = withdrawableInfo;

    return {
        domain: {
            name: name,
            version: version,
            chainId: Number(chainId),
            verifyingContract: verifyingContract,
        },
        message: {
            amount: amount,
            to: to,
            nonce: nonce,
        },
        primaryType: "WithdrawableInfo",
        types: {
            WithdrawableInfo: WithdrawableInfoType,
        },
    };
}
