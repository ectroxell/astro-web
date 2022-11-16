import { FunctionComponent, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { app } from '../../firebase/firebase'
import './login.scss';

export const Login: FunctionComponent = () => {
  const auth = getAuth(app)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, loading, error] = useAuthState(auth)

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
  }

  const handleSubmit = (e: any) => {
    login()
    e.preventDefault()
  }

  if (error) {
    return (
      <div>
        <p className='text'>Error: {error.message}</p>
      </div>
    )
  }
  if (loading) {
    return <p className='text'>Loading...</p>
  }

  return (
    <>
      {user === null ? (
        <div className='loginContainer'>
          <form
            onSubmit={e => {
              handleSubmit(e)
            }}
          >
            <div className="email">
              <label className='text'>Email: </label>
              <input
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="email"
              />
            </div>
            <div className="password">
              <label className='text'>Password: </label>
              <input
                onChange={e => setPassword(e.target.value)}
                name="password"
                type="password"
              />
            </div>
            <div className='loginButton'>
              <button>Log In</button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
