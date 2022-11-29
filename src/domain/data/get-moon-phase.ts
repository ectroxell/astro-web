import { MoonData } from "../types/MoonData";
import SunCalc from "suncalc";
import { JournalPrompt } from "./journal-prompts";
import { MoonPhase } from "./moon-phase";

export const fetchMoonData = () => {
  const date = new Date();
  const rawMoonData = SunCalc.getMoonIllumination(date);
  const phase = getMoonPhase(rawMoonData.phase);
  const journalPrompt = getJournalPrompt(phase);
  const moonData: MoonData = {
    illuminated: Math.round(rawMoonData.fraction * 100),
    phase,
    journalPrompt,
  };
  return moonData;
};

const getMoonPhase = (phaseAsFraction: number) => {
  let moonPhase;
  if (phaseAsFraction >= 0 && phaseAsFraction <= 0.05) {
    moonPhase = MoonPhase.NewMoon;
  } else if (phaseAsFraction >= 0.25 && phaseAsFraction <= 0.3) {
    moonPhase = MoonPhase.FirstQuarter;
  } else if (phaseAsFraction >= 0.5 && phaseAsFraction <= 0.55) {
    moonPhase = MoonPhase.FullMoon;
  } else if (phaseAsFraction >= 0.75 && phaseAsFraction <= 0.8) {
    moonPhase = MoonPhase.LastQuarter;
  } else if (phaseAsFraction > 0.05 && phaseAsFraction < 0.25) {
    moonPhase = MoonPhase.WaxingCrescent;
  } else if (phaseAsFraction > 0.3 && phaseAsFraction < 0.5) {
    moonPhase = MoonPhase.WaxingGibbous;
  } else if (phaseAsFraction > 0.55 && phaseAsFraction < 0.75) {
    moonPhase = MoonPhase.WaningGibbous;
  } else if (phaseAsFraction > 0.8 && phaseAsFraction < 1) {
    moonPhase = MoonPhase.WaningCrescent;
  } else {
    throw new Error("Invalid value");
  }
  return moonPhase;
};

const getJournalPrompt = (phase: MoonPhase) => {
  let journalPrompt;
  if (phase === MoonPhase.NewMoon) {
    journalPrompt = JournalPrompt.NewMoon;
  } else if (phase === MoonPhase.FirstQuarter) {
    journalPrompt = JournalPrompt.FirstQuarter;
  } else if (phase === MoonPhase.FullMoon) {
    journalPrompt = JournalPrompt.FullMoon;
  } else if (phase === MoonPhase.LastQuarter) {
    journalPrompt = JournalPrompt.LastQuarter;
  } else if (phase === MoonPhase.WaningCrescent) {
    journalPrompt = JournalPrompt.WaningCrescent;
  } else if (phase === MoonPhase.WaxingCrescent) {
    journalPrompt = JournalPrompt.WaxingCrescent;
  } else if (phase === MoonPhase.WaningGibbous) {
    journalPrompt = JournalPrompt.WaningGibbous;
  } else if (phase === MoonPhase.WaxingGibbous) {
    journalPrompt = JournalPrompt.WaxingGibbous;
  } else {
    throw new Error("Invalid value");
  }
  return journalPrompt;
};
