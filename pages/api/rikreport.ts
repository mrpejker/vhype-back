/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';

import * as nearAPI from 'near-api-js';
// import { QueryConstraint } from 'firebase/firestore';

const eventSetup = new Map([
  ['Weekly Boosts', { ids: [4063840151], scores: [6, 6] }],
  ['Coreto', { ids: [3091159812], scores: [1, 1, 1, 1, 2, 2, 1, 1, 2] }],
  ['NEAR.Hub', { ids: [712959924], scores: [2, 2, 3, 2, 3] }],
  ['Rev3al', { ids: [3595067672], scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0] }],
  ['Octopus.network', { ids: [3295086240], scores: [1, 1, 1, 1, 1, 1, 1, 1, 2, 2] }],
  ['Myriad.social', { ids: [364225467], scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1] }],
  ['vSelf', { ids: [3592603506], scores: [12] }],
  ['Popula', { ids: [2678369124], scores: [1, 1, 1, 1, 1, 1, 1, 1, 2, 2] }],
  ['YouMinter', { ids: [971702194], scores: [4, 4, 4] }],
  ['Nepbot', { ids: [1260421019], scores: [1, 1, 1, 1, 1, 1, 1, 1, 2, 2] }],
  ['Reality Chain', { ids: [1796078410], scores: [2, 1, 2, 1, 1, 1, 1, 1, 1, 1] }],
  ['NEAR protocol', { ids: [3553248861], scores: [2, 2, 2, 1, 1, 1, 2, 1] }],
  [
    'DeBio',
    {
      ids: [3729200906, 4292990993],
      scores: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
  ],
]);

// const eventsContract = 'v3.event.vself.near';

async function getData() {
  // creates keyStore from a private key string
  // you can define your key here or use an environment variable

  const { keyStores, KeyPair } = nearAPI;
  const myKeyStore = new keyStores.InMemoryKeyStore();
  const PRIVATE_KEY = 'ed25519:8W227VAjif9ut2KfwnWJa2cNwGAhBpzdKFDyS34mMM2NHPhCcZ2Qrm6MhFv92EcTfiU7zakquHkUJerjj3YaTdn';
  // creates a public / private key pair using the provided private key
  const keyPair = KeyPair.fromString(PRIVATE_KEY);
  // adds the keyPair you created to keyStore
  await myKeyStore.setKey('mainnet', 'ilerik4242.near', keyPair);

  // connect to RPC
  const { connect } = nearAPI;

  const connectionConfig = {
    networkId: 'mainnet',
    keyStore: myKeyStore, // first create a key store
    nodeUrl: 'https://rpc.mainnet.near.org',
    walletUrl: 'https://wallet.mainnet.near.org',
    helperUrl: 'https://helper.mainnet.near.org',
    explorerUrl: 'https://explorer.mainnet.near.org',
  };
  const nearConnection = await connect(connectionConfig);
  const account = await nearConnection.account('ilerik4242.near');

  // instantiate contract interface
  const { Contract } = nearAPI;
  const contract: any = new Contract(account, 'v3.event.vself.near', {
    changeMethods: [],
    viewMethods: ['get_event_data', 'get_event_stats', 'get_user_balance'],
  });

  const stats: Map<string, Map<string, object>> = new Map();
  const leaderboard: Map<string, number> = new Map();

  // Iterate through every event
  for (const setup of eventSetup) {
    const event_name = setup[0];
    const event_id = setup[1].ids[0];
    const event_scores = setup[1].scores;

    // Fetch list of participants
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const response = await contract.get_event_stats({ event_id });
    const eventParticipants: Set<string> = new Set(response.participants);
    //console.log(eventParticipants);

    // Aggregate each users stats
    const userScores: Map<string, number> = new Map();
    const userStats: Map<string, object> = new Map();
    for (const account_id of eventParticipants) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const response: any = await contract.get_user_balance({
        account_id,
        event_id,
      });
      userStats.set(account_id, response);

      let event_score = 0;
      const quests = response.quests_status;
      for (let i = 0; i < quests.length; i++) {
        if (quests[i]) {
          if (event_scores[i] !== undefined) {
            event_score += event_scores[i]!;
          } else {
            console.log('Missing score for event' + event_id);
          }
        }
      }
      userScores.set(account_id, event_score);
      const total_score = leaderboard.get(account_id);
      if (total_score) {
        leaderboard.set(account_id, total_score + event_score);
      } else {
        leaderboard.set(account_id, event_score);
      }

      // break;
    }

    // update event stats
    stats.set(event_name, userStats);
  }

  return { leaderboard, stats };
}

/// It returns list of NFT reward URIs for the event `eventid` (if `nearid` is not defined)
/// or NFT rewards URIs for account `nearid`
/// Request examples:
/// http://localhost:3000/api/rewards?eventid='my_event'
/// http://localhost:3000/api/rewards?eventid='my_event'&nearid='ilerik.testnet'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { leaderboard, stats } = await getData();
    const result = {
      leaderboard: Object.fromEntries([...leaderboard.entries()].sort((a, b) => b[1] - a[1])),
      stats: Object.fromEntries([...stats.entries()].map((v) => [v[0], Object.fromEntries([...v[1].entries()])])),
    };
    // console.log(result);
    // Response
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json([]);
  }
}
