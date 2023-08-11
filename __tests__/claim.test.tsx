import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ClaimForm from '../features/claims/claim-form';
import { useWalletSelector } from '../contexts/WalletSelectorContext';

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

jest.mock('../utils/contract', () => ({
  getConnectedContract: jest.fn(() => ({
    contract: {
      get_collection_settings: jest.fn(() =>
        Promise.resolve({ signin_request: true, transferability: true, limited_collection: false })
      ),
    },
  })),
}));

describe('ClaimForm component', () => {
  beforeEach(() => {
    (useWalletSelector as jest.Mock).mockReturnValue({
      accountId: 'mockedaccount.testnet',
      modal: {
        show: jest.fn(),
      },
      selector: {
        wallet: () => {
          return {
            signAndSendTransaction: jest.fn(() => {
              Promise.resolve(true);
            }),
          };
        },
      },
    });
  });

  it('renders without errors', () => {
    const { getByText } = render(<ClaimForm event_id={1} />);
    expect(getByText('Claim Reward')).toBeInTheDocument();
  });

  it('displays error message when claim string is missing', async () => {
    const { getByText, getByRole } = render(<ClaimForm event_id={1} />);
    fireEvent.submit(getByRole('button'));

    await waitFor(() => {
      expect(getByText('Provide an Near ID to get reward')).toBeInTheDocument();
      expect(getByText('Error!')).toBeInTheDocument();
    });
  });

  it('displays error message when account is not authorized for private event', async () => {
    (useWalletSelector as jest.Mock).mockReturnValue({
      accountId: null,
      modal: {
        show: jest.fn(),
      },
    });
    const { getByText, getByRole } = render(<ClaimForm event_id={2} isPrivate={true} />);
    fireEvent.change(getByRole('textbox'), { target: { value: null } });
    fireEvent.submit(getByRole('button'));

    await waitFor(() => {
      expect(screen.getByTestId('error-msg')).toBeInTheDocument();
      expect(getByText('Error!')).toBeInTheDocument();
    });
  });

  it('submits form and displays success message when claim is valid', async () => {
    const fetchMock = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ index: 0 }),
      })
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.fetch = fetchMock;

    const { getByText, getByRole } = render(<ClaimForm event_id={1} claimString="test-qr" />);
    fireEvent.change(getByRole('textbox'), { target: { value: 'mockedaccount.testnet' } });
    fireEvent.submit(getByRole('button'));

    await waitFor(() => {
      // eslint-disable-next-line quotes
      expect(fetchMock).toHaveBeenCalledWith("/api/checkin?eventid='1'&nearid='mockedaccount.testnet'&qr='test-qr'");
      expect(getByText('Succesfully Claimed')).toBeInTheDocument();
    });
  });
});
