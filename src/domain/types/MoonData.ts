import { JournalPrompt } from "../data/journal-prompts";
import { MoonPhase } from "../data/moon-phase";

export type MoonData = {
  illuminated: number;
  phase: MoonPhase;
  journalPrompt: JournalPrompt;
};
