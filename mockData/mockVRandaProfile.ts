import { VSelfProfile, vRandaFormState } from '../models/vRanda';

export const mockedProfile: vRandaFormState = {
  name: 'John Doe',
  bio: 'Software Engineer',
  links: [
    {
      title: 'GitHub: Let`s build from here',
      url: 'github.com',
      meta: {
        url: 'https://github.com',
        title: 'GitHub: Let`s build from here',
        description: 'GitHub is where over 100...',
        icon: 'https://github.githubassets.com/favicons/favicon.svg',
        image: 'https://github.githubassets.com/images/modules/site/social-cards/campaign-social.png',
      },
    },
    {
      title: 'Just a moment...',
      url: 'codepen.com',
      meta: {
        url: 'https://codepen.com',
        title: 'Just a moment...',
        icon: 'https://codepen.com/favicon.ico',
        description: '',
        image: '',
      },
    },
  ],
  file: null,
  nfts: [
    {
      title: 'events_v29.sergantche.testnet',
      url: 'events_v29.sergantche.testnet',
      meta: { contract_name: 'events_v29.sergantche.testnet', icon: '/nfticon.png' },
    },
  ],
  avatar_url: '',
  avatar: '',
};

export const mockedVSelfProfile: VSelfProfile = {
  'mocked-account-id.testnet': {
    vself: {
      avatar_url:
        'https://ipfs.io/ipfs/bafybeidcgra4z23plshmppaoq3ldkya2ch2cwom23faoqg3334adjbvc6u/2023-03-17 16.01.00.jpg',
      name: 'sushlazzlo',
      bio: 'Frontend Dev',
      links: [
        {
          title: 'Мобильная',
          url: 'vk.com',
          meta: {
            url: 'https://vk.com',
            title: 'Мобильная версия ВКонтакте | ВКонтакте',
            description:
              'ВКонтакте – универсальное средство для общения и поиска друзей и одноклассников, которым ежедневно пользуются десятки миллионов человек. Мы хотим, чтобы друзья, однокурсники, одноклассники, соседи и коллеги всегда оставались в контакте.',
            icon: 'https://vk.com/images/icons/pwa/apple/default.png?15',
            image: 'https://yastatic.net/s3/home-static/_/37/37a02b5dc7a51abac55d8a5b6c865f0e.png',
          },
        },
        {
          title: 'Mail.ru: почта, поиск в интернете, новости, игры',
          url: 'mail.ru',
          meta: {
            url: 'https://mail.ru',
            title: 'Mail.ru: почта, поиск в интернете, новости, игры',
            description:
              'Mail.ru — крупнейшая бесплатная почта, быстрый и удобный интерфейс, неограниченный объем ящика, надежная защита от спама и вирусов, мобильная версия и приложения для смартфонов. Также на Mail.ru: новости, поиск в интернете, игры, авто, спорт, знакомства, погода, работа',
            icon: 'https://limg.imgsmail.ru/splash/v/i/apple-touch-icon-144x144-fp-22d2f7eb2b.png',
            image: 'https://mail.ru/s/v/i/share-fp-a2954bf3df.png',
          },
        },
        {
          title: 'Tynu40k Goblin',
          url: 'oper.ru',
          meta: {
            url: 'https://oper.ru',
            title: 'Tynu40k Goblina',
            description: 'Тупичок ст. о/у Гоблина (Goblin). Переводы кино. Студия Полный П. Божья Искра. Синий Фил.',
            icon: 'https://oper.ru/static/apple-touch-icon.png',
            image: 'https://oper.ru/static/images/podcast_logo.jpg',
          },
        },
        {
          title: 'Социальная сеть Одноклассники. Общение с друзьями в ОК. Ваше место встречи с одноклассниками',
          url: 'ok.ru',
          meta: {
            url: 'https://ok.ru',
            title: 'Социальная сеть Одноклассники. Общение с друзьями в ОК. Ваше место встречи с одноклассниками',
            description:
              'Одноклассники.ру это социальная сеть, где вы можете найти своих старых друзей. Общение, онлайн игры, подарки и открытки для друзей. Приходите в ОК, делитесь своими эмоциями с друзьями, коллегами и одноклассниками.',
            icon: 'https://ok.ru/res/i/apple-touch-icon_180-r.png',
            image: 'https://ok.ru/res/i/anonym/def_1200x630-r.png',
          },
        },
      ],
      subscriptions: { '0': 'ilerik.testnet' },
      nfts: [
        {
          title: 'events_v29.sergantche.testnet',
          url: 'events_v29.sergantche.testnet',
          meta: {
            contract_name: 'events_v26.sergantche.testnet',
            icon: '/nfticon.png',
          },
        },
        {
          title: 'events_v29.sergantche.testnet',
          url: 'events_v29.sergantche.testnet',
          meta: {
            contract_name: 'events_v26.sergantche.testnet',
            icon: '/nfticon.png',
          },
        },
      ],
    },
  },
};
