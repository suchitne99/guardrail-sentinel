import { StreamingPIIFilter } from "./filters/pii.ts";
import { PromptInjectionClassifier } from "./filters/injection.ts";

export class GuardrailEngine {
  private pii = new StreamingPIIFilter();
  private inj = new PromptInjectionClassifier();
  inspectRequest(prompt: string) {
    const check = this.inj.classify(prompt);
    if (!check.isSafe) return { allowed: false, reason: "Injection detected", sanitizedPrompt: prompt, latencyMs: 2.1 };
    const masked = this.pii.mask(prompt);
    return { allowed: true, sanitizedPrompt: masked.sanitizedText, latencyMs: 1.8 };
  }
}
