import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi'
import { Chain } from '@wagmi/core';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { REACT_APP_ENABLE_TESTNETS } from '../constants/endpoints';

export const arbitrumSepolia = {
    id: 421_614,
    name: 'Arbitrum Sepolia',
    network: 'arbitrum-sepolia',
    nativeCurrency: {
      name: 'Arbitrum Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://sepolia-rollup.arbitrum.io/rpc'],
      },
      public: {
        http: ['https://sepolia-rollup.arbitrum.io/rpc'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Blockscout',
        url: 'https://sepolia-explorer.arbitrum.io',
      },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 81930,
      },
    },
    testnet: true,
  } as Chain; 
  export const arbitrum = {
    id: 42_161,
    name: 'Arbitrum One',
    network: 'arbitrum',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
      alchemy: {
        http: ['https://arb-mainnet.g.alchemy.com/v2'],
        webSocket: ['wss://arb-mainnet.g.alchemy.com/v2'],
      },
      infura: {
        http: ['https://arbitrum-mainnet.infura.io/v3'],
        webSocket: ['wss://arbitrum-mainnet.infura.io/ws/v3'],
      },
      default: {
        http: ['https://arb1.arbitrum.io/rpc'],
      },
      public: {
        http: ['https://arb1.arbitrum.io/rpc'],
      },
    },
    blockExplorers: {
      etherscan: { name: 'Arbiscan', url: 'https://arbiscan.io' },
      default: { name: 'Arbiscan', url: 'https://arbiscan.io' },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 7654707,
      },
    },
  } as Chain; 

  export const arbitrumGoerli = {
    id: 421_613,
    name: 'Arbitrum Goerli',
    network: 'arbitrum-goerli',
    nativeCurrency: {
      name: 'Arbitrum Goerli Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      alchemy: {
        http: ['https://arb-goerli.g.alchemy.com/v2'],
        webSocket: ['wss://arb-goerli.g.alchemy.com/v2'],
      },
      infura: {
        http: ['https://arbitrum-goerli.infura.io/v3'],
        webSocket: ['wss://arbitrum-goerli.infura.io/ws/v3'],
      },
      default: {
        http: ['https://goerli-rollup.arbitrum.io/rpc'],
      },
      public: {
        http: ['https://goerli-rollup.arbitrum.io/rpc'],
      },
    },
    blockExplorers: {
      etherscan: { name: 'Arbiscan', url: 'https://goerli.arbiscan.io' },
      default: { name: 'Arbiscan', url: 'https://goerli.arbiscan.io' },
    },
    contracts: {
      multicall3: {
        address: '0xca11bde05977b3631167028862be2a173976ca11',
        blockCreated: 88114,
      },
    },
    testnet: true,
  } as Chain;


export const columbus = {
    id: 501,
    name: 'Columbus',
    network: 'columbus',
    nativeCurrency: {
        decimals: 18,
        name: 'CAM',
        symbol: 'CAM',
    },
    rpcUrls: {
        public: {
            http: ['https://columbus.camino.network/ext/bc/C/rpc'],
            webSocket: ["wss://columbus.camino.network/ext/bc/C/ws"],
        },
        default: {
            http: ['https://columbus.camino.network/ext/bc/C/rpc'],
            webSocket: ["wss://columbus.camino.network/ext/bc/C/ws"],
        },
    },
    blockExplorers: {
        etherscan: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/columbus/c-chain' },
        default: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/columbus/c-chain' },
    },
} as Chain;

export const camino = {
    id: 500,
    name: 'Camino',
    network: 'camino',
    nativeCurrency: {
        decimals: 18,
        name: 'CAM',
        symbol: 'CAM',
    },
    rpcUrls: {
        public: {
            http: ['https://api.camino.network/ext/bc/C/rpc'],
            webSocket: ["wss://api.camino.network/ext/bc/C/ws"],
        },
        default: {
            http: ['https://api.camino.network/ext/bc/C/rpc'],
            webSocket: ["wss://api.camino.network/ext/bc/C/ws"],
        },
    },
    blockExplorers: {
        etherscan: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/camino/c-chain' },
        default: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/camino/c-chain' },
    },
} as Chain;

const chains = [
    ...(REACT_APP_ENABLE_TESTNETS ? [arbitrumGoerli] : [arbitrum]),
];

//export const projectId = '1bdb17b0def2da85904fd8e3f27d2ae9';
export const projectId = '664df1515d4bd775b7d5705b8277ff35';

const { publicClient, webSocketPublicClient } = configureChains(
    chains,
    [
        w3mProvider({ projectId }),
        alchemyProvider({ apiKey: 'SToXI7qcU-LufyFM2BC4vN2AmyqJ7gPf' }),
        publicProvider()
    ]
);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
    webSocketPublicClient,
});
export const defaultChain = REACT_APP_ENABLE_TESTNETS ? arbitrum : arbitrumGoerli;
export const ethereumClient = new EthereumClient(wagmiConfig, chains);