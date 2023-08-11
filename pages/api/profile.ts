import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnectedContract } from '../../utils/contract';
import { socialContractMethods, socialContractName } from '../../utils/contract-methods';

interface Query {
  nearid: string;
}
/// Returns event data
/// Request example: http://localhost:3000/api/event?eventid='my_event'
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query }: { query: unknown } = req;
    const { nearid }: Query = query as Query;
    // Get data using contract call
    const { contract } = await getConnectedContract(socialContractName, socialContractMethods);
    const result = await contract.get({ keys: [`${nearid}/vself/**`] });
    // Parse the data and udpate the state
    const { vself } = result[nearid!];
    vself.links = vself.links ? Object.values(vself.links) : [];
    vself.nfts = vself.nfts ? Object.values(vself.nfts) : [];
    // Check if profile was already saved before
    const isInitialized = Boolean(result[nearid!]);
    res.status(200).json({ vself, isInitialized, error: false });
  } catch (err) {
    console.log('what happened: ', err);
    res.status(200).json({ error: true });
  }
}
