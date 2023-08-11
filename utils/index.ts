/**
 * Utility functions for common tasks.
 * @module utils
 */
/* eslint-disable @typescript-eslint/no-var-requires */
const nacl = require('tweetnacl');
const { createHash } = require('crypto');
import { utils } from 'near-api-js';
import Resizer from 'react-image-file-resizer';
import { NFTStorage } from 'nft.storage';

/**
 * Checks if environment is production.
 * @type {boolean}
 */
export const isEnvProd = process.env.ENV_STAT == 'production';

/**
 * Generates a SHA-256 hash of a message.
 * @param {string} msg - The message to hash.
 * @returns {string} - The hash string.
 */
export const hash = (msg: string): string => {
  return createHash('sha256').update(msg).digest('hex');
};

/**
 * Converts amount in NEAR to amount in yocto NEAR (10^-24).
 * @param {string} amount - The amount in NEAR to convert.
 * @returns {string} - The amount in yocto NEAR.
 */
export const amountInYocto = (amount: string): string | null => utils.format.parseNearAmount(amount);

/**
 * Converts amount in yocto NEAR to amount in NEAR.
 * @param {string} amount - The amount in yocto NEAR to convert.
 * @returns {string} - The amount in NEAR.
 */
export const amountInNEAR = (amount: string): string => utils.format.formatNearAmount(amount);

/**
 * Generates a random hash string.
 * @returns {string} - The random hash string.
 */
export const getRandomHashString = (): string => {
  const randomBytes = nacl.randomBytes(64);
  return Array.from(randomBytes, function (byte: number) {
    return ('0' + (byte & 0xff).toString(16)).slice(-2);
  }).join('');
};

/**
 * Formats a timestamp to a localized date string.
 * @param {number} timestamp - The Unix timestamp to format.
 * @returns {string} - The formatted date string.
 */
export const formatTimeStampToLocaleDateString = (timestamp: number): string => {
  return new Date(timestamp / 1000000).toLocaleDateString();
};

/**
 * Formats a timestamp to a localized time string.
 * @param {number} timestamp - The Unix timestamp to format.
 * @returns {string} - The formatted time string.
 */
export const formatTimeStampToLocaleTimeString = (timestamp: number): string => {
  return new Date(timestamp / 1000000).toLocaleTimeString();
};

/**
 * Resizes image file to provided dimensions.
 * @param {File} file - The image file to resize.
 * @returns {Promise<File>} - The resized image file.\n */
export const resizeFile = (file: File): Promise<File> =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      450,
      450,
      'PNG',
      100,
      0,
      (uri: any) => {
        resolve(uri);
      },
      'file',
      450,
      450
    );
  });

/**
 * Gets current geolocation coordinates.
 * @returns {Promise<{long: number, lat: number}|null>} - The geolocation coordinates.
 */
export const getCoords = async (): Promise<{ long: number; lat: number } | null> => {
  try {
    const pos: any = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
    };
  } catch (err) {
    return null;
  }
};

/**
 * Checks if a string is empty or contains only whitespace.
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is empty or contains only whitespace, false otherwise.
 */
export const isStringEmpty = (str: string): boolean => {
  return !str.trim().length;
};

/**
 * Checks if a string is a valid HTTP or HTTPS URL.
 * @param {string} str - The string to check.
 * @returns {boolean} - True if the string is a valid HTTP or HTTPS URL, false otherwise.
 */
export const isValidHttpUrl = (str: string): boolean => {
  let url;

  try {
    url = new URL(str);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};

/**
 * Generates and downloads a QR code image file.
 * @param {string} qrString - The string to encode as a QR code.
 */
export const downloadQR = (qrString: string): void => {
  const svg: any = document.getElementById('qrcode');
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement('canvas');
  const ctx: any = canvas.getContext('2d');
  const img = new Image();
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL('image/png');

    const downloadLink = document.createElement('a');
    downloadLink.download = String(qrString);
    downloadLink.href = `${pngFile}`;
    downloadLink.click();
  };

  img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
};

/**
 * Uploads the given File to IPFS using NFT.Storage.
 * @param {File} file - The file to be uploaded to IPFS.
 * @returns {Promise<string>} - A promise that resolves with the CID of the uploaded file.
 */
export const uploadImageToIPFS = async (file: File) => {
  const client = new NFTStorage({ token: process.env.NFT_STORAGE_API_KEY ?? '' });
  const arrayBuffer = await file.arrayBuffer();
  const blobData = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
  const cid = await client.storeBlob(blobData);
  return cid;
};
