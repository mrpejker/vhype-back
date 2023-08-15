import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi'
import { Chain } from '@wagmi/core';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { REACT_APP_ENABLE_TESTNETS } from '../constants/endpoints';

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
        etherscan: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/c-chain' },
        default: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/c-chain' },
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
        etherscan: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/c-chain' },
        default: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/c-chain' },
    },
} as Chain;

const chains = [
    ...(REACT_APP_ENABLE_TESTNETS ? [columbus] : [camino]),
];

export const projectId = '664df1515d4bd775b7d5705b8277ff35';

const { publicClient, webSocketPublicClient } = configureChains(
    chains,
    [
        w3mProvider({ projectId }),
        alchemyProvider({ apiKey: 'kuVlJ-CcKjrcbo7Q4K2PSKyOWBr6PfML' }),
        publicProvider()
    ]
);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
    webSocketPublicClient,
});
export const defaultChain = REACT_APP_ENABLE_TESTNETS ? columbus : camino;
export const ethereumClient = new EthereumClient(wagmiConfig, chains);