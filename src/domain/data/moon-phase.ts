import { MoonData } from "../types/MoonData";
import SunCalc from 'suncalc';

export const fetchMoonData = () => {
  const date = new Date();
  const rawMoonData = SunCalc.getMoonIllumination(date);
  const phase = getMoonPhase(rawMoonData.phase);
  const moonData: MoonData = {illuminated: Math.round(rawMoonData.fraction * 100), phase}
  return moonData;
}

const getMoonPhase = (phaseAsFraction: number) => {
  let moonPhase;
  if (phaseAsFraction >= 0 && phaseAsFraction <= 0.05) {
    moonPhase = "New Moon";
  } else if (phaseAsFraction >= 0.25 && phaseAsFraction <= 0.3) {
    moonPhase = "First Quarter";
  } else if (phaseAsFraction >= 0.5 && phaseAsFraction <= 0.55) {
    moonPhase = "Full Moon";
  } else if (phaseAsFraction >= 0.75 && phaseAsFraction <= 0.8) {
    moonPhase = "Last Quarter";
  } else if (phaseAsFraction > 0.05 && phaseAsFraction < 0.25) {
    moonPhase = "Waxing Crescent";
  } else if (phaseAsFraction > 0.3 && phaseAsFraction < 0.5) {
    moonPhase = "Waxing Gibbous";
  } else if (phaseAsFraction > 0.55 && phaseAsFraction < 0.75) {
    moonPhase = "Waning Gibbous";
  } else if (phaseAsFraction > 0.8 && phaseAsFraction < 1) {
    moonPhase = "Waning Crescent";
  } else {
    throw(new Error('Invalid value'))
  }
  return moonPhase;
}