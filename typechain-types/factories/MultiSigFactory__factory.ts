/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type {
  MultiSigFactory,
  MultiSigFactoryInterface,
} from "../MultiSigFactory";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "deployer",
        type: "address",
      },
    ],
    name: "Deployed",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "version",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "threshold",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "signers",
            type: "address[]",
          },
        ],
        internalType: "struct MultiSigArgs",
        name: "_multiSigArgs",
        type: "tuple",
      },
      {
        internalType: "bytes32",
        name: "_salt",
        type: "bytes32",
      },
    ],
    name: "deploy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_bytecode",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_salt",
        type: "uint256",
      },
    ],
    name: "getAddress",
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
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "version",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "threshold",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "signers",
            type: "address[]",
          },
        ],
        internalType: "struct MultiSigArgs",
        name: "_multiSigArgs",
        type: "tuple",
      },
    ],
    name: "getBytecode",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561000f575f80fd5b506133658061001d5f395ff3fe60806040526004361062000037575f3560e01c80630ce85cf6146200003b57806313565dcb146200007e57806394ca2cb5146200009e575b5f80fd5b34801562000047575f80fd5b506200006660048036038101906200006091906200063b565b620000e1565b6040516200007591906200070e565b60405180910390f35b6200009c600480360381019062000096919062000768565b6200016e565b005b348015620000aa575f80fd5b50620000c96004803603810190620000c391906200087d565b62000223565b604051620000d89190620008f2565b60405180910390f35b60605f60405180602001620000f6906200026d565b6020820181038252601f19601f82011660405250905080835f015184602001518560400151866060015160405160200162000135949392919062000a3f565b6040516020818303038152906040526040516020016200015792919062000adf565b604051602081830303815290604052915050919050565b5f8134845f015185602001518660400151876060015160405162000192906200026d565b620001a1949392919062000a3f565b82906040518091039083f59050905080158015620001c1573d5f803e3d5ffd5b5090503373ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f09e48df7857bd0c1e0d31bb8a85d42cf1874817895f171c917f6ee2cea73ec2060405160405180910390a3505050565b5f8060ff60f81b3084868051906020012060405160200162000249949392919062000bea565b604051602081830303815290604052805190602001209050805f1c91505092915050565b6126f08062000c4083390190565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b620002d88262000290565b810181811067ffffffffffffffff82111715620002fa57620002f9620002a0565b5b80604052505050565b5f6200030e6200027b565b90506200031c8282620002cd565b919050565b5f80fd5b5f80fd5b5f80fd5b5f67ffffffffffffffff8211156200034a5762000349620002a0565b5b620003558262000290565b9050602081019050919050565b828183375f83830152505050565b5f6200038662000380846200032d565b62000303565b905082815260208101848484011115620003a557620003a462000329565b5b620003b284828562000362565b509392505050565b5f82601f830112620003d157620003d062000325565b5b8135620003e384826020860162000370565b91505092915050565b5f819050919050565b6200040081620003ec565b81146200040b575f80fd5b50565b5f813590506200041e81620003f5565b92915050565b5f67ffffffffffffffff821115620004415762000440620002a0565b5b602082029050602081019050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f620004818262000456565b9050919050565b620004938162000475565b81146200049e575f80fd5b50565b5f81359050620004b18162000488565b92915050565b5f620004cd620004c78462000424565b62000303565b90508083825260208201905060208402830185811115620004f357620004f262000452565b5b835b818110156200052057806200050b8882620004a1565b845260208401935050602081019050620004f5565b5050509392505050565b5f82601f83011262000541576200054062000325565b5b813562000553848260208601620004b7565b91505092915050565b5f608082840312156200057457620005736200028c565b5b62000580608062000303565b90505f82013567ffffffffffffffff811115620005a257620005a162000321565b5b620005b084828501620003ba565b5f83015250602082013567ffffffffffffffff811115620005d657620005d562000321565b5b620005e484828501620003ba565b6020830152506040620005fa848285016200040e565b604083015250606082013567ffffffffffffffff81111562000621576200062062000321565b5b6200062f848285016200052a565b60608301525092915050565b5f6020828403121562000653576200065262000284565b5b5f82013567ffffffffffffffff81111562000673576200067262000288565b5b62000681848285016200055c565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b83811015620006c3578082015181840152602081019050620006a6565b5f8484015250505050565b5f620006da826200068a565b620006e6818562000694565b9350620006f8818560208601620006a4565b620007038162000290565b840191505092915050565b5f6020820190508181035f830152620007288184620006ce565b905092915050565b5f819050919050565b620007448162000730565b81146200074f575f80fd5b50565b5f81359050620007628162000739565b92915050565b5f806040838503121562000781576200078062000284565b5b5f83013567ffffffffffffffff811115620007a157620007a062000288565b5b620007af858286016200055c565b9250506020620007c28582860162000752565b9150509250929050565b5f67ffffffffffffffff821115620007e957620007e8620002a0565b5b620007f48262000290565b9050602081019050919050565b5f620008176200081184620007cc565b62000303565b90508281526020810184848401111562000836576200083562000329565b5b6200084384828562000362565b509392505050565b5f82601f83011262000862576200086162000325565b5b81356200087484826020860162000801565b91505092915050565b5f806040838503121562000896576200089562000284565b5b5f83013567ffffffffffffffff811115620008b657620008b562000288565b5b620008c4858286016200084b565b9250506020620008d7858286016200040e565b9150509250929050565b620008ec8162000475565b82525050565b5f602082019050620009075f830184620008e1565b92915050565b5f81519050919050565b5f82825260208201905092915050565b5f62000933826200090d565b6200093f818562000917565b935062000951818560208601620006a4565b6200095c8162000290565b840191505092915050565b6200097281620003ec565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b620009ac8162000475565b82525050565b5f620009bf8383620009a1565b60208301905092915050565b5f602082019050919050565b5f620009e38262000978565b620009ef818562000982565b9350620009fc8362000992565b805f5b8381101562000a3257815162000a168882620009b2565b975062000a2383620009cb565b925050600181019050620009ff565b5085935050505092915050565b5f6080820190508181035f83015262000a59818762000927565b9050818103602083015262000a6f818662000927565b905062000a80604083018562000967565b818103606083015262000a948184620009d7565b905095945050505050565b5f81905092915050565b5f62000ab5826200068a565b62000ac1818562000a9f565b935062000ad3818560208601620006a4565b80840191505092915050565b5f62000aec828562000aa9565b915062000afa828462000aa9565b91508190509392505050565b5f7fff0000000000000000000000000000000000000000000000000000000000000082169050919050565b5f819050919050565b62000b4f62000b498262000b06565b62000b31565b82525050565b5f8160601b9050919050565b5f62000b6d8262000b55565b9050919050565b5f62000b808262000b61565b9050919050565b62000b9c62000b968262000475565b62000b74565b82525050565b5f819050919050565b62000bc062000bba82620003ec565b62000ba2565b82525050565b5f819050919050565b62000be462000bde8262000730565b62000bc6565b82525050565b5f62000bf7828762000b3a565b60018201915062000c09828662000b87565b60148201915062000c1b828562000bab565b60208201915062000c2d828462000bcf565b6020820191508190509594505050505056fe60a06040527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600655604051620026f0380380620026f083398181016040528101906200004d9190620005eb565b8383828686815f9081620000629190620008e5565b508060019081620000749190620008e5565b50505060016002819055505f5b8151811015620000cf57620000b9828281518110620000a557620000a4620009c9565b5b6020026020010151620001a660201b60201c565b8080620000c69062000a23565b91505062000081565b505060405180608001604052808381526020018281526020014681526020013073ffffffffffffffffffffffffffffffffffffffff1681525073__$5d8889f87a0ca5db22f47b5ebe396e9f96$__6349d3ad1790916040518263ffffffff1660e01b815260040162000142919062000b50565b602060405180830381865af41580156200015e573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019062000184919062000baa565b6080818152505050506001600581905550816007819055505050505062000c06565b620001b781620002aa60201b60201c565b15620001fc57806040517fe74c68bb000000000000000000000000000000000000000000000000000000008152600401620001f3919062000beb565b60405180910390fd5b600381908060018154018082558091505060019003905f5260205f20015f9091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160045f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f828254179250508190555050565b5f600160ff60045f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205416149050919050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b62000357826200030f565b810181811067ffffffffffffffff821117156200037957620003786200031f565b5b80604052505050565b5f6200038d620002f6565b90506200039b82826200034c565b919050565b5f67ffffffffffffffff821115620003bd57620003bc6200031f565b5b620003c8826200030f565b9050602081019050919050565b5f5b83811015620003f4578082015181840152602081019050620003d7565b5f8484015250505050565b5f620004156200040f84620003a0565b62000382565b9050828152602081018484840111156200043457620004336200030b565b5b62000441848285620003d5565b509392505050565b5f82601f83011262000460576200045f62000307565b5b815162000472848260208601620003ff565b91505092915050565b5f819050919050565b6200048f816200047b565b81146200049a575f80fd5b50565b5f81519050620004ad8162000484565b92915050565b5f67ffffffffffffffff821115620004d057620004cf6200031f565b5b602082029050602081019050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6200051082620004e5565b9050919050565b620005228162000504565b81146200052d575f80fd5b50565b5f81519050620005408162000517565b92915050565b5f6200055c6200055684620004b3565b62000382565b90508083825260208201905060208402830185811115620005825762000581620004e1565b5b835b81811015620005af57806200059a888262000530565b84526020840193505060208101905062000584565b5050509392505050565b5f82601f830112620005d057620005cf62000307565b5b8151620005e284826020860162000546565b91505092915050565b5f805f8060808587031215620006065762000605620002ff565b5b5f85015167ffffffffffffffff81111562000626576200062562000303565b5b620006348782880162000449565b945050602085015167ffffffffffffffff81111562000658576200065762000303565b5b620006668782880162000449565b935050604062000679878288016200049d565b925050606085015167ffffffffffffffff8111156200069d576200069c62000303565b5b620006ab87828801620005b9565b91505092959194509250565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806200070657607f821691505b6020821081036200071c576200071b620006c1565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302620007807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8262000743565b6200078c868362000743565b95508019841693508086168417925050509392505050565b5f819050919050565b5f620007cd620007c7620007c1846200047b565b620007a4565b6200047b565b9050919050565b5f819050919050565b620007e883620007ad565b62000800620007f782620007d4565b8484546200074f565b825550505050565b5f90565b6200081662000808565b62000823818484620007dd565b505050565b5b818110156200084a576200083e5f826200080c565b60018101905062000829565b5050565b601f8211156200089957620008638162000722565b6200086e8462000734565b810160208510156200087e578190505b620008966200088d8562000734565b83018262000828565b50505b505050565b5f82821c905092915050565b5f620008bb5f19846008026200089e565b1980831691505092915050565b5f620008d58383620008aa565b9150826002028217905092915050565b620008f082620006b7565b67ffffffffffffffff8111156200090c576200090b6200031f565b5b620009188254620006ee565b620009258282856200084e565b5f60209050601f8311600181146200095b575f841562000946578287015190505b620009528582620008c8565b865550620009c1565b601f1984166200096b8662000722565b5f5b8281101562000994578489015182556001820191506020850194506020810190506200096d565b86831015620009b45784890151620009b0601f891682620008aa565b8355505b6001600288020188555050505b505050505050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f62000a2f826200047b565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820362000a645762000a63620009f6565b5b600182019050919050565b5f82825260208201905092915050565b5f62000a8b82620006b7565b62000a97818562000a6f565b935062000aa9818560208601620003d5565b62000ab4816200030f565b840191505092915050565b62000aca816200047b565b82525050565b62000adb8162000504565b82525050565b5f608083015f8301518482035f86015262000afd828262000a7f565b9150506020830151848203602086015262000b19828262000a7f565b915050604083015162000b30604086018262000abf565b50606083015162000b45606086018262000ad0565b508091505092915050565b5f6020820190508181035f83015262000b6a818462000ae1565b905092915050565b5f819050919050565b62000b868162000b72565b811462000b91575f80fd5b50565b5f8151905062000ba48162000b7b565b92915050565b5f6020828403121562000bc25762000bc1620002ff565b5b5f62000bd18482850162000b94565b91505092915050565b62000be58162000504565b82525050565b5f60208201905062000c005f83018462000bda565b92915050565b608051611ad162000c1f5f395f61074e0152611ad15ff3fe60806040526004361061009f575f3560e01c806363c724f71161006357806363c724f7146101de5780637404d6fa146102065780637f63ca371461022e578063ae7346291461026a578063c34b44a0146102a6578063d06f71d6146102ce576100f6565b806306fdde03146100fa5780632079fb9a14610124578063355274ea1461016057806342cde4e81461018a57806354fd4d50146101b4576100f6565b366100f6573373ffffffffffffffffffffffffffffffffffffffff167f5677b5d4cf976ac32defbd95a6a5aaf0d1fee450a11fc26f3c11aae6e6c33d0634426040516100ec92919061108c565b60405180910390a2005b5f80fd5b348015610105575f80fd5b5061010e61030a565b60405161011b919061113d565b60405180910390f35b34801561012f575f80fd5b5061014a60048036038101906101459190611198565b610399565b6040516101579190611202565b60405180910390f35b34801561016b575f80fd5b506101746103d4565b604051610181919061121b565b60405180910390f35b348015610195575f80fd5b5061019e6103da565b6040516101ab919061121b565b60405180910390f35b3480156101bf575f80fd5b506101c86103e0565b6040516101d5919061113d565b60405180910390f35b3480156101e9575f80fd5b5061020460048036038101906101ff919061125e565b610470565b005b348015610211575f80fd5b5061022c6004803603810190610227919061130c565b6104bc565b005b348015610239575f80fd5b50610254600480360381019061024f919061125e565b6104e5565b6040516102619190611383565b60405180910390f35b348015610275575f80fd5b50610290600480360381019061028b919061139c565b610531565b60405161029d9190611383565b60405180910390f35b3480156102b1575f80fd5b506102cc60048036038101906102c7919061125e565b6105d9565b005b3480156102d9575f80fd5b506102f460048036038101906102ef919061125e565b610625565b604051610301919061121b565b60405180910390f35b60605f805461031890611407565b80601f016020809104026020016040519081016040528092919081815260200182805461034490611407565b801561038f5780601f106103665761010080835404028352916020019161038f565b820191905f5260205f20905b81548152906001019060200180831161037257829003601f168201915b5050505050905090565b600381815481106103a8575f80fd5b905f5260205f20015f915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60065481565b60075481565b6060600180546103ef90611407565b80601f016020809104026020016040519081016040528092919081815260200182805461041b90611407565b80156104665780601f1061043d57610100808354040283529160200191610466565b820191905f5260205f20905b81548152906001019060200180831161044957829003601f168201915b5050505050905090565b600654600380549050036104b0576040517f719feac700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6104b98161063a565b50565b6104c4610690565b6104cf8383836106df565b6104d88361088a565b6104e0610942565b505050565b5f600160ff60045f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205416149050919050565b5f7effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821115801561056357506002548210155b80156105d157508160087fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0060045f8773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205416901c105b905092915050565b60075460038054905003610619576040517f719feac700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6106228161094c565b50565b6004602052805f5260405f205f915090505481565b610643336104e5565b61068457336040517fe74c68bb00000000000000000000000000000000000000000000000000000000815260040161067b9190611202565b60405180910390fd5b61068d816109a2565b50565b6002600554036106d5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106cc90611481565b60405180910390fd5b6002600581905550565b60075482829050101561071e576040517fc1fb4bf700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f83803603810190610730919061157c565b73__$5d8889f87a0ca5db22f47b5ebe396e9f96$__633c4db27890917f00000000000000000000000000000000000000000000000000000000000000006040518363ffffffff1660e01b815260040161078a92919061161d565b602060405180830381865af41580156107a5573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906107c9919061166e565b90505f5b8383905081101561086a575f8484838181106107ec576107eb611699565b5b90506020028101906107fe91906116d2565b8080601f0160208091040260200160405190810160405280939291908181526020018383808284375f81840152601f19601f8201169050808301925050505050505090505f61084d8483610a9b565b905061085d818860400135610ac0565b82600101925050506107cd565b5050600160025f82825461087e9190611761565b92505081905550505050565b5f81602001602081019061089e919061125e565b73ffffffffffffffffffffffffffffffffffffffff16825f01356040516108c4906117c1565b5f6040518083038185875af1925050503d805f81146108fe576040519150601f19603f3d011682016040523d82523d5f602084013e610903565b606091505b505090508061093e576040517fbfa871c500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5050565b6001600581905550565b610955336104e5565b61099657336040517fe74c68bb00000000000000000000000000000000000000000000000000000000815260040161098d9190611202565b60405180910390fd5b61099f81610ace565b50565b6109ab816104e5565b156109ed57806040517fe74c68bb0000000000000000000000000000000000000000000000000000000081526004016109e49190611202565b60405180910390fd5b600381908060018154018082558091505060019003905f5260205f20015f9091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160045f8373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f828254179250508190555050565b5f805f610aa88585610d06565b91509150610ab581610d52565b819250505092915050565b610aca8282610eb7565b5050565b5f5b600380549050811015610b58578173ffffffffffffffffffffffffffffffffffffffff1660038280610b01906117d5565b935081548110610b1457610b13611699565b5b905f5260205f20015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1603610ad0575b6003805490508180610b699061181c565b92501115610bae57816040517fe74c68bb000000000000000000000000000000000000000000000000000000008152600401610ba59190611202565b60405180910390fd5b60036001600380549050610bc29190611843565b81548110610bd357610bd2611699565b5b905f5260205f20015f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1660038281548110610c0f57610c0e611699565b5b905f5260205f20015f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506003805480610c6657610c65611876565b5b600190038181905f5260205f20015f6101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905590557ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe60045f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825416925050819055505050565b5f806041835103610d43575f805f602086015192506040860151915060608601515f1a9050610d3787828585610f0e565b94509450505050610d4b565b5f6002915091505b9250929050565b5f6004811115610d6557610d646118a3565b5b816004811115610d7857610d776118a3565b5b0315610eb45760016004811115610d9257610d916118a3565b5b816004811115610da557610da46118a3565b5b03610de5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddc9061191a565b60405180910390fd5b60026004811115610df957610df86118a3565b5b816004811115610e0c57610e0b6118a3565b5b03610e4c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e4390611982565b60405180910390fd5b60036004811115610e6057610e5f6118a3565b5b816004811115610e7357610e726118a3565b5b03610eb3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eaa90611a10565b60405180910390fd5b5b50565b610ec18282610fe6565b6001600882901b1760045f8473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055505050565b5f807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0835f1c1115610f46575f600391509150610fdd565b5f6001878787876040515f8152602001604052604051610f699493929190611a58565b6020604051602081039080840390855afa158015610f89573d5f803e3d5ffd5b5050506020604051035190505f73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610fd5575f60019250925050610fdd565b805f92509250505b94509492505050565b610ff08282610531565b611026576040517fc4689a5400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61102f826104e5565b61107057816040517fe74c68bb0000000000000000000000000000000000000000000000000000000081526004016110679190611202565b60405180910390fd5b5050565b5f819050919050565b61108681611074565b82525050565b5f60408201905061109f5f83018561107d565b6110ac602083018461107d565b9392505050565b5f81519050919050565b5f82825260208201905092915050565b5f5b838110156110ea5780820151818401526020810190506110cf565b5f8484015250505050565b5f601f19601f8301169050919050565b5f61110f826110b3565b61111981856110bd565b93506111298185602086016110cd565b611132816110f5565b840191505092915050565b5f6020820190508181035f8301526111558184611105565b905092915050565b5f604051905090565b5f80fd5b5f80fd5b61117781611074565b8114611181575f80fd5b50565b5f813590506111928161116e565b92915050565b5f602082840312156111ad576111ac611166565b5b5f6111ba84828501611184565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6111ec826111c3565b9050919050565b6111fc816111e2565b82525050565b5f6020820190506112155f8301846111f3565b92915050565b5f60208201905061122e5f83018461107d565b92915050565b61123d816111e2565b8114611247575f80fd5b50565b5f8135905061125881611234565b92915050565b5f6020828403121561127357611272611166565b5b5f6112808482850161124a565b91505092915050565b5f80fd5b5f606082840312156112a2576112a1611289565b5b81905092915050565b5f80fd5b5f80fd5b5f80fd5b5f8083601f8401126112cc576112cb6112ab565b5b8235905067ffffffffffffffff8111156112e9576112e86112af565b5b602083019150836020820283011115611305576113046112b3565b5b9250929050565b5f805f6080848603121561132357611322611166565b5b5f6113308682870161128d565b935050606084013567ffffffffffffffff8111156113515761135061116a565b5b61135d868287016112b7565b92509250509250925092565b5f8115159050919050565b61137d81611369565b82525050565b5f6020820190506113965f830184611374565b92915050565b5f80604083850312156113b2576113b1611166565b5b5f6113bf8582860161124a565b92505060206113d085828601611184565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061141e57607f821691505b602082108103611431576114306113da565b5b50919050565b7f5265656e7472616e637947756172643a207265656e7472616e742063616c6c005f82015250565b5f61146b601f836110bd565b915061147682611437565b602082019050919050565b5f6020820190508181035f8301526114988161145f565b9050919050565b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6114d9826110f5565b810181811067ffffffffffffffff821117156114f8576114f76114a3565b5b80604052505050565b5f61150a61115d565b905061151682826114d0565b919050565b5f606082840312156115305761152f61149f565b5b61153a6060611501565b90505f61154984828501611184565b5f83015250602061155c8482850161124a565b602083015250604061157084828501611184565b60408301525092915050565b5f6060828403121561159157611590611166565b5b5f61159e8482850161151b565b91505092915050565b6115b081611074565b82525050565b6115bf816111e2565b82525050565b606082015f8201516115d95f8501826115a7565b5060208201516115ec60208501826115b6565b5060408201516115ff60408501826115a7565b50505050565b5f819050919050565b61161781611605565b82525050565b5f6080820190506116305f8301856115c5565b61163d606083018461160e565b9392505050565b61164d81611605565b8114611657575f80fd5b50565b5f8151905061166881611644565b92915050565b5f6020828403121561168357611682611166565b5b5f6116908482850161165a565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b5f80fd5b5f80fd5b5f80fd5b5f80833560016020038436030381126116ee576116ed6116c6565b5b80840192508235915067ffffffffffffffff8211156117105761170f6116ca565b5b60208301925060018202360383131561172c5761172b6116ce565b5b509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61176b82611074565b915061177683611074565b925082820190508082111561178e5761178d611734565b5b92915050565b5f81905092915050565b50565b5f6117ac5f83611794565b91506117b78261179e565b5f82019050919050565b5f6117cb826117a1565b9150819050919050565b5f6117df82611074565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361181157611810611734565b5b600182019050919050565b5f61182682611074565b91505f820361183857611837611734565b5b600182039050919050565b5f61184d82611074565b915061185883611074565b92508282039050818111156118705761186f611734565b5b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602160045260245ffd5b7f45434453413a20696e76616c6964207369676e617475726500000000000000005f82015250565b5f6119046018836110bd565b915061190f826118d0565b602082019050919050565b5f6020820190508181035f830152611931816118f8565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265206c656e677468005f82015250565b5f61196c601f836110bd565b915061197782611938565b602082019050919050565b5f6020820190508181035f83015261199981611960565b9050919050565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c5f8201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b5f6119fa6022836110bd565b9150611a05826119a0565b604082019050919050565b5f6020820190508181035f830152611a27816119ee565b9050919050565b611a3781611605565b82525050565b5f60ff82169050919050565b611a5281611a3d565b82525050565b5f608082019050611a6b5f830187611a2e565b611a786020830186611a49565b611a856040830185611a2e565b611a926060830184611a2e565b9594505050505056fea2646970667358221220eae26a50814878aeb6db56c77fdb5c2fa55e6ea5ea52ced4874b54dc58f08ddf64736f6c63430008140033a26469706673582212202759ea469eb33e2b61397ed16402c4afecf19f9aee1aad7028218261ead3059064736f6c63430008140033";

type MultiSigFactoryConstructorParams =
  | [linkLibraryAddresses: MultiSigFactoryLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MultiSigFactoryConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class MultiSigFactory__factory extends ContractFactory {
  constructor(...args: MultiSigFactoryConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(
        _abi,
        MultiSigFactory__factory.linkBytecode(linkLibraryAddresses),
        signer
      );
    }
  }

  static linkBytecode(
    linkLibraryAddresses: MultiSigFactoryLibraryAddresses
  ): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$5d8889f87a0ca5db22f47b5ebe396e9f96\\$__", "g"),
      linkLibraryAddresses["src/cryptography/LibMultiSig.sol:LibMultiSig"]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      MultiSigFactory & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): MultiSigFactory__factory {
    return super.connect(runner) as MultiSigFactory__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MultiSigFactoryInterface {
    return new Interface(_abi) as MultiSigFactoryInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MultiSigFactory {
    return new Contract(address, _abi, runner) as unknown as MultiSigFactory;
  }
}

export interface MultiSigFactoryLibraryAddresses {
  ["src/cryptography/LibMultiSig.sol:LibMultiSig"]: string;
}