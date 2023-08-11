import '@testing-library/jest-dom';
import { act, getByText, render, screen, waitFor } from '@testing-library/react';
import EventsDashboard from '../features/dashboard';
import { mockedOngoingEvents, mockedUserOngoingEvents } from '../mockData/mockOngoingEvents';
import { useWalletSelector } from '../contexts/WalletSelectorContext';
import React from 'react';
import { CollectionData } from '../models/Event';

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

// Mock getConnectedContract from '../utils/contract
// TODO: it appears TypeError: unexpected type, use Uint8Array
// Should be investigated and fixed
jest.mock('../utils/contract', () => ({
  getConnectedContract: jest.fn(() => ({
    contract: {
      get_ongoing_user_events: jest.fn(() => Promise.resolve(mockedUserOngoingEvents)),
    },
  })),
}));

describe('EventsDashboard', () => {
  it('renders the ongoing events section', async () => {
    (useWalletSelector as jest.Mock).mockReturnValue({
      accountId: 'mocked-account-id.testnet',
    });
    render(<EventsDashboard ongoingEvents={mockedOngoingEvents} />);
    const eventTable = screen.getByTestId('event-table');

    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText('Ongoing Events')).toBeInTheDocument();
        expect(screen.getByText('Add New Event')).toBeInTheDocument();
        expect(getByText(eventTable, 'Event Title')).toBeInTheDocument();
        expect(getByText(eventTable, 'Quests')).toBeInTheDocument();
        expect(getByText(eventTable, 'Users')).toBeInTheDocument();
        expect(getByText(eventTable, 'Start Time')).toBeInTheDocument();
        expect(getByText(eventTable, 'End Time')).toBeInTheDocument();
        expect(getByText(eventTable, (mockedOngoingEvents[0][1] as CollectionData).event_name)).toBeInTheDocument();
      });
    });
  });

  it('renders the user ongoing events section when user has ongoing events', async () => {
    (useWalletSelector as jest.Mock).mockReturnValue({
      accountId: 'mocked-account-id.testnet',
    });
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());

    const setStateMock = jest.fn();
    jest.spyOn(React, 'useState').mockImplementationOnce(() => [mockedUserOngoingEvents, setStateMock]);

    render(<EventsDashboard ongoingEvents={mockedOngoingEvents} />);
    const eventTable = screen.getAllByTestId('event-table');

    await act(async () => {
      await waitFor(() => {
        expect(screen.getByText('Your Ongoing Events')).toBeInTheDocument();
        expect(
          getByText(eventTable[1], (mockedUserOngoingEvents[0][1] as CollectionData).event_name)
        ).toBeInTheDocument();
      });
    });
  });

  it('renders the not authorized block when user is not logged in', async () => {
    const ongoingEvents = mockedOngoingEvents;

    (useWalletSelector as jest.Mock).mockReturnValue({
      accountId: null,
    });

    render(<EventsDashboard ongoingEvents={ongoingEvents} />);
    const notAuthorizedBlock = screen.getByRole('dialog');
    const signInBtn = screen.getByText('Sign In');
    await act(async () => {
      await waitFor(() => {
        expect(signInBtn).toBeInTheDocument();
        expect(notAuthorizedBlock).toBeInTheDocument();
      });
    });
  });
});
