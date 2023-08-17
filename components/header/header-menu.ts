import { WebappURLS } from '../../constants/webapp-urls';

export interface MenuItem {
  url?: string;
  title: string;
  submenu?: boolean;
}

export const navMenuItems: MenuItem[] = [
  {
    url: WebappURLS.ABOUT_URL,
    title: 'About vSelf',
  },
  {
    title: 'Resources',
    submenu: true,
  },
  {
    title: 'Products',
    submenu: true,
  },
  {
    url: WebappURLS.CONTACT_URL,
    title: 'Contacts',
  },
];

export const subMenuItems: any = {
  Products: [
    {
      url: WebappURLS.ADD_URL,
      title: 'CREATE COLLECTION',
    },
    {
      url: WebappURLS.PRODUCTS_URL,
      title: 'COLLECTION DASHBOARD',
    },
  ],
  Resources: [
    {
      url: WebappURLS.FAQ_URL,
      title: 'FAQ',
    },
    {
      url: WebappURLS.ACADEMY_URL,
      title: 'VSELF ACADEMY',
    },
    {
      // url: WebappURLS.DOCUMENTS_URL,
      url: 'https://vself-project.gitbook.io/vself-project-documentation/',
      title: 'DOCUMENTS',
    },
    {
      url: WebappURLS.BLOG_URL,
      title: 'BLOG',
    },
  ],
  Burger: [],
};

// export const webappMenuItems = [
//   {
//     url: WebappURLS.ADD_URL,
//     title: 'Add Event',
//   },
//   {
//     url: WebappURLS.PROFILE_URL,
//     title: 'Profile',
//   },
//   // {
//   //   url: WebappURLS.ONBOARD_URL,
//   //   title: 'Onboard',
//   // },
//   {
//     url: WebappURLS.PRODUCTS_URL,
//     title: 'Products',
//   },
// ];
