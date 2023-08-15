import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi'
import { Chain } from '@wagmi/core';
import { polygon, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const REACT_APP_ENABLE_TESTNETS = true;

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
        public: { http: ['https://columbus.camino.network/ext/bc/C/rpc'] },
        default: { http: ['https://columbus.camino.network/ext/bc/C/rpc'] },
    },
    blockExplorers: {
        etherscan: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/c-chain' },
        default: { name: 'CaminoScan', url: 'https://suite.camino.network/explorer/c-chain' },
    },
} as Chain;

const chains = [
    polygon,
    ...(REACT_APP_ENABLE_TESTNETS ? [polygonMumbai, columbus] : []),
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
export const defaultChain = REACT_APP_ENABLE_TESTNETS ? polygonMumbai : polygon;
export const ethereumClient = new EthereumClient(wagmiConfig, chains);