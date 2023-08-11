/**
 * This module handles connections with NEAR API, including getting connected to a contract,
 * signing in and out, creating new NEAR accounts
 * @module nearAPIConnections
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// import * as nearAPI from 'near-api-js';
import { Near, Account, keyStores, Contract, KeyPair, connect, WalletConnection, utils } from 'near-api-js';
import { isEnvProd } from '.';
import getConfig from './near';
const { generateSeedPhrase }: any = require('near-seed-phrase');
// Mocks
import { mockMainNetUserAccount, mockUserAccount } from '../mockData/mockUserAccount';
import { mainContractMethods, mainContractName } from './contract-methods';
import { ContractMethods } from 'near-api-js/lib/contract';

/**
 * Specifies the network ID based on whether the environment is production or not
 * @constant {string} network_id - 'mainnet' for production, 'testnet' otherwise
 */
export const network_id = isEnvProd ? 'mainnet' : 'testnet';

/**
 * Specifies the user account to use for the connection based on whether the environment is production or not
 * @constant {object} connected_user - The user account object
 */
const connected_user = isEnvProd ? mockMainNetUserAccount : mockUserAccount;

/**
 * Stores the credentials needed for the wallet to use
 * @constant {object} credentials - The credentials object
 * @property {string} account_id - The account ID
 * @property {string} public_key - The public key
 * @property {string} private_key - The private key
 */
const credentials = {
  account_id: String(connected_user.account_id),
  public_key: connected_user.public_key,
  private_key: String(connected_user.private_key),
};

/**
 * Gets connected to a contract and retrieves the "contract" and "account" objects
 * @function
 * @async
 * @param {string} name - The name of the contract (optional). Defaults to "mainContractName"
 * @param {object} methods - The methods of the contract (optional). Defaults to "mainContractMethods"
 * @returns {Promise} A promise that resolves to an object containing the "contract" and "account" objects
 */
export const getConnectedContract = async (
  contractName = mainContractName,
  contractMethods = mainContractMethods
): Promise<any> => {
  const { InMemoryKeyStore } = keyStores;
  // Create keyStore object
  const keyStore = new InMemoryKeyStore();
  const { nodeUrl, networkId } = getConfig(network_id);
  keyStore.setKey(networkId, credentials.account_id, KeyPair.fromString(credentials.private_key));

  // Add access key into calling contract account
  const { connection } = new Near({
    networkId,
    nodeUrl,
    keyStore,
    headers: {},
  });

  const account: Account = new Account(connection, credentials.account_id);

  // Create callable contract instance
  const contract: unknown = new Contract(account, contractName, contractMethods);

  return { contract, account };
};

/**
 * Gets the NEAR account and the contract objects by conecting to NEAR wallet.
 * Includes functionality for signing in and out.
 * @function
 * @async
 * @param {string} contractName - The name of the contract
 * @param {object} contractMethods - The methods of the contract
 * @returns {Promise} A promise that resolves to an object containing the "account" and "contract"
 * objects and also provides additional functionality for signing in and out
 */
export const getAccountAndContract = async (
  contractName: string,
  contractMethods: ContractMethods
): Promise<unknown> => {
  const keyStore = new keyStores.BrowserLocalStorageKeyStore();
  const config = getConfig(network_id);

  const near = await connect({
    ...config,
    networkId: network_id,
    keyStore,
    headers: {},
  });

  const wallet = new WalletConnection(near, '');
  const isSignedIn = wallet.isSignedIn();

  const signOut = () => {
    wallet.signOut();
  };

  const signIn = () => {
    wallet.requestSignIn({ contractId: contractName });
  };

  const walletAccountId = wallet.getAccountId();

  const account: Account = await near.account(walletAccountId);

  const contract: unknown = new Contract(account, contractName, contractMethods);

  return { account, contract, signOut, signIn, walletAccountId, isSignedIn };
};

/**
 * Creates a new NEAR account
 * @function
 * @async
 * @param {string} newAccountId - The ID for the new NEAR account
 * @param {string} contractName - The contract name
 * @param {object} contractMethods - The contract methods
 * @returns {Promise} A promise that resolves to an object containing the result of creating a new NEAR account and the seed phrase
 */
export const createNearAccount = async (
  newAccountId: string,
  contractName: string,
  contractMethods: ContractMethods
): Promise<any> => {
  const config = getConfig(network_id);
  const amount = '0.01';
  // Prepare keystore and funding account
  const keyStore = new keyStores.InMemoryKeyStore();
  await keyStore.setKey(config.networkId, credentials.account_id, KeyPair.fromString(credentials.private_key));

  // Generate new keypair
  // to create a seed phrase with its corresponding Keys
  const { seedPhrase, publicKey, secretKey } = generateSeedPhrase();
  // const keyPair = KeyPair.fromString(secretKey);
  // await keyStore.setKey(config.networkId, newAccountId, keyPair);

  const near = await connect({
    ...config,
    keyStore,
    headers: {},
  });

  const creatorAccount = await near.account(credentials.account_id);

  // Create callable contract instance
  const root_contract: any = new Contract(creatorAccount, contractName, contractMethods);
  const result = await root_contract.create_account(
    {
      new_account_id: newAccountId,
      new_public_key: publicKey,
    },
    '300000000000000',
    utils.format.parseNearAmount(amount)
  );

  return { result, seedPhrase };
};
