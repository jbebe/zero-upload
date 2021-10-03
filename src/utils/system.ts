export enum Endian { Big, Little };

function getEndianness() {
  const buf = new ArrayBuffer(4);
  const u32data = new Uint32Array(buf);
  const u8data = new Uint8Array(buf);
  
  u32data[0] = 0xcafebabe;
  const isBigEndian = u8data[0] === 0xca;
  
  return isBigEndian ? Endian.Big : Endian.Little;
}

export function toggleEndianness32(n: number): number {
  return (
    ((n & 0xFF) << 24)
    | ((n & 0xFF00) << 8)
    | ((n >> 8) & 0xFF00)
    | ((n >> 24) & 0xFF)
  );
}

export function toggleEndianness16(n: number) {
  return (
    ((n & 0xFF) << 8) 
    | ((n >> 8) & 0xFF)
  );
}

export const Endianness = getEndianness();

export const DefaultBrowserUrlLength = {
  Chrome: {
    text: 'Chrome',
    length: 40000,
    active: false,
  },
  IE: {
    text: 'IE',
    length: 2024,
    active: true,
  },
  Firefox: {
    text: 'Firefox',
    length: 500000,
    active: false,
  },
  Safari: {
    text: 'Safari',
    length: 5100,
    active: false,
  },
};