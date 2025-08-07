
/**
 * Generate a RFC4122 UUID v4 safely across browsers/environments.
 * Prefers crypto.randomUUID, falls back to getRandomValues, then a final template fallback.
 */
export function safeUuidV4(): string {
  const g: any = globalThis as any;

  // 1) Native randomUUID
  if (g?.crypto?.randomUUID) {
    try {
      return g.crypto.randomUUID();
    } catch {
      // continue to next fallback
    }
  }

  // 2) getRandomValues-based v4
  const cryptoObj = g?.crypto || g?.msCrypto;
  if (cryptoObj?.getRandomValues) {
    try {
      const buf = new Uint8Array(16);
      cryptoObj.getRandomValues(buf);
      // Per RFC4122:
      buf[6] = (buf[6] & 0x0f) | 0x40; // version 4
      buf[8] = (buf[8] & 0x3f) | 0x80; // variant 10
      const hex = Array.from(buf, (b) => b.toString(16).padStart(2, '0'));
      return [
        hex.slice(0, 4).join(''),
        hex.slice(4, 6).join(''),
        hex.slice(6, 8).join(''),
        hex.slice(8, 10).join(''),
        hex.slice(10, 16).join(''),
      ].join('-');
    } catch {
      // continue to next fallback
    }
  }

  // 3) Final minimal fallback
  // Not cryptographically strong, but ensures UUID shape to satisfy DB constraints.
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return template.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

