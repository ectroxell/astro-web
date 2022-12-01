import { FunctionComponent } from "react";
import { MoonPhase } from "../../domain/types/MoonPhases";
import "./learnContent.scss";

type LearnContentProps = {
  moonPhase: MoonPhase;
  shortDescription: string;
  longDescription: string;
  keywords: string;
};

export const LearnContent: FunctionComponent<LearnContentProps> = (
  props: LearnContentProps
) => {
  return (
    <div className="learnContentContainer">
      <div className="contentHeader titleText">
        <h3>
          {props.moonPhase}: {props.keywords}
        </h3>
      </div>
      <div className="contentBody">
        <p className="text shortDesc">{props.shortDescription}</p>
        <p className="text longDesc">{props.longDescription}</p>
      </div>
    </div>
  );
};
