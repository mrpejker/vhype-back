import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi'
import { Chain } from '@wagmi/core';
import { arbitrumGoerli} from '@wagmi/chains';
import { alchemyProvider } from '@wagmi/core/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { REACT_APP_ENABLE_TESTNETS } from '../constants/endpoints';


  
 
  // export const arbitrumGoerli = {
  //   id: 421_613,
  //   name: 'Arbitrum Goerli',
  //   network: 'arbitrum-goerli',
  //   nativeCurrency: {
  //     name: 'Arbitrum Goerli Ether',
  //     symbol: 'ETH',
  //     decimals: 18,
  //   },
  //   rpcUrls: {
  //     alchemy: {
  //       http: ['https://arb-goerli.g.alchemy.com/v2'],
  //       webSocket: ['wss://arb-goerli.g.alchemy.com/v2'],
  //     },
  //     infura: {
  //       http: ['https://arbitrum-goerli.infura.io/v3'],
  //       webSocket: ['wss://arbitrum-goerli.infura.io/ws/v3'],
  //     },
  //     default: {
  //       http: ['https://goerli-rollup.arbitrum.io/rpc'],
  //     },
  //     public: {
  //       http: ['https://goerli-rollup.arbitrum.io/rpc'],
  //     },
  //   },
  //   blockExplorers: {
  //     etherscan: { name: 'Arbiscan', url: 'https://goerli.arbiscan.io' },
  //     default: { name: 'Arbiscan', url: 'https://goerli.arbiscan.io' },
  //   },
  //   contracts: {
  //     multicall3: {
  //       address: '0xca11bde05977b3631167028862be2a173976ca11',
  //       blockCreated: 88114,
  //     },
  //   },
  //   testnet: true,
  // } as Chain;



//export const projectId = '1bdb17b0def2da85904fd8e3f27d2ae9';
export const projectId = '664df1515d4bd775b7d5705b8277ff35';

const { publicClient, webSocketPublicClient } = configureChains(
  [arbitrumGoerli] as Chain[],
    [
        w3mProvider({ projectId }),
        alchemyProvider({ apiKey: 'SToXI7qcU-LufyFM2BC4vN2AmyqJ7gPf' }),
        publicProvider()
    ]
);

export const wagmiConfig = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
});

export const defaultChain = arbitrumGoerli;
export const ethereumClient = new EthereumClient(wagmiConfig, [arbitrumGoerli]);