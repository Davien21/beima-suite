export const TestABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "_merkleRoot",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_paused",
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
    inputs: [],
    name: "_price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "_revealed",
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
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentId",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    inputs: [],
    name: "maxTokenIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
        internalType: "bytes32[]",
        name: "_merkleProof",
        type: "bytes32[]",
      },
    ],
    name: "presaleMint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "revealedBaseURI",
        type: "string",
      },
    ],
    name: "revealCollection",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "val",
        type: "bool",
      },
    ],
    name: "setPaused",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timeToEndPresale",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timeToStartPresale",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenCount",
    outputs: [
      {
        internalType: "uint256",
        name: "_value",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

export const TestSmartContract = [
  "Counter public tokenCount",
  "Counter public currentId",
  "bytes32 public _merkleRoot",
  "uint256 public _price",
  "bool public _revealed",
  "bool public _paused",
  "uint256 public maxTokenIds",
  "uint256 public timeToStartPresale",
  "uint256 public timeToEndPresale",
  "function mintForCreators(uint256 tokenId)",
  "function revealCollection(string memory revealedBaseURI)",
  "function presaleMint(bytes32[] calldata _merkleProof)",
  "function mint() public payable onlyWhenNotPaused returns (uint256)",
  "function tokenURI(uint256 tokenId)",
  "function _baseURI() internal view virtual override returns (string memory)",
  "function totalSupply() public view virtual override returns (uint256)",
  "function setPaused(bool val)",
  "function withdraw()",
];

// filterABI(`${TestABI}`);

export const docSchema = {
  id: "",
  creator_id: "",
  name: "",
  native_data: [
    {
      name: "mintNFT",
      type: "function",
      inputs: [{ name: "", type: "" }],
      outputs: [{ name: "", type: "" }],
      description: "",
      meta: ["view", "payable"],
    },
    {
      name: "Mint",
      type: "event",
      inputs: [{ name: "", type: "" }],
      description: "",
      meta: ["anonymous"],
    },
  ],
  inherited_data: [
    {
      name: "mintNFT",
      type: "function",
      inputs: [{ name: "", type: "" }],
      outputs: [{ name: "", type: "" }],
      description: "",
      meta: ["view", "payable"],
    },
    {
      name: "Mint",
      type: "event",
      inputs: [{ name: "", type: "" }],
      description: "",
      meta: ["anonymous"],
    },
  ],
};

export const sampleContractData = [
  {
    id: "371b97e16240e6",
    creator_id: "",
    name: "eagerBeaverNFT",
    alias: "eagerBeaverNFT",
    data: [
      {
        name: "mintNFT",
        type: "function",
        inputs: [
          { name: "amount", type: "uint256" },
          { name: "name", type: "string" },
        ],
        outputs: [{ name: "", type: "uint256" }],
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["view", "payable"],
      },
      {
        name: "revealCollection",
        type: "function",
        inputs: [{ name: "revealedBaseURI", type: "string" }],
        outputs: [{ name: "tokenId", type: "uint256" }],
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["nonpayable"],
      },
      {
        name: "presaleMint",
        type: "function",
        inputs: [{ name: "_merkleProof", type: "bytes32[]" }],
        outputs: [{ name: "tokenId", type: "uint256" }],
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["payable"],
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        type: "function",
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["nonpayable"],
      },
      {
        inputs: [
          {
            meta: ["indexed"],
            name: "from",
            type: "address",
          },
          {
            meta: ["indexed"],
            name: "to",
            type: "address",
          },
          {
            meta: ["indexed"],
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
        meta: ["anonymous"],
        description: "",
        isHidden: false,
        isNative: true,
      },
      {
        name: "Mint",
        type: "event",
        inputs: [{ name: "", type: "", meta: [] }],
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["anonymous"],
      },
      {
        name: "approve",
        type: "function",
        inputs: [
          {
            name: "to",
            type: "address",
          },
          {
            name: "tokenId",
            type: "uint256",
          },
        ],
        outputs: [],
        description: "",
        isHidden: false,
        isNative: false,
        meta: ["nonpayable"],
      },
      {
        name: "balanceOf",
        type: "function",
        inputs: [{ name: "owner", type: "address" }],
        outputs: [{ name: "", type: "uint256" }],
        description: "",
        isHidden: false,
        isNative: false,
        meta: ["view"],
      },
      {
        name: "getApproved",
        type: "function",
        inputs: [{ name: "tokenId", type: "uint256" }],
        outputs: [{ name: "", type: "address" }],
        description: "",
        isHidden: false,
        isNative: false,
        meta: ["view"],
      },
      {
        name: "Approval",
        type: "event",
        inputs: [
          {
            meta: ["indexed"],
            name: "owner",
            type: "address",
          },
          {
            meta: ["indexed"],
            name: "approved",
            type: "address",
          },
          {
            meta: ["indexed"],
            name: "tokenId",
            type: "uint256",
          },
        ],
        description: "",
        isHidden: false,
        isNative: false,
        meta: ["anonymous"],
      },
    ],
  },
  {
    id: "5761bsgqs561a",
    creator_id: "",
    name: "auctionGuruNFT",
    alias: "auctionGuruNFT",
    data: [
      {
        name: "mintNFT",
        type: "function",
        inputs: [
          { name: "amount", type: "uint256" },
          { name: "name", type: "string" },
        ],
        outputs: [{ name: "", type: "uint256" }],
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["view", "payable"],
      },
      {
        name: "revealCollection",
        type: "function",
        inputs: [{ name: "revealedBaseURI", type: "string" }],
        outputs: [{ name: "tokenId", type: "uint256" }],
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["nonpayable"],
      },
      {
        name: "presaleMint",
        type: "function",
        inputs: [{ name: "_merkleProof", type: "bytes32[]" }],
        outputs: [{ name: "tokenId", type: "uint256" }],
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["payable"],
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        type: "function",
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["nonpayable"],
      },
      {
        inputs: [
          {
            meta: ["indexed"],
            name: "from",
            type: "address",
          },
          {
            meta: ["indexed"],
            name: "to",
            type: "address",
          },
          {
            meta: ["indexed"],
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
        meta: ["anonymous"],
        description: "",
        isHidden: false,
        isNative: true,
      },
      {
        name: "Mint",
        type: "event",
        inputs: [{ name: "", type: "", meta: [] }],
        description: "",
        isHidden: false,
        isNative: true,
        meta: ["anonymous"],
      },
      {
        name: "approve",
        type: "function",
        inputs: [
          {
            name: "to",
            type: "address",
          },
          {
            name: "tokenId",
            type: "uint256",
          },
        ],
        outputs: [],
        description: "",
        isHidden: false,
        isNative: false,
        meta: ["nonpayable"],
      },
      {
        name: "balanceOf",
        type: "function",
        inputs: [{ name: "owner", type: "address" }],
        outputs: [{ name: "", type: "uint256" }],
        description: "",
        isHidden: false,
        isNative: false,
        meta: ["view"],
      },
      {
        name: "getApproved",
        type: "function",
        inputs: [{ name: "tokenId", type: "uint256" }],
        outputs: [{ name: "", type: "address" }],
        description: "",
        isHidden: false,
        isNative: false,
        meta: ["view"],
      },
      {
        name: "Approval",
        type: "event",
        inputs: [
          {
            meta: ["indexed"],
            name: "owner",
            type: "address",
          },
          {
            meta: ["indexed"],
            name: "approved",
            type: "address",
          },
          {
            meta: ["indexed"],
            name: "tokenId",
            type: "uint256",
          },
        ],
        description: "",
        isHidden: false,
        isNative: false,
        meta: ["anonymous"],
      },
    ],
  },
];
