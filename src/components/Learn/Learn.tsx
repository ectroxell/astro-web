import { FunctionComponent } from "react";
import { MoonData } from "../../domain/types/MoonData";
import { PhaseNavBar } from "../PhaseNavBar/PhaseNavBar";
import { LearnContent } from "./LearnContent";
import "./learn.scss";

type LearnProps = {
  moonData: MoonData;
};

export const Learn: FunctionComponent<LearnProps> = (props: LearnProps) => {
  return (
    <div className="text learnContainer">
      <PhaseNavBar parent={"learn"}/>
      <LearnContent
        moonPhase={props.moonData.phase}
        shortDescription={props.moonData.shortDescription}
        longDescription={props.moonData.longDescription}
        keywords={props.moonData.keywords}
      />
    </div>
  );
};
