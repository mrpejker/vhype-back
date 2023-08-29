<p align="center">
  <img src="brands.png" alt="Vself Ninja"/>
</p>


# vSelf for brands

## Overview 

Current repository contains source code of vSelf web application compatible with Camino Blockchain. 

The available fuctionality is to set up custom SBT giveaway, distribute SBT reward using claim link or QR code, check claim analytics.   

This application supports MetaMask authorization and lives in Columbus testnet.

## Deployment

[Staging version](https://brands.vself.app/) of web application is available here. 

## User flow 

- [NEAR onboarding](https://vself.app/onboard) allows users to choose name & claim a NEAR account. [Wallet Selector](https://docs.near.org/tools/wallet-selector) & [near-api-js](https://docs.near.org/tools/near-api-js/quick-reference) are used to interact with NEAR Blockchain.
- [SBT collection toolkit](https://vself.app/add) is no-code user friendly solution to set up, mint, and distribute (using claim link or QR-code) non-transferable NEAR NFTs from custom collection & check [claiming analytics](https://vself.app/dashboard).
- [vRanda profile](https://vself.app/vranda) allows users to create profile & add NEAR NFTs there. All the user data is stored on-chain in [Social DB](https://github.com/NearSocial/social-db).
- [zkp vStudio](https://vself.app/vstudio) is prototype of the zero-knowledge proofs community management toolkit. It provides community creation & private onboarding. Community member is able to get her proof-of-membership, and any user - to stay a verifier of this proof.

## Documentation

- [NEAR onboarding](https://vself-project.gitbook.io/vself-project-documentation/)
- [SBT collection toolkit](https://vself-project.gitbook.io/vself-project-documentation/sbt-collection-toolkit)
- [vRanda profile](https://vself-project.gitbook.io/vself-project-documentation/user-profile-toolkit/near-nft-based-profile)
- [zkp vStudio](https://vself-project.gitbook.io/vself-project-documentation/community-management-toolkit/private-community)
- [Instructions](https://vself-project.gitbook.io/vself-project-documentation/v/instructions/)

## API

### Resources

vSelf API is used for [SBT collection toolkit](https://vself-project.gitbook.io/vself-project-documentation/sbt-collection-toolkit).

Endpoints to track available events & mint SBTs from existing collection are already available. Endpoints to create & manage the collection are in the development. But this part of the functionality is already available in [vSelf web app](https://vself.app/add).

Description of the final product functionality is in our [Gitbook page](https://vself-project.gitbook.io/vself-project-documentation/sbt-collection-toolkit/vself-api-for-collections).

For current development stage we have no API key and request limitation. It is the part of the future development.

[/pages/api/]() folder contains source code.

### Endpoints ready to use

- Mints SBT reward `qr` from event with `eventid` for given `nearid`

```
https://vself-prod.web.app/api/checkin?eventid='0000000000'&nearid='alice.near'&qr='test_string'
```

Returns the reward metadata if reward is claimed successfully, `index=-1`else. Example of the return in JSON:

```
{"index":0,"got":false,"title":"Test SBT 0","description":"test SBT description","eventName":"test_event","hashtags":[" "]}
```

- View event with `eventid`

```
http://vself-prod.web.app/api/event?eventid='0000000000'
```

Returns event metadata in JSON if event exists, `null` else. Example of the return:

```
{"eventid":0000000000,"isActive":true,"eventName":"test_event","eventDescription":"test_descr","rewardLinks":["https://testcid0.ipfs.nftstorage.link/",""https://testcid1.ipfs.nftstorage.link/"]}
```

- View upcomming events from white list

```
http://vself-prod.web.app/api/events
```

Returns the list of `eventid` with their metadata in JSON:

```
{"myList":[{"eventid":0000000000,"eventStatus":0,"eventName":"test_event0","eventDescription":"","rewardLinks":["https://testcid0.ipfs.nftstorage.link/"]},{"eventid":0000000001,"eventStatus":0,"eventName":"test_event1","eventDescription":"","rewardLinks":["https://testcid1.ipfs.nftstorage.link/"]}]}
```

## Run

```bash
#Run in dev environment
yarn dev
#Or
npm run dev

#Run in prod environment
yarn dev:prod
#Or
npm run dev:prod
```

## Folder structure

```

├── **tests**              # Tests folder
├── components             # Components folder
├── constants              # Constants folder
├── contexts               # Contexts HOCs folder
├── features               # Features used in app's pages
│   ├── claims
│   ├── dashboard
│   ├── event-form
│   ├── events-details
│   ├── landing
│   └── profile
├── hooks
├── mockData               # Mocked data for development and test purposes
├── models                 # Types and interfaces
├── pages                  # Main pages of the App
│   ├── about
│   ├── academy
│   ├── add
│   ├── api
│   ├── app
│   ├── auth
│   ├── blog
│   ├── claim
│   ├── contact
│   ├── dashboard
│   ├── docs
│   ├── event
│   ├── faq
│   ├── nft-list
│   ├── onboard
│   ├── terms
│   ├── vranda
|   ├── vselfnfts
|   └── vstudio
├── styles                  # Base CSS styles folder
├── public                  # Public folder for storing fonts, images and other public files
├── utils                   # Utils functions folder
├── next-i18next.config.js  # i18n config file
├── next.config.js          # Next JS config file
├── tailwind.config.js      # Tailwind CSS config file
└── tsconfig.json           # Typescript config file
```
