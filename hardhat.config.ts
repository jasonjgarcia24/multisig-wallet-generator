import "hardhat-preprocessor";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import fs from "fs";
import * as accounts from "./accounts.json";

const parseAccounts = (type: string) => {
    // @ts-ignore
    return accounts[type].private_keys.map((privKey) => {
        return {
            privateKey: BigInt(privKey).toString(16),
            balance: "100000000000000000000",
        };
    }) as Array<any>;
};

const signers = parseAccounts("signers");
const notSigners = parseAccounts("not_signers");

const config: HardhatUserConfig = {
    solidity: "0.8.20",
    paths: {
        sources: "./src",
        tests: "./test/hardhat",
        cache: "./cache/hardhat",
        artifacts: "./out/hardhat",
    },
    networks: {
        hardhat: {
            accounts: signers.concat(notSigners),
        },
    },
    preprocess: {
        eachLine: (hre) => ({
            transform: (line: string) => {
                if (line.match(/^\s*import /i)) {
                    for (const [from, to] of getRemappings()) {
                        if (line.includes(from)) {
                            line = line.replace(from, to);
                            break;
                        }
                    }
                }
                return line;
            },
        }),
    },
};

function getRemappings() {
    return fs
        .readFileSync("remappings.txt", "utf8")
        .split("\n")
        .filter(Boolean) // remove empty lines
        .map((line) => line.trim().split("="));
}

export default config;
