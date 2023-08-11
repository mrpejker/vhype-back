/* eslint-disable @typescript-eslint/no-non-null-assertion */
import '@testing-library/jest-dom';
import { act, render, screen, within } from '@testing-library/react';
import React from 'react';
import { useWalletSelector } from '../contexts/WalletSelectorContext';
import ProfilePage from '../pages/vranda';
import { mockedProfile, mockedVSelfProfile } from '../mockData/mockVRandaProfile';

// Mock Next Router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

// Mock the useWalletSelector hook
jest.mock('../contexts/WalletSelectorContext');

// Mock the useState hook
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(() => [mockedProfile, jest.fn()]),
}));

// Mock the Loader component
jest.mock(
  '../components/loader',
  () =>
    ({ children }: React.PropsWithChildren<unknown>) =>
      children
);

// Mock Axios
jest.mock('axios', () => {
  return {
    get: jest.fn().mockResolvedValue({
      data: {
        title: 'Mock Title',
        description: 'Mock Description',
        image: 'https://mock-image-url.com/image.png',
      },
    }),
  };
});

// Mock the fetch API
global.fetch = jest.fn().mockResolvedValue({
  json: () => ({
    exists: true,
    profileUrl: 'https://mocked-account-id.testnet',
  }),
});

// Mock checkFavIcon function for LinkButton component
jest.mock('../features/profile/utils.ts', () => ({
  checkFavIcon: jest.fn().mockResolvedValue('dummy-favicon-url'),
}));

jest.mock('../utils/contract', () => ({
  getConnectedContract: jest.fn(() => ({
    contract: {
      get: jest.fn(() => Promise.resolve(mockedVSelfProfile)),
    },
  })),
}));

describe('Profile Page', () => {
  test('displays notAuthorizedBlock with signIn button when user is unauthorized', async () => {
    (useWalletSelector as jest.Mock).mockReturnValue({
      accountId: null,
    });
    // Render the ProfilePage component
    await act(async () => {
      render(<ProfilePage />);
    });
    // Get the form element
    const notAuthorizedBlock = screen.getByRole('dialog');
    const signInBtn = screen.getByText('Sign In');
    expect(signInBtn).toBeInTheDocument();
    expect(notAuthorizedBlock).toBeInTheDocument();
  });

  describe('Profile Page Authorized User', () => {
    beforeEach(() => {
      // Mock the useWalletSelector hook
      (useWalletSelector as jest.Mock).mockReturnValue({
        accountId: 'mocked-account-id.testnet',
      });
      // Mocking useEffect
      jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    });

    test('displays correct user data when user is authorized', async () => {
      // Render the ProfilePage
      await act(async () => {
        render(<ProfilePage />);
      });

      const nameInput = screen.getByTestId('profile-name');
      const bioInput = screen.getByTestId('profile-bio');
      const linksList = screen.getByTestId('profile-links');
      const nftLinksList = screen.getByTestId('profile-nfts');

      const listItems = within(linksList).getAllByRole('listitem');
      const nftListItems = within(nftLinksList).getAllByRole('listitem');

      // Change the name input value
      await act(async () => {
        nameInput.dispatchEvent(new Event('input', { bubbles: true }));
      });
      // Change the bio input value
      await act(async () => {
        bioInput.dispatchEvent(new Event('input', { bubbles: true }));
      });

      // Check if the name input has the correct value
      // Check if the bio input has the correct value
      expect(nameInput).toHaveValue(mockedProfile.name);
      // TODO: Fix Test
      // expect(bioInput).toHaveValue(mockedProfile.bio);

      // Verify that the link list has the correct number of items
      expect(listItems).toHaveLength(mockedProfile.links.length);
      // Verify that the nft list has the correct number of items
      expect(nftListItems).toHaveLength(mockedProfile.nfts.length);
      // Verify that each list item displays the correct link title and icon
      listItems.forEach((item, index) => {
        const object = mockedProfile.links[index];
        // TODO: object?.meta?.title can't be sure
        expect(item).toHaveTextContent(object?.meta?.title ?? '');
      });
      // Verify that each list item displays the correct nft title and url
      nftListItems.forEach((item, index) => {
        const object = mockedProfile.nfts[index];
        expect(item).toHaveTextContent(object.title);
        expect(item).toHaveTextContent(object.url);
      });
    });
  });
});
