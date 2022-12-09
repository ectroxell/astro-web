import { JournalPrompt } from "./JournalPrompts";

export type Journal = {
  date: Date;
  moonPhase: string;
  text: string;
  userId: string;
  id: string;
  journalPrompt?: JournalPrompt;
};
