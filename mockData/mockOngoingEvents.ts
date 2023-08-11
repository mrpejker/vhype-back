import { Collection } from '../models/Event';

export const mockedOngoingEvents: Collection[] = [
  [
    1722520267,
    {
      event_name: 'Test Claims',
      event_description: 'Test Claims',
      start_time: 1679588035153000000,
      finish_time: 1680279235000000000,
      quests: [
        {
          qr_prefix: '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824',
          qr_prefix_len: 5,
          reward_title: 'Test Reward',
          reward_description: 'Triceratops',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2Fd812ad716125f1d2a0592a495799fb9bfda377b03875502ce1dce7ed71b33a37.PNG?alt=media&token=652dbbb3-0dc9-4b9d-beb0-973e2e1c6695',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [
        'c22e72b8cbf2753b9a874cf879fa31e595a3cec6228a27c8850bb18736ef7892',
        'df5ac69063f38114b9725cb3fa2b7f5731f1670a4aab1283f7d98b7dbf81e570',
        '01431ede9a0bc0850d9787c83d8d066b6dd842cebacba9fa68823cd0f1b528b8',
        '8282e236c5aa9b47b79a473229026a130877f8f330590d40aaedfdea5bde5667',
        '52c2c81553bc4b91be2903a2e2bd835923e6ea180c2f348ab9c0f083c2b0f85f',
        '6f4639c7db403db8bc0e38a6e6bb1b7db5296f8455849e3a2558335d176fc1e0',
        'd258fe62ff450d270ce40a302bc8549f5d3065c9f9c903b56262e61c46235d62',
        'eb2241719b731300b8ca781dfe83d5e662583c6355d4ef73c56e20e4663648d3',
        '187da0d075225830cdd948227b824718f725ae1ed9caef5041de7ba972cf5a82',
        'eca2d0c04c4083db79cef2da68da2e58b24ee168fc064db51f12855594eaa1f7',
        'd44a42272d0ae5d31557d9211d7bec7a8956861b1847a5654b0565c6fd639532',
        'db604d9d7156deeb4c94754b8349b430e8b992cc807f5a4bc88d4211407fea38',
        'eb2d80752334d57dd420189d3804831b5799930ae522f404cf8c280b410b95fd',
        '417beb0360e39ed4288bb120828fe963e5c7e201f0f7f4dbd106f46ac557af41',
        '6a753ed50dff2dd9dbb68c39e2389ca1aa54b995c6671469061105b463092c71',
        'fbef56e142b83e82fcfa337363f8db32a29b2b0414b94f7fa5abbfda145a69d7',
        '60ec7236b8ab6e018a01a991ae9d81928bfd8a246e9d7df3fb68fd453d0a0535',
        '8a64ae21b6ad4ca31574852b8320ccd7940c81316f09d5b81e97ea259252c602',
      ],
      created_by: 'ilerik42.testnet',
      created_at: 1679589863072223000,
      stopped_at: null,
      total_rewards: 31,
      total_users: 18,
      total_actions: 31,
    },
  ],
];

export const mockedUserEvents: Collection[] = [
  [
    1676159126,
    {
      event_name: 'New Test Event',
      event_description: 'New Test Event Description',
      start_time: 1666614511347000000,
      finish_time: 1666700911347000000,
      quests: [
        {
          qr_prefix: '2d3892a92734a3044b050088e2a23c193bcb61584a5c6a4436aa81cabda96ab1',
          qr_prefix_len: 5,
          reward_title: 'Hooray',
          reward_description: 'You Are Great!',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2Fa75874b1d2e8f4798b711937a96677b9f778cbddeb079adaa8e913acdccba6d5.PNG?alt=media&token=24ae441c-61d4-4903-bd26-43e92444eded',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: ['sergantche.testnet', 'caesai.testnet'],
      created_by: 'caesai.testnet',
      created_at: 1666614615627428000,
      stopped_at: null,
      total_rewards: 2,
      total_users: 2,
      total_actions: 2,
    },
  ],
  [
    1968371688,
    {
      event_name: 'x',
      event_description: 'x',
      start_time: 1666348945854000000,
      finish_time: 1666435345854000000,
      quests: [
        {
          qr_prefix: '2d711642b726b04401627ca9fbac32f5c8530fb1903cc4db02258717921a4881',
          qr_prefix_len: 1,
          reward_title: 'NFT Reward #1',
          reward_description: 'x',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2Fa75874b1d2e8f4798b711937a96677b9f778cbddeb079adaa8e913acdccba6d5.PNG?alt=media&token=bd2e64b6-7a2d-41ce-bf65-b47c3685a3f6',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1666349048650377200,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    2054529525,
    {
      event_name: 'y',
      event_description: 'y',
      start_time: 1666349139366000000,
      finish_time: 1666435539366000000,
      quests: [
        {
          qr_prefix: 'a1fce4363854ff888cff4b8e7875d600c2682390412a8cf79b37d0b11148b0fa',
          qr_prefix_len: 1,
          reward_title: 'NFT Reward #1',
          reward_description: 'y',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F05d6e9e471e0a71fa858adbffd4b5823c2c31d5624b3a314bffc6d7ebdd23b9d.PNG?alt=media&token=7be430da-bf5b-4a15-8ce1-c9423e83a82e',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1666349260202518300,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    1840343925,
    {
      event_name: 'Another Test Event',
      event_description: 'Another Test Event Description',
      start_time: 1680007607874000000,
      finish_time: 1680094007874000000,
      quests: [
        {
          qr_prefix: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
          qr_prefix_len: 4,
          reward_title: 'NFT Reward #1',
          reward_description: 'test',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F14a0aa7c2dd5f3de7a61a18d2dc71658b168235b7848c2418aa65fda6a028b9f.PNG?alt=media&token=bd548770-2a17-4b37-bfcf-c0b1c3bd6f14',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1680007644822963000,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    2153276948,
    {
      event_name: 'Human Guild POAP Quest',
      event_description: 'Human Guild community and ecosystem rewards: NEARCON campaign',
      start_time: 1662894350000000000,
      finish_time: 1663153550000000000,
      quests: [
        {
          qr_prefix: '9f031728703863f002572b290cbccc0b5f053db1bfd8d44fd7ce0e2d6cbcb2a9',
          qr_prefix_len: 19,
          reward_title: 'HG Community POAP',
          reward_description:
            '"The community is the driving force behind any project. Any game is created for the community of players and the goal of the game is to attract new users. HG unites all the gaming community and moves forward to stimulate the community evelution.\nCollect four POAP and get OG NFT from HG.\nPowered by First NFT Agency."',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F9db160382fba94dff19e499fa1ccd14aba8607aa4a0457309ef059cc32d56d1f.PNG?alt=media&token=209d3c6f-8105-4e1f-9663-9557cc085d5a',
        },
        {
          qr_prefix: '73a9550c04a559b3585efa717429be208963c1e70d0cd98aa4962a457686a801',
          qr_prefix_len: 19,
          reward_title: 'HG Ecosystem POAP',
          reward_description:
            '"The ecosystem is an environment that brings together developers, users, investors and WEB 3.0 enthusiasts. The goal of HG is to build the largest and most efficient ecosystem in WEB 3.0 - ""HG Build togehter"".\nCollect four POAP and get OG NFT from HG.\nPowered by First NFT Agency."',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F8317096b93f7a656cfc00f91cfdcfbf23a99b72377e6970d2ae3f073056ef5bb.PNG?alt=media&token=1ca85bcd-44ad-4a18-b00f-7c18b762d41f',
        },
        {
          qr_prefix: '4acc5c0a9b9dae0b6fb08da0bb1c740eccdbe1db81ca4ceb1f1f0b3619359c1b',
          qr_prefix_len: 19,
          reward_title: 'HG Knowledge POAP',
          reward_description:
            '"Knowledge is the basic principle for achieving results.\nHG keepers of knowledge and a citadel for players, game developers, community. Collect four POAP and get OG NFT from HG.\nPowered by First NFT Agency."',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F673c982b5f9a9fef9a369f7ab3f53382359f2a991ab4f9724ab3d5e0e00e79e3.PNG?alt=media&token=7ef457b6-ff4b-47d3-94a7-9b83c77ffc7a',
        },
        {
          qr_prefix: 'dbafadf308837126a9d36b616b553f7fd8e8adcce76836abe7382cf22a58ec5f',
          qr_prefix_len: 14,
          reward_title: 'HG Game POAP',
          reward_description:
            '"Games are the best way to progress, evolve, communicate, and earn. HG allows you to create games, uncurl gamedev, do your best, and move forward. Game is not only a symbol of fun but proof of this time and invitation to the future.\nPowered by First NFT Agency."',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F1be004965ff49e20505bfd44de25a83c72bdd24a7b130da89644f9d95c8a69d8.PNG?alt=media&token=42838a29-bee2-4a8e-a632-7d427bff33c6',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1666005916811967000,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    69246715,
    {
      event_name: 'Summer 2022',
      event_description: 'Find out which places we visited this September',
      start_time: 1664883829868000000,
      finish_time: 1664970229868000000,
      quests: [
        {
          qr_prefix: '26c98ec3b46b0a4f7bd5e464268df74a0ca7af24f2f1ec6cfdc27b5122a598fa',
          qr_prefix_len: 9,
          reward_title: 'Cool Vibe and Lifestyle',
          reward_description: 'Great Place With A Great People',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F3da2c7b7987bb4e0d40f6eeed88fcb5569b8119f34696daf5b99ac754119c320.PNG?alt=media&token=61dec6a1-0300-423a-8af8-385f985d1028',
        },
        {
          qr_prefix: '2c146785580233f3c4e19fd78e568959883e0cc4b1a5d284682045522f89d8f8',
          qr_prefix_len: 6,
          reward_title: 'Beautiful Ocean',
          reward_description: 'And Of Course NEARCON Was Great',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F9a6b050c59788cd8dca92af8f5aae769ce766b3a53f5569cbd69909521ae8f85.PNG?alt=media&token=a8cb8b1a-8251-4e49-ac61-ce55d83f2a62',
        },
        {
          qr_prefix: '3ca800b667fe40d7579f7420fa497ccd8106be4581b0c364deacb74ae053ea2c',
          qr_prefix_len: 6,
          reward_title: 'Bellissimo',
          reward_description: 'Wonderful City',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2Ff2e7b64e413ec8df5974bde80e0652dc7ca9fa6557260d9c4d9124f3b443f1c5.PNG?alt=media&token=f0fe89aa-2870-4b9d-af1a-5bee5b609831',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1664884332563807700,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    549931936,
    {
      event_name: 'New Amazing Event',
      event_description: 'Never Been Before, Promise!',
      start_time: 1664883717643000000,
      finish_time: 1664970117643000000,
      quests: [
        {
          qr_prefix: '26c98ec3b46b0a4f7bd5e464268df74a0ca7af24f2f1ec6cfdc27b5122a598fa',
          qr_prefix_len: 9,
          reward_title: 'What A Great City!',
          reward_description: 'Have You Ever Been In Amsterdam? ',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F3da2c7b7987bb4e0d40f6eeed88fcb5569b8119f34696daf5b99ac754119c320.PNG?alt=media&token=9f0a7db9-3345-470c-ab62-063c6dfd7c77',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1664883809409093600,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
  [
    2088171792,
    {
      event_name: 'Test Private Event',
      event_description: 'This Is Private Event! Step Off!',
      start_time: 1666017275910000000,
      finish_time: 1666103675910000000,
      quests: [
        {
          qr_prefix: 'cca497208bbe6235fabfcd16f654736a26bd98ed6598deb6c8fbaa7c86366bf8',
          qr_prefix_len: 4,
          reward_title: 'NFT Reward #1',
          reward_description: 'haha',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F673c982b5f9a9fef9a369f7ab3f53382359f2a991ab4f9724ab3d5e0e00e79e3.PNG?alt=media&token=2a4d87da-6ccd-4a3f-91a0-b3da035069bc',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: ['caesai.testnet'],
      created_by: 'caesai.testnet',
      created_at: 1666018023242100700,
      stopped_at: null,
      total_rewards: 1,
      total_users: 1,
      total_actions: 1,
    },
  ],
  [
    253898029,
    {
      event_name: 'Test Event',
      event_description: 'Test Event Description',
      start_time: 1667993295303000000,
      finish_time: 1668079695303000000,
      quests: [
        {
          qr_prefix: '730f75dafd73e047b86acb2dbd74e75dcb93272fa084a9082848f2341aa1abb6',
          qr_prefix_len: 3,
          reward_title: 'NFT Reward #1',
          reward_description: 'ddd',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F1be004965ff49e20505bfd44de25a83c72bdd24a7b130da89644f9d95c8a69d8.PNG?alt=media&token=d442c0d7-33b1-49b5-86fa-1a2f01d3d675',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1667993319703314400,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
];

export const mockedUserOngoingEvents: Collection[] = [
  [
    1840343925,
    {
      event_name: 'Another Test Event',
      event_description: 'Another Test Event Description',
      start_time: 1680007607874000000,
      finish_time: new Date().getTime() * 1000000 + 30 * 24 * 60 * 60 * 1000000,
      quests: [
        {
          qr_prefix: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
          qr_prefix_len: 4,
          reward_title: 'NFT Reward #1',
          reward_description: 'test',
          reward_uri:
            'https://firebasestorage.googleapis.com/v0/b/vself-dev.appspot.com/o/images%2F14a0aa7c2dd5f3de7a61a18d2dc71658b168235b7848c2418aa65fda6a028b9f.PNG?alt=media&token=bd548770-2a17-4b37-bfcf-c0b1c3bd6f14',
        },
      ],
    },
    { signin_request: false, transferability: false, limited_collection: false },
    {
      participants: [],
      created_by: 'caesai.testnet',
      created_at: 1680007644822963000,
      stopped_at: null,
      total_rewards: 0,
      total_users: 0,
      total_actions: 0,
    },
  ],
];
