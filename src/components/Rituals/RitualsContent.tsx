import { FunctionComponent } from "react";
import { Emoji } from "../../domain/types/MoonEmojis";
import { MoonPhase } from "../../domain/types/MoonPhases";
import "./ritualsContent.scss";

type RitualsContentProps = {
  moonPhase: MoonPhase;
  rituals: string[];
  emoji: Emoji;
};

export const RitualsContent: FunctionComponent<RitualsContentProps> = (
  props: RitualsContentProps
) => {
  return (
    <div className="ritualsContentContainer">
      <div className="contentHeader titleText">
        <h3>
          {props.moonPhase} {props.emoji}
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
