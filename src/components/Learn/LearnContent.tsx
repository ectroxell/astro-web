import { FunctionComponent } from "react";
import { MoonPhase } from "../../domain/data/moon-phase";
import "./learnContent.scss";

type LearnContentProps = {
  moonPhase: MoonPhase;
  shortDescription: string;
  longDescription: string;
  keywords: string;
}

export const LearnContent: FunctionComponent<LearnContentProps> = (props: LearnContentProps) => {
  return (
    <div className="learnContentContainer">
      <div className="contentHeader titleText">
        <h3>{props.moonPhase}: {props.keywords}</h3>
      </div>
        <p className="text shortDesc">{props.shortDescription}</p>
        <p className="text">{props.longDescription}</p>
    </div>
  )
}