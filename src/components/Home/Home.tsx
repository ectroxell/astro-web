import { getAuth, signOut } from "firebase/auth";
import { FunctionComponent, useState } from "react";
import { app } from "../../firebase/firebase";
import { Login } from "../Login/Login";
import { SignUp } from "../SignUp/SignUp";
import "./home.scss";
import "../../index.scss";
import MoonIcon from "../../assets/icons/MoonIcon";
import { MoonData } from "../../domain/types/MoonData";

type HomeProps = {
  moonData: MoonData;
  user: any | null;
};
export const Home: FunctionComponent<HomeProps> = (props: HomeProps) => {
  const auth = getAuth(app);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const logout = () => {
    signOut(auth);
  };

  return (
    <>
      <div className="homeWrapper">
        <div className="homeContainer">
          <MoonIcon width={"180pt"} height={"180pt"} />
          <p className="titleText">Welcome to Moonology</p>
          <div className="welcomeContainer text">
            {props.user ? (
              <>
                <p>Hello {props.user!.displayName}! ✨</p>
              </>
            ) : null}
            {props.moonData ? (
              <p>
                The moon is {props.moonData.illuminated}% illuminated and in the{" "}
                {props.moonData.phase} phase {props.moonData.emoji}
              </p>
            ) : null}
            {props.user ? <button onClick={logout}>Log out</button> : null}
          </div>
        </div>

        <div className="homeContainer text">
          <div
            className="buttonContainer"
            style={props.user ? { display: "none" } : {}}
          >
            <button
              onClick={() => {
                setIsLogin(true);
                setIsSignUp(false);
              }}
              hidden={isLogin}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsSignUp(true);
                setIsLogin(false);
              }}
              hidden={isSignUp}
            >
              Sign Up
            </button>
          </div>
          {isLogin && <Login />}
          {isSignUp && <SignUp hideForm={() => setIsSignUp(false)} />}
        </div>
      </div>
    </>
  );
};
