import { StreamingPIIFilter } from "./filters/pii.js";
import { PromptInjectionClassifier } from "./filters/injection.js";

export class GuardrailEngine {
  private pii = new StreamingPIIFilter();
  private inj = new PromptInjectionClassifier();
  inspectRequest(prompt: string) {
    const check = this.inj.classify(prompt);
    if (!check.isSafe) return { allowed: false, reason: "Injection detected" };
    return { allowed: true, sanitizedPrompt: this.pii.mask(prompt).sanitizedText };
  }
}

// GC minimization

// Hallucination lookup

// Buffer concat

// Prometheus counter

// Standardized return types
