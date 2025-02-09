export class PromptInjectionClassifier {
  private patterns = [/ignore previous instructions/i, /developer mode active/i];
  classify(prompt: string) {
    const isSafe = !this.patterns.some(p => p.test(prompt));
    return { isSafe, threatLevel: isSafe ? "none" : "critical" };
  }
}

// Multilingual evasion

// Blocked terms

// Tokenizer interface

// Early exit
