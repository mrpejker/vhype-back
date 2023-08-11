/** @module utils */

import axios from 'axios';
import { isEnvProd, isValidHttpUrl } from '../../utils';

/**
 * Validates if the given NEAR Account ID is a valid account ID.
 * @function
 * @param {string} accountId - Account ID to be validated.
 * @returns {boolean} - Returns true if the account id is a valid NEAR account id, otherwise false.
 */
const isValidNearAccountId = (accountId: string): boolean => {
  const regex = /^(([a-z\d]+[-_])[a-z\d]+.)([a-z\d]+[-_])[a-z\d]+$/;
  return regex.test(accountId) && accountId.length <= 64;
};

/**
 * Checks if the given URL is a NEAR contract account URL.
 * @function
 * @async
 * @param {string} checkedUrl - The URL to be checked.
 * @returns {string} - Returns a string with a formatted URL depending on the type of the account.
 */
export const checkIsUrlContract = async (checkedUrl: string): Promise<string> => {
  const network = isEnvProd ? 'mainnet' : 'testnet';

  // Check if checkedUrl is a valid NEAR Account ID
  if (!isValidNearAccountId(checkedUrl)) {
    return checkedUrl;
  }

  try {
    const checkApiResponse = await fetch('/api/check-account?nearid=' + checkedUrl);
    const isContractUrl = await checkApiResponse.json();
    if (!isContractUrl) {
      return 'https://' + checkedUrl;
    } else {
      return 'https://explorer.' + network + '.near.org/accounts/' + checkedUrl;
    }
  } catch (err) {
    return checkedUrl;
  }
};

/**
 * Validates a given URL and fixes it if necessary.
 * @function
 * @param {string} url - The URL to be validated.
 * @returns {string} - Returns a validated URL.
 */
export const validateUrl = (url: string): string => {
  const isValid = isValidHttpUrl(String(url));
  if (!isValid) {
    const fixedUrl = 'https://' + url;
    const anotherTry = isValidHttpUrl(fixedUrl);
    if (anotherTry) {
      return fixedUrl;
    }
  }
  return url;
};

/**
 * Attempts to check the favicon of a provided URL.
 * @function
 * @async
 * @param {string} url - The URL of the page whose favicon needs to be checked.
 * @returns {string} - The URL of the favicon of the provided URL.
 */
export const checkFavIcon = async (url: string): Promise<string | undefined> => {
  try {
    const { data } = await axios.get('/api/parse-links?link=' + url, { timeout: 4000, withCredentials: false });
    return data.icon !== undefined && !data.error ? data.icon : '';
  } catch (err) {
    console.log('err', err);
  }
};
