import { message } from 'antd';
import { type ClassValue, clsx } from 'clsx';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { twMerge } from 'tailwind-merge';

const ENCRYPTION_SECRET = process.env.COOKIE_ENCRYPTION_SECRET || '';

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (
    process.env.VERCEL_ENV === 'production' &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Encryption function
export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_SECRET).toString();
};

// Decryption function
export const decryptData = (encryptedData: string): string | null => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(
      encryptedData,
      ENCRYPTION_SECRET,
    );
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    // Handle decryption errors, e.g., if the data is tampered or the key is incorrect
    return null;
  }
};

// Set encrypted cookie
export const setEncryptedCookie = (
  name: string,
  value: string,
  options: Cookies.CookieAttributes = {},
) => {
  const encryptedValue = encryptData(value);
  Cookies.set(name, encryptedValue, options);
};

// Retrieve and decrypt cookie
export const getDecryptedCookie = (name: string): string | null => {
  const encryptedValue = Cookies.get(name);

  if (encryptedValue) {
    return decryptData(encryptedValue);
  }

  return null;
};

// Set non-encrypted cookie
export const setCookie = (
  name: string,
  value: string,
  options: Cookies.CookieAttributes = {},
) => {
  Cookies.set(name, value, options);
};

// Get non-encrypted cookie
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// filtered Entries
export const filteredEntries = (data: Record<string, any>) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) =>
        value !== null && value !== undefined && value !== 'undefined',
    ),
  );
  return filteredData;
};

// generate query string;
export const generateQueryString = (data: Record<string, any>) => {
  const filteredData = filteredEntries(data);

  const queryString = Object.keys(filteredData)
    .map((key) => {
      const value = data[key];

      if (
        value != null &&
        value !== 'undefined' &&
        value !== undefined &&
        value !== ''
      ) {
        if (Array.isArray(value)) {
          return value
            .map((item) => `${key}=${encodeURIComponent(item)}`)
            .join('&');
        }

        return `${key}=${encodeURIComponent(value)}`;
      }

      // Explicit return of empty string when no value is valid.
      return '';
    })
    .filter(Boolean) // Removes empty strings from the result
    .join('&');

  const fullQueryString = queryString ? `?${queryString}` : '';

  return fullQueryString;
};

export const sliceFromHtml = (htmlString: string, numWords: number): string => {
  // Remove HTML tags from the HTML string
  const text: string = htmlString.replace(/<[^>]+(>|$)/g, '');

  // Split the text into words
  const words: string[] = text.split(/\s+/);

  // Extract the text up to the specified number of words
  const slicedText: string = words.slice(0, numWords).join(' ');

  return slicedText;
};

export function getUploadedFileExtenstion(fileUrl: string) {
  return fileUrl.split('.')[3];
}

export const formatBytes = (bytes: number) => {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
};

export const copyHandler = (copiedTxt: any, msg?: string) => {
  if (!copiedTxt) {
    return;
  }
  navigator.clipboard.writeText(copiedTxt);
  message.success(msg || 'Copied Successfully!');
};

export const banglaDateFormat = (data: string) => {
  if (!data) {
    return;
  }
  const date = new Date(data);
  const options: any = {
    // weekday: "long",
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    // second: "numeric",
    timeZone: 'Asia/Dhaka',
    hour12: true,
  };
  return date?.toLocaleString('bn-BD', options);
};

// remove tags
export const remove_tags = (_html: any) => {
  const html = _html?.toString();
  const strippedString = html?.replace(/(<([^>]+)>)/g, '');
  return strippedString;
};

// printe excerpt
export const excerpt = (_html: any, count = 100) => {
  const text = remove_tags(_html)
    ?.toString()
    .replaceAll('&nbsp;', ' ')
    .replaceAll(/"/g, '');
  return text?.slice(0, count) + (text?.length > count ? '...' : '');
};
