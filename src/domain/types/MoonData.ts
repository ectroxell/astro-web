import { JournalPrompt } from "./JournalPrompts";
import { MoonPhase } from "./MoonPhases";

export type MoonData = {
  illuminated?: number;
  phase: MoonPhase;
  journalPrompt: JournalPrompt;
  shortDescription: string;
  longDescription: string;
  keywords: string;
  rituals: string[];
};
