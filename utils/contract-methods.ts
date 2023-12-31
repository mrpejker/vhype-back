import { ContractMethods } from 'near-api-js/lib/contract';
import { isEnvProd } from '.';
import { Endpoints } from '../constants/endpoints';

// Deposits Contract Settings
export const depositsContractName = isEnvProd
  ? Endpoints.DEPOSITS_MAINNET_CONTRACT_URI
  : Endpoints.DEPOSITS_TESTNET_CONTRACT_URI;
export const depositContractMethods = {
  // name of contract you're connecting to
  viewMethods: ['get_owner', 'get_deposit_amount', 'get_total_deposit'], // view methods do not change state but usually return a value
  changeMethods: ['make_deposit', 'decrease_deposit', 'withdraw', 'withdraw_to_owner'], // change methods modify state
} as ContractMethods;

// Main Contract Settings
export const mainContractName = isEnvProd ? Endpoints.MAINNET_CONTRACT_URI : Endpoints.TESTNET_CONTRACT_URI;
// export const mainContractName = Endpoints.TESTNET_CONTRACT_URI;
export const mainContractMethods = {
  // name of contract you're connecting to
  viewMethods: [
    'version',
    'is_active',
    'get_actions',
    'get_event_actions',
    'get_event_data',
    'get_event_stats',
    'get_user_balance_extra',
    'get_ongoing_events',
    'get_ongoing_user_events',
    'get_collection_settings',
  ], // view methods do not change state but usually return a value
  changeMethods: ['start_event', 'stop_event', 'checkin'], // change methods modify state
} as ContractMethods;
export const mainContractMethodsNew = {
  // name of contract you're connecting to
  viewMethods: [
    'version',
    'get_ongoing_events',
    'get_ongoing_user_events',
    'get_event_data',
    'get_event_stats',
    'get_user_balance',
    'get_event_actions',
    'get_collection_settings',
  ], // view methods do not change state but usually return a value
  changeMethods: ['start_event', 'stop_event', 'checkin'], // change methods modify state
} as ContractMethods;

// LinkDrop Settings
export const linkDropName = isEnvProd ? 'near' : 'testnet';
export const linkDropMethods = {
  viewMethods: [''],
  changeMethods: ['create_account'],
} as ContractMethods;

export const ldName = Endpoints.LINKDROP_TESTNET_CONTRACT_URI;
export const ldMethods = {
  viewMethods: ['get_key_balance'],
  changeMethods: [
    'send',
    'claim',
    'create_account_and_claim',
    'create_account',
    'on_account_created',
    'on_account_created_and_claimed',
  ],
} as ContractMethods;

// Communities Contract Settings
export const communitiesContractName = isEnvProd
  ? Endpoints.COMMUNITIES_MAINNET_CONTRACT_URI
  : Endpoints.COMMUNITIES_TESTNET_CONTRACT_URI;
export const communitiesContractMethods = {
  viewMethods: ['get_community_list', 'get_community', 'get_community_members'],
  changeMethods: ['add_member', 'add_community', 'remove_community'],
} as ContractMethods;

// NEAR Social
export const socialContractName = isEnvProd
  ? Endpoints.SOCIAL_MAINNET_CONTRACT_URI
  : Endpoints.SOCIAL_TESTNET_CONTRACT_URI;
export const socialContractMethods = {
  viewMethods: ['internal_get_account', 'get'],
} as ContractMethods;
