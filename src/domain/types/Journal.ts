import { JournalPrompt } from "../data/journal-prompts";

export type Journal = {
  date: Date;
  moonPhase: string;
  text: string;
  userId: string;
  id: string;
  journalPrompt?: JournalPrompt;
};
