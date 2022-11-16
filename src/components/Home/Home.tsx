import { getAuth, signOut } from 'firebase/auth'
import { FunctionComponent, useState } from 'react'
import { app } from '../../firebase/firebase'
import { Login } from '../Login/Login'
import { SignUp } from '../SignUp/SignUp'
import './home.scss'
import '../../index.scss'
import MoonIcon from '../assets/icons/Moon'
import { MoonData } from '../../domain/types/MoonData'

type HomeProps = {
  moonData: MoonData
  user: any | null
}
export const Home: FunctionComponent<HomeProps> = (props: HomeProps) => {
  const auth = getAuth(app)
  const [isLogin, setIsLogin] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const logout = () => {
    signOut(auth)
  }

  if (props.user) {
    return (
      <>
        <div className="welcomeContainer text">
          <MoonIcon width={'180pt'} height={'180pt'} />
          <p className="titleText">Welcome to Moonology</p>
          <p>Hello {props.user!.displayName}! ✨</p>
          {props.moonData ? (
            <p>
              The moon is {props.moonData.illuminated}% illuminated and in the{' '}
              {props.moonData.phase} phase.
            </p>
          ) : null}
          <button onClick={logout}>Log out</button>
        </div>
      </>
    )
  }
  return (
    <>
      <div className="homeWrapper">
        <div className="homeContainer">
          <MoonIcon width={'180pt'} height={'180pt'} />
          <p className="titleText">Welcome to Moonology</p>
        </div>
        <div className="homeContainer text">
          <div className="buttonContainer">
            <button
              onClick={() => {
                setIsLogin(true)
                setIsSignUp(false)
              }}
              hidden={isLogin}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsSignUp(true)
                setIsLogin(false)
              }}
              hidden={isSignUp}
            >
              Sign Up
            </button>
          </div>
          {isLogin && <Login />}
          {isSignUp && <SignUp />}
        </div>
      </div>
    </>
  )
}
