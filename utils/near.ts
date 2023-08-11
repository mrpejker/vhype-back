import { encode } from 'js-base64';
import { providers } from 'near-api-js';
import { isEnvProd } from '.';

/**
 * Returns the configuration object for the specified environment.
 * @param env The environment name.
 * @returns The configuration object containing network, node, wallet, and helper URLs.
 * @throws Error if environment is not configured in the code.
 */
const getConfig = (env: string) => {
  switch (env) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
      };
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
      };
    case 'devnet':
      return {
        networkId: 'devnet',
        nodeUrl: 'https://rpc.devnet.near.org',
        walletUrl: 'https://wallet.devnet.near.org',
        helperUrl: 'https://helper.devnet.near.org',
      };
    case 'betanet':
      return {
        networkId: 'betanet',
        nodeUrl: 'https://rpc.betanet.near.org',
        walletUrl: 'https://wallet.betanet.near.org',
        helperUrl: 'https://helper.betanet.near.org',
      };
    case 'local':
      return {
        networkId: 'local',
        nodeUrl: 'http://localhost:3030',
        keyPath: `${process.env.HOME}/.near/validator_key.json`,
        walletUrl: 'http://localhost:4000/wallet',
      };
    case 'test':
    case 'ci':
      return {
        networkId: 'shared-test',
        nodeUrl: 'https://rpc.ci-testnet.near.org',
        masterAccount: 'test.near',
      };
    case 'ci-betanet':
      return {
        networkId: 'shared-test-staging',
        nodeUrl: 'https://rpc.ci-betanet.near.org',
        masterAccount: 'test.near',
      };
    default:
      throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
  }
};

export default getConfig;

/**
 * Checks if the given Near account exists using the Near Explorer API.
 * @param nearid The Near account ID to check.
 * @param network The Near network to use (mainnet or testnet).
 * @returns True or False depending on whether the account exists or not.
 */
export const checkNearAccount = async (nearid: string, network: string) => {
  try {
    const response = await fetch('https://explorer.' + network + '.near.org/accounts/' + nearid);
    const resText = await response.text();
    return !resText.includes('check if the account name');
  } catch (err) {
    console.log(err);
    return false;
  }
};

/**
 * Returns the state of the specified Near contract and account id.
 * @param contract_name The name of the Near contract.
 * @param near_id The Near account ID to get the state of.
 * @returns The state of the Near contract for the given account ID.
 */
export const getState = async (contract_name: string, near_id: string) => {
  const network = isEnvProd ? 'mainnet' : 'testnet';
  //network config (replace testnet with mainnet or betanet)
  const url: string = 'https://rpc.' + network + '.near.org';
  const provider = new providers.JsonRpcProvider({ url });

  const args = { account_id: near_id };
  const args_base64 = encode(JSON.stringify(args));

  const rawResult: any = await provider.query({
    request_type: 'call_function',
    account_id: contract_name,
    method_name: 'nft_tokens_for_owner', //
    args_base64: args_base64,
    finality: 'optimistic',
  });

  // format result
  const res = JSON.parse(Buffer.from(rawResult.result).toString());
  return res;
};
