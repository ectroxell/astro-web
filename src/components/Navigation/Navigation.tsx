import { FunctionComponent, useEffect, useState } from 'react'
import { Home } from '../Home/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'
import './navigation.scss'
import { JournalPage } from '../Journal/Journal'
import { getAuth } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { app } from '../../firebase/firebase'
import { Journal } from '../../domain/types/Journal'
import { getJournalsByUserId } from '../../domain/data/journals'
import { MoonData } from '../../domain/types/MoonData'
import { fetchMoonData } from '../../domain/data/moon-phase'

export const NavigationBar: FunctionComponent = () => {
  const auth = getAuth(app)
  const [user] = useAuthState(auth)
  const [journals, setJournals] = useState<Journal[]>([])

  const moonData: MoonData = fetchMoonData()

  useEffect(() => {
    const getJournals = async (userId: string) => {
      const journalList: Journal[] = await getJournalsByUserId(userId)
      setJournals(journalList)
    }

    if (user) {
      getJournals(user.uid)
    }
  }, [user])

  return (
    <Router>
      <div className="container">
        <nav>
          <ul className="navLinksContainer titleText">
            <li>
              <Link to="/home">Home</Link>
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
        </nav>

        <Routes>
          <Route
            path="/home"
            element={<Home moonData={moonData} user={user} />}
          />
          <Route
            path="/journal"
            element={
              <JournalPage
                journals={journals}
                user={user}
                currentMoonPhase={moonData.phase}
                updateJournals={setJournals}
              />
            }
          />
          {/* <Route path="/rituals">
            <Rituals />
          </Route>
          <Route path="/learn">
            <Learn />
          </Route> */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  )
}
