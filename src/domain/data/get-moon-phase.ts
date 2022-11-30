import { MoonData } from "../types/MoonData";
import SunCalc from "suncalc";
import { JournalPrompt } from "./journal-prompts";
import { MoonPhase } from "./moon-phase";

export const fetchCurrentMoonData = () => {
  const date = new Date();
  const rawMoonData = SunCalc.getMoonIllumination(date);
  const phase = getMoonPhase(rawMoonData.phase);
  const moonData = getMoonDataByPhase(phase);
  const currentMoonData: MoonData = {
    ...moonData,
    illuminated: Math.round(rawMoonData.fraction * 100),
  };
  return currentMoonData;
};

export const getMoonDataByPhase = (phase: MoonPhase) => {
  let moonData: MoonData;
  if (phase === MoonPhase.NewMoon) {
    moonData = {
      phase,
      journalPrompt: JournalPrompt.NewMoon,
      shortDescription: "Listen to your intuition and allow new ideas to form.",
      longDescription:
        "The new moon is the perfect time to set intentions. At this time, it's not visible in the sky. It is sometimes called the dark moon or the hare moon. The energy of the new moon is quiet. Without the benefit of the moon's light, our ancestors rested on new moon nights. Use this time to go inward and reflect on your desires. Set intentions for your life. Think of these intentions as seeds. What will you cultivate during the moon cycle?",
      keywords: "Set intentions",
    };
  } else if (phase === MoonPhase.FirstQuarter) {
    moonData = {
      phase,
      journalPrompt: JournalPrompt.FirstQuarter,
      shortDescription: "Take action and build momentum.",
      longDescription:
        "This phase is about development. You planted your seeds on the new moon. Now it's time to help them grow! The first qurater moon can inspire you to take action, make decisions, and overcome challenges. Work towards your goals.",
      keywords: "Develop",
    };
  } else if (phase === MoonPhase.FullMoon) {
    moonData = {
      phase,
      journalPrompt: JournalPrompt.FullMoon,
      shortDescription: "Celebrate your progress.",
      longDescription:
        "When the moon is completely illuminated, it's time to reach full expression. The full moon is the most powerful time of the moon cycle. Enjoy the full expression of life. Be fully engaged. Let the light of the moon energize you. This is your harvest. Harvest new internal realizations. Take note of your epiphanies. Harvest external success. Enjoy the life you are creating. Celebrate. This is a powerfully healing time. Send healing blessings to others.",
      keywords: "Full expression",
    };
  } else if (phase === MoonPhase.LastQuarter) {
    moonData = {
      phase,
      journalPrompt: JournalPrompt.LastQuarter,
      shortDescription: "Take stock of your life. Find room to let go.",
      longDescription:
        "When the moon appears smaller and becomes half-illuminated, it's time to think about releasing. The third quarter moon phase signals a time to let go. Release anything you no longer need to make room for the new! Meditate on what you've learned during the course of the moon cycle. Take stock of your life and notice if there are any relationships, commitments, physical objects, habits, or emotions you are ready to let go of. Letting go will free up energy that can be used during the next moon cycle. This is a quiet time to rest and restore.",
      keywords: "Release",
    };
  } else if (phase === MoonPhase.WaningCrescent) {
    moonData = {
      phase,
      journalPrompt: JournalPrompt.WaningCrescent,
      shortDescription:
        "Rest and restore - get very quiet so that you can hear your intuition.",
      longDescription:
        "The waning crescent phase marks the end of the lunar cycle. It is time for surrender and rest. No more action, thinking, or planning is required - just relax and trust in the process.",
      keywords: "Silence",
    };
  } else if (phase === MoonPhase.WaxingCrescent) {
    moonData = {
      phase,
      journalPrompt: JournalPrompt.WaxingCrescent,
      shortDescription: "Get excited about new possibilites.",
      longDescription:
        "The waxing crescent moon phase is when we first see the new moon illuminated by the sun. This is a clear example of a shift and change, and this moon phase also presents us with an opportunity to create change in our own lives. For many, that’s what this moon phase is all about and what it represents. It’s important to consider what you’re working towards in life and become more aware of the opportunities that might arise around you during this time. Allow yourself to be bolder and make the most of the opportunities in front of you.",
      keywords: "Be curious",
    };
  } else if (phase === MoonPhase.WaningGibbous) {
    moonData = {
      phase,
      journalPrompt: JournalPrompt.WaningGibbous,
      shortDescription: "Reflect and teach others what you've learned.",
      longDescription:
        "After the moon has had maximum illumination, the light slowly starts to decrease in the waning gibbous phase. Spiritually, it is time to get rid of some of those bad habits, stresses, and any negative thinking that you have been experiencing. Now is the time to focus on effectively communicating with others, and revealing that in which you have been keeping in.",
      keywords: "Share",
    };
  } else if (phase === MoonPhase.WaxingGibbous) {
    moonData = {
      phase,
      journalPrompt: JournalPrompt.WaxingGibbous,
      shortDescription: "Refine and make improvements.",
      longDescription:
        "The waxing gibbous moon is an opportunity for you to become more mindful in what you are doing, paying that little extra bit of attention to your circumstances. It’s a time to reflect on what’s working for you right now, and what might need to change. Ultimately, the waxing gibbous moon is a period for you to work hard and get to where you want to be in your life. It’s part of the ebb and flow of nature - a time for putting in the effort before you can enjoy your creations and relax.",
      keywords: "Improve",
    };
  } else {
    throw new Error("Invalid value");
  }
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
