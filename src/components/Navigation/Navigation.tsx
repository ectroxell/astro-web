import { FunctionComponent, useEffect, useState } from "react";
import { Home } from "../Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./navigation.scss";
import { JournalPage } from "../Journal/Journal";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../../firebase/firebase";
import { Journal } from "../../domain/types/Journal";
import { getJournalsByUserId } from "../../domain/data/journals";
import { MoonData } from "../../domain/types/MoonData";
import {
  fetchCurrentMoonData,
  getMoonDataByPhase,
} from "../../domain/data/getMoonData";
import { Rituals } from "../Rituals/Rituals";
import { Learn } from "../Learn/Learn";
import { MoonPhase } from "../../domain/types/MoonPhases";
import ProfileIcon from "../../assets/icons/ProfileIcon";

export const NavigationBar: FunctionComponent = () => {
  const auth = getAuth(app);
  const [user] = useAuthState(auth);
  const [journals, setJournals] = useState<Journal[]>([]);

  const currentMoonData: MoonData = fetchCurrentMoonData();

  useEffect(() => {
    const getJournals = async (userId: string) => {
      const journalList: Journal[] = await getJournalsByUserId(userId);
      setJournals(journalList);
    };

    if (user) {
      getJournals(user.uid);
    }
  }, [user]);

  return (
    <Router>
      <div className="container">
        <nav className="navLinksContainer">
          <ul className="titleText">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/journal">Journal</Link>
            </li>
            <li>
              <Link to="/rituals">Rituals</Link>
            </li>
            <li>
              <Link to="/learn">Learn</Link>
            </li>
          </ul>
          {user ? (
            <div className="profileLink">
              <Link to="/profile">
                <ProfileIcon width={"45pt"} height={"45pt"} />
              </Link>
            </div>
          ) : null}
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Home moonData={currentMoonData} user={user} />}
          />
          <Route
            path="/journal"
            element={
              <JournalPage
                journals={journals}
                user={user}
                currentMoonPhase={currentMoonData.phase}
                journalPrompt={currentMoonData.journalPrompt}
                updateJournals={setJournals}
              />
            }
          />
          <Route
            path="/rituals"
            element={<Rituals moonData={currentMoonData} />}
          />
          <Route path="/learn" element={<Learn moonData={currentMoonData} />} />
          <Route
            path="/learn/newMoon"
            element={<Learn moonData={getMoonDataByPhase(MoonPhase.NewMoon)} />}
          />
          <Route
            path="/learn/waxingCrescent"
            element={
              <Learn moonData={getMoonDataByPhase(MoonPhase.WaxingCrescent)} />
            }
          />
          <Route
            path="/learn/firstQuarter"
            element={
              <Learn moonData={getMoonDataByPhase(MoonPhase.FirstQuarter)} />
            }
          />
          <Route
            path="/learn/waxingGibbous"
            element={
              <Learn moonData={getMoonDataByPhase(MoonPhase.WaxingGibbous)} />
            }
          />
          <Route
            path="/learn/fullMoon"
            element={
              <Learn moonData={getMoonDataByPhase(MoonPhase.FullMoon)} />
            }
          />
          <Route
            path="/learn/waningGibbous"
            element={
              <Learn moonData={getMoonDataByPhase(MoonPhase.WaningGibbous)} />
            }
          />
          <Route
            path="/learn/lastQuarter"
            element={
              <Learn moonData={getMoonDataByPhase(MoonPhase.LastQuarter)} />
            }
          />
          <Route
            path="/learn/waningCrescent"
            element={
              <Learn moonData={getMoonDataByPhase(MoonPhase.WaningCrescent)} />
            }
          />
          <Route
            path="/rituals/newMoon"
            element={
              <Rituals moonData={getMoonDataByPhase(MoonPhase.NewMoon)} />
            }
          />
          <Route
            path="/rituals/waxingCrescent"
            element={
              <Rituals
                moonData={getMoonDataByPhase(MoonPhase.WaxingCrescent)}
              />
            }
          />
          <Route
            path="/rituals/firstQuarter"
            element={
              <Rituals moonData={getMoonDataByPhase(MoonPhase.FirstQuarter)} />
            }
          />
          <Route
            path="/rituals/waxingGibbous"
            element={
              <Rituals moonData={getMoonDataByPhase(MoonPhase.WaxingGibbous)} />
            }
          />
          <Route
            path="/rituals/fullMoon"
            element={
              <Rituals moonData={getMoonDataByPhase(MoonPhase.FullMoon)} />
            }
          />
          <Route
            path="/rituals/waningGibbous"
            element={
              <Rituals moonData={getMoonDataByPhase(MoonPhase.WaningGibbous)} />
            }
          />
          <Route
            path="/rituals/lastQuarter"
            element={
              <Rituals moonData={getMoonDataByPhase(MoonPhase.LastQuarter)} />
            }
          />
          <Route
            path="/rituals/waningCrescent"
            element={
              <Rituals
                moonData={getMoonDataByPhase(MoonPhase.WaningCrescent)}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};
