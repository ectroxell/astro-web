import { getAuth, updateProfile } from 'firebase/auth'
import { useState } from 'react'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { app } from '../../firebase/firebase'
import './signup.scss';

export const SignUp = () => {
  const auth = getAuth(app)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth)

  const handleSubmit = (e: any) => {
    createUserWithEmailAndPassword(email, password).then(result => {
      const user = auth.currentUser
      if (user) {
        return updateProfile(user, { displayName })
      }
    })
    e.preventDefault()
  }
  return (
    <>
    <div className='signUpContainer'>
      <form
        onSubmit={e => {
          handleSubmit(e)
        }}
      >
        <div className="email text">
          <label>Email: </label>
          <input
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
          />
        </div>
        <div className="password text">
          <label>Password: </label>
          <input
            onChange={e => setPassword(e.target.value)}
            name="password"
            type="password"
          />
        </div>
        <div className="displayName text">
          <label>Name: </label>
          <input
            onChange={e => setDisplayName(e.target.value)}
            name="displayName"
            type="text"
          />
        </div>
        <div className='createAccountButton'>
          <button>Create Account</button>
        </div>
      </form>
      </div>
    </>
  )
}
