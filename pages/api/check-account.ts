import type { NextApiRequest, NextApiResponse } from 'next';
import { checkNearAccount } from '../../utils/near';
import Cache from '../../utils/cache';

const cache = new Cache(60); // 1-minute expiration time

interface Query {
  nearid: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query }: { query: unknown } = req;
  const { nearid }: Query = query as Query;
  try {
    const cacheKey = `${nearid}`;

    // Check if result is cached
    let result = cache.get(cacheKey);
    if (result !== undefined) {
      return res.status(200).json(result);
    }

    // Switch between MAINNET and TESTNET
    const network = nearid.includes('.near') ? 'mainnet' : 'testnet';
    result = await checkNearAccount(nearid, network);

    // Cache result
    cache.set(cacheKey, result);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Failed to check the Near account.',
    });
  }
}
