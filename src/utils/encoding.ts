import { makeBaseEncoder, makeBaseDecoder } from '@urlpack/base-codec';

/* Given this table:
  https://perishablepress.com/stop-using-unsafe-characters-in-urls/#character-encoding-chart
  We use alphanumeric characters and - . _ as these are NOT required to be encoded in the URL
*/
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-._';
const encoder = makeBaseEncoder(alphabet);
const decoder = makeBaseDecoder(alphabet);

export function baseUrlDecode(text: string): Uint8Array {
  return decoder.decode(text);
}

export function baseUrlEncode(data: Uint8Array): string {
  return encoder.encode(data);
}
