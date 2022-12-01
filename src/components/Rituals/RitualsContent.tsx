import { FunctionComponent } from "react";
import { MoonPhase } from "../../domain/types/MoonPhases";
import "./ritualsContent.scss";

type RitualsContentProps = {
  moonPhase: MoonPhase;
  rituals: string[];
};

export const RitualsContent: FunctionComponent<RitualsContentProps> = (
  props: RitualsContentProps
) => {
  return (
    <div className="ritualsContentContainer">
      <div className="contentHeader titleText">
        <h3>
          {props.moonPhase}
        </h3>
      </div>
      <div className="contentBody">
        {props.rituals.map((ritual: string) => (
          <div>
            <p>{ritual}</p>
          </div>
        ))}
        
      </div>
    </div>
  );
};
