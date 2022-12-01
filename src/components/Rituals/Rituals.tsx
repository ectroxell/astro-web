import { FunctionComponent } from "react";
import { PhaseNavBar } from "../PhaseNavBar/PhaseNavBar";
import { RitualsContent } from "./RitualsContent";
import { MoonData } from "../../domain/types/MoonData";
import './rituals.scss';

type RitualsProps = {
  moonData: MoonData;
};

export const Rituals: FunctionComponent<RitualsProps> = (props: RitualsProps) => {
  return (
    <div className="text ritualsContainer">
      <PhaseNavBar parent={"rituals"}/>
      <RitualsContent
        moonPhase={props.moonData.phase}
        rituals={props.moonData.rituals}
        emoji={props.moonData.emoji}
      />
    </div>
  )
}