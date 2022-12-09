import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { MoonPhase } from "../../domain/types/MoonPhases";
import "./phaseNavBar.scss";

type PhaseNavBarProps = {
  parent: string;
}
export const PhaseNavBar: FunctionComponent<PhaseNavBarProps> = (props: PhaseNavBarProps) => {
  return (
    <nav>
      <ul className="linksContainer">
        <li>
          <Link to={`/${props.parent}/newMoon`}>{MoonPhase.NewMoon}</Link>
        </li>
        <li>
          <Link to={`/${props.parent}/waxingCrescent`}>{MoonPhase.WaxingCrescent}</Link>
        </li>
        <li>
          <Link to={`/${props.parent}/firstQuarter`}>{MoonPhase.FirstQuarter}</Link>
        </li>
        <li>
          <Link to={`/${props.parent}/waxingGibbous`}>{MoonPhase.WaxingGibbous}</Link>
        </li>
        <li>
          <Link to={`/${props.parent}/fullMoon`}>{MoonPhase.FullMoon}</Link>
        </li>
        <li>
          <Link to={`/${props.parent}/waningGibbous`}>{MoonPhase.WaningGibbous}</Link>
        </li>
        <li>
          <Link to={`/${props.parent}/lastQuarter`}>{MoonPhase.LastQuarter}</Link>
        </li>
        <li>
          <Link to={`/${props.parent}/waningCrescent`}>{MoonPhase.WaningCrescent}</Link>
        </li>
      </ul>
    </nav>
  );
};
