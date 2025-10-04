export const CONTRACT_ADDRESSES = {
  testnet: "0xf4cadfb4e6ba6b00b11cdaae22d5ebc792a85fb2",
  mainnet: "", // TODO: Add mainnet address when deployed
} as const

export const VECHAIN_NETWORKS = {
  testnet: {
    id: "0x27", // 39 in hex (VeChain testnet)
    name: "VeChain Testnet",
    network: "test",
    nativeCurrency: {
      decimals: 18,
      name: "VeChain",
      symbol: "VET",
    },
    rpcUrls: {
      default: {
        http: ["https://testnet.vechain.org"],
      },
      public: {
        http: ["https://testnet.vechain.org"],
      },
    },
    blockExplorers: {
      default: { name: "VeChainStats", url: "https://explore-testnet.vechain.org" },
    },
    testnet: true,
  },
  mainnet: {
    id: "0x4a", // 74 in hex (VeChain mainnet)
    name: "VeChain",
    network: "main",
    nativeCurrency: {
      decimals: 18,
      name: "VeChain",
      symbol: "VET",
    },
    rpcUrls: {
      default: {
        http: ["https://mainnet.vechain.org"],
      },
      public: {
        http: ["https://mainnet.vechain.org"],
      },
    },
    blockExplorers: {
      default: { name: "VeChainStats", url: "https://explore.vechain.org" },
    },
  },
} as const

// Current network environment
export const CURRENT_NETWORK = (process.env.NEXT_PUBLIC_NETWORK || "testnet") as keyof typeof CONTRACT_ADDRESSES

// Current contract address
export const CONTRACT_ADDRESS = CONTRACT_ADDRESSES[CURRENT_NETWORK]
