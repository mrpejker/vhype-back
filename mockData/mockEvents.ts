import { Collection, CollectionData } from '../models/Event';
import { hash } from '../utils';

export const mockEvent: CollectionData = {
  event_description:
    'vSelf lauches a series of quests which will keep you motivated while you learn about our project and its place inside NEAR ecosystem',
  event_name: 'vSelf Onboarding Metabuild Quest',
  finish_time: new Date().getTime() * 1000000 + 30 * 24 * 60 * 60 * 1000000,
  start_time: new Date().getTime() * 1000000,
  quest: {
    reward_description: 'Thank you for joining our event! Enjoy the kudos to WOW3 meetup participants',
    reward_title: 'WOW3 & vSelf Community',
    reward_uri: '',
  },
};

export const mockUserEvents: Collection[] = [
  [
    1887539744,
    {
      event_name: 'Test event 1',
      event_description: 'Test event',
      start_time: 1661940823124000000,
      finish_time: 1667124823124000000,
      quest: {
        reward_description: 'Thank you for joining our event! Enjoy the kudos to WOW3 meetup participants',
        reward_title: 'WOW3 & vSelf Community',
        reward_uri: '',
      },
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'sergantche.testnet',
      created_at: 1661940825888278300,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    906254051,
    {
      event_name: 'Test event 2',
      event_description: 'Test event',
      start_time: 1661940823124000000,
      finish_time: 1667124823124000000,
      quest: {
        reward_description: 'Thank you for joining our event! Enjoy the kudos to WOW3 meetup participants',
        reward_title: 'WOW3 & vSelf Community',
        reward_uri: '',
      },
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'sergantche.testnet',
      created_at: 1661940832102460700,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    1187296838,
    {
      event_name: 'Another Test Event',
      event_description: 'Another Test Event Description',
      start_time: 1662444475030000000,
      finish_time: 1662530875030000000,
      quest: {
        reward_description: 'Thank you for joining our event! Enjoy the kudos to WOW3 meetup participants',
        reward_title: 'WOW3 & vSelf Community',
        reward_uri: '',
      },
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1662444546602733300,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
];

export const mockBarcelonaEvent: CollectionData = {
  event_description:
    'WOW3 meetup at ETH Barcelona is focusing on inclusivity and diversity in Web3 communities. For our guests, vSelf suggests an interactive experience, supported by our platform and prepared custom attendance certificates and NFT rewards.',
  event_name: 'ETH Barcelona NFTs',
  finish_time: 1657539102000000000,
  quest: {
    reward_description: 'Thank you for joining our event! Enjoy the kudos to WOW3 meetup participants',
    reward_title: 'WOW3 & vSelf Community',
    reward_uri: '',
  },
  start_time: 1656934302915000000,
};
