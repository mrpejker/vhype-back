/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { IEventAction } from '../../models/Event';
import { formatTimeStampToLocaleDateString, formatTimeStampToLocaleTimeString } from '../../utils';

interface EventActionsTableProps {
  eventActions: IEventAction[];
  isOwn?: boolean;
}

const EventActionsTable: React.FC<EventActionsTableProps> = ({ eventActions, isOwn }) => {
  return (
    <table className="min-w-full text-center">
      <thead className="bg-[#d9d9d9b0] text-black font-interBold text-[14px]">
        <tr>
          <th className="text-sm px-4 py-[5px]">User</th>
          <th className="text-sm px-4 py-[5px]">Date</th>
          <th className="text-sm px-4 py-[5px] hidden sm:table-cell">Status</th>
        </tr>
      </thead>
      <tbody>
        {eventActions.map(({ userAddress, timestamp, actionStatus }, index) => (
          <tr
            key={index}
            className="text-[#3D3D3D] hover:text-black hover:bg-[#cbd5e173] transition-colors ease-in cursor-pointer"
          >
            <td className="text-sm px-4 py-2 whitespace-nowrap">{userAddress}</td>
            <td className="text-sm px-4 py-2 whitespace-nowrap">
              {formatTimeStampToLocaleDateString(Number(timestamp)) + ' ' + formatTimeStampToLocaleTimeString(Number(timestamp))}
            </td>
            <td className="text-sm px-4 py-2 whitespace-nowrap align-middle text-center hidden sm:table-cell">
              {
                actionStatus ? 'Successful' : 'Failed'
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventActionsTable;
