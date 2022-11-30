import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { MoonPhase } from "../../domain/data/moon-phase";
import "./phaseNavBar.scss";

export const PhaseNavBar: FunctionComponent = () => {
  return (
      <nav>
        <div className="linksContainer">
          <ul>
            <li>
              <Link to="/learn/newMoon">{MoonPhase.NewMoon}</Link>
            </li>
            <li>
              <Link to="/learn/waxingCrescent">{MoonPhase.WaxingCrescent}</Link>
            </li>
            <li>
              <Link to="/learn/firstQuarter">{MoonPhase.FirstQuarter}</Link>
            </li>
            <li>
              <Link to="/learn/waxingGibbous">{MoonPhase.WaxingGibbous}</Link>
            </li>
            <li>
              <Link to="/learn/fullMoon">{MoonPhase.FullMoon}</Link>
            </li>
            <li>
              <Link to="/learn/waningGibbous">{MoonPhase.WaningGibbous}</Link>
            </li>
            <li>
              <Link to="/learn/lastQuarter">{MoonPhase.LastQuarter}</Link>
            </li>
            <li>
              <Link to="/learn/waningCrescent">{MoonPhase.WaningCrescent}</Link>
            </li>
          </ul>
        </div>
      </nav>
  );
};
