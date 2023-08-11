/**
 * A Next.js API route that calls the checkin method of a contract managing events.
 * @param req - The Next.js API request object.
 * @param res - The Next.js API response object.
 * @throws Throws an error if there is an issue with the request or contract method call.
 * @returns Returns a JSON response with information about the checkin.
 * Example request: http://localhost:3000/api/checkin?eventid='3090415815'&nearid='ilerik.testnet'&qr='some_string'
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { checkNearAccount } from '../../utils/near';
// import { accountExists } from 'keypom-js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log('query: ', req.query);

    // Parse query
    let { eventid, nearid, qr }: any = req.query;
    nearid = nearid.slice(1, -1); // trim quotes
    eventid = eventid.slice(1, -1);
    qr = qr.slice(1, -1);

    console.log({ nearid, eventid, qr });
    // Check that near id exists
    nearid = String(nearid).toLowerCase();
    // Switch between MAINNET and TESTNET
    const network_id = nearid.includes('.near') ? 'mainnet' : 'testnet';
    // const account_exists = await accountExists(nearid);
    // TODO return this part after fixing the issue with checkNearAccount
    // const account_exists = await checkNearAccount(nearid, network_id);
    // console.log('account_exists:', account_exists);
    // if (!account_exists) {
    //   res.status(500).json({
    //     index: -1,
    //     got: false,
    //     title: 'nothing',
    //     description: 'nothing',
    //     errorMessage: String('User ID isn&apos;t valid'),
    //   });
    //   return;
    // }

    // Create contract instance
    const { contract }: any = await getConnectedContract();

    // Set appropriate gas and storage cost
    const gas_cost = 300000000000000;
    const minting_cost = '25000000000000000000000'; // 0.01 NEAR

    // Call checkin
    const result = await contract
      .checkin({
        args: { event_id: Number(eventid), username: String(nearid), request: String(qr) },
        gas: gas_cost,
        amount: minting_cost,
      })
      .catch((err: Error): void => {
        console.log('err');
        res.status(500).json({
          index: -1,
          got: false,
          title: 'nothing',
          description: 'nothing',
          errorMessage: String(err),
        });
        return;
      });

    console.log('result: ', result);

    // Special case
    if (result === null) {
      res.json({
        index: -1,
        got: false,
        title: 'nothing',
        description: 'nothing',
      });
      return;
    }

    // Success
    // const event = await contract.get_event_data({ event_id: Number(eventid) });
    // result['eventName'] = event.event_name;
    // result['hashtags'] = [' ']; // hide hashtag value for some time
    res.status(200).json(result);
  } catch (err: unknown) {
    console.log('catch');
    console.log({ err });
    res.status(500).json({
      index: -1,
      got: false,
      error: true,
      title: 'nothing',
      description: 'nothing',
      errorMessage: String(err),
    });
  }
}
