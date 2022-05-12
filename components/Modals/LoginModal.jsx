import React, { useState } from 'react'
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap'
import { setCookies } from 'cookies-next'
import { useDispatch } from 'react-redux'
import { loadUser } from '../../redux/users/actionsUsers'

export default function LoginModal({ loginModal, setLoginModal }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [errorInvalid, setErrorInvalid] = useState('')
  const [error, setError] = useState('')

  const [showToast, setShowToast] = useState(false)

  const toggleShowToast = () => setShowToast(!showToast)

  const dispatch = useDispatch();

  const tryToLogin = async () => {
    resetErrors()
    if (email !== '' && password !== '') {
      const data = {
        email,
        password
      }

      try {
        await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.message) {
              if (data.message === 'Invalid Email or Password.') {
                setErrorInvalid('Invalid Email or Password.')
              }
            } else {
              setCookies('jwt', data.token)
              setUserName(data.pseudo)
              toggleShowToast()
              resetInputs()
              resetErrors()
              setLoginModal(false)
              dispatch(loadUser(data))
            }
          })
      } catch(err) {
        console.log(err)
      }
    } else {
      setError('the field cannot be empty')
    }
  }

  const resetInputs = () => {
    setEmail('')
    setPassword('')
  }

  const resetErrors = () => {
    setError('')
    setErrorInvalid('')
  }
  
  return (
    <>
      <Modal show={loginModal} onHide={() => setLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" aria-describedby="emailHelp" />
            {error ? (<p className='text-danger m-0'>{error}</p>) : errorInvalid && (<p className='text-danger m-0'>{errorInvalid}</p>)}
            <div id="emailHelp" className="form-text">We&apos;ll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" />
            {error ? (<p className='text-danger m-0'>{error}</p>) : errorInvalid && (<p className='text-danger m-0'>{errorInvalid}</p>)}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLoginModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={tryToLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer className="p-3" position='bottom-end'>
        <Toast onClose={toggleShowToast} show={showToast} animation={true} delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">Welcome {userName}</strong>
            <small>Login success</small>
          </Toast.Header>
          <Toast.Body>You can now comments projects</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}
