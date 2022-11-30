import { FunctionComponent } from "react";
import { MoonData } from "../../domain/types/MoonData";
import { PhaseNavBar } from "../PhaseNavBar/PhaseNavBar";
import "./learn.scss";
import { LearnContent } from "./LearnContent";

type LearnProps = {
  moonData: MoonData;
};

export const Learn: FunctionComponent<LearnProps> = (props: LearnProps) => {
  return (
    <div className="text learnContainer">
      <PhaseNavBar />
      <LearnContent
        moonPhase={props.moonData.phase}
        shortDescription={props.moonData.shortDescription}
        longDescription={props.moonData.longDescription}
        keywords={props.moonData.keywords}
      />
    </div>
  );
};
