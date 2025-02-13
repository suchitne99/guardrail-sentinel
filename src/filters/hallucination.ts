export interface HallucinationResult {
  groundedRatio: number;
  isGrounded: boolean;
  unsupportedClaims: string[];
}

export class HallucinationDetector {
  checkFaithfulness(context: string, response: string): HallucinationResult {
    const sentences = response.split(/(?<=[.?!])\s+/).filter(s => s.trim().length > 10);
    if (sentences.length === 0) {
      return { groundedRatio: 1.0, isGrounded: true, unsupportedClaims: [] };
    }

    const contextLower = context.toLowerCase();
    const unsupported: string[] = [];

    for (const s of sentences) {
      const words = s.toLowerCase().replace(/[^a-z0-9 ]/g, "").split(" ").filter(w => w.length > 4);
      const matchCount = words.filter(w => contextLower.includes(w)).length;
      const coverage = words.length > 0 ? (matchCount / words.length) : 1.0;
      if (coverage < 0.35) {
        unsupported.push(s);
      }
    }

    const groundedRatio = 1.0 - (unsupported.length / sentences.length);
    return {
      groundedRatio,
      isGrounded: groundedRatio >= 0.80,
      unsupportedClaims: unsupported
    };
  }
}

// Set intersection vectorization
