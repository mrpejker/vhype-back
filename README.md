<p align="center">
  <img src="brands.png" alt="Vself Ninja"/>
</p>


# vSelf for brands

## Overview 

Current repository contains source code of vSelf web application compatible with [Camino Blockchain](https://camino.network/). 

The available fuctionality is to set up custom SBT giveaway, distribute SBT reward using claim link or QR code, check claim analytics.   

This application supports [MetaMask](https://metamask.io/) authorization and [Columbus](https://docs.camino.network/about/columbus-testnet) testnet.

## Deployment

[Staging version](https://brands.vself.app/) of web application is available here. 

## User flow 
![](https://github.com/vself-project/vself-brands/blob/main/309.png)

## Documentation

Here is the description of vSelf [SBT collection toolkit](https://vself-project.gitbook.io/vself-project-documentation/sbt-collection-toolkit) functionality.

## SBT smart contract

### Synopsis



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
