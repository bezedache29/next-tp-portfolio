import React, { useState } from 'react'
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap'

export default function RegisterModal({ registerModal, setRegisterModal }) {

  const [email, setEmail] = useState('')
  const [pseudo, setPseudo] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [emailError, setEmailError] = useState('')
  const [pseudoError, setPseudoError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')
  const [userName, setUserName] = useState('')

  const [showToast, setShowToast] = useState(false)

  const toggleShowToast = () => setShowToast(!showToast)

  const tryToRegister = async () => {
    resetErrors()
    if (email !== '' && pseudo !== '' && password !== '' && passwordConfirm !== '') {
      if (password === passwordConfirm) {
        const data = {
          email,
          pseudo,
          password
        }

        try {
          await fetch('http://localhost:3000/api/auth/register', {
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
                if (data.message === 'Email already exists') {
                  setEmailError(data.message)
                } else {
                  setPseudoError(data.message)
                }
              } else {
                setUserName(data.pseudo)
                resetInputs()
                setRegisterModal(false)
                toggleShowToast()
              }
            })
        } catch(err) {
          console.log(err)
        }
      } else {
        setPasswordError('passwords do not match')
      }
    } else {
      setError('the field cannot be empty')
    }
  }

  const resetInputs = () => {
    setEmail('')
    setPseudo('')
    setPassword('')
    setPasswordConfirm('')
  }

  const resetErrors = () => {
    setEmailError('')
    setPseudoError('')
    setError('')
    setPasswordError('')
  }
  
  return (
    <>
      <Modal show={registerModal} onHide={() => setRegisterModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {emailError !== '' ? <p className='text-danger'>{emailError}</p> : error && <p className='text-danger'>{error}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="pseudo" className="form-label">Pseudo</label>
            <input type="text" className="form-control" id="pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
            {pseudoError !== '' ? <p className='text-danger'>{pseudoError}</p> : error && <p className='text-danger'>{error}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {passwordError !== '' ? <p className='text-danger'>{passwordError}</p> : error && <p className='text-danger'>{error}</p>}
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirm" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
            {passwordError !== '' ? <p className='text-danger'>{passwordError}</p> : error && <p className='text-danger'>{error}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setRegisterModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={tryToRegister}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer className="p-3" position='bottom-end'>
        <Toast onClose={toggleShowToast} show={showToast} animation={true} delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">Welcome {userName}</strong>
            <small>Register success</small>
          </Toast.Header>
          <Toast.Body>You can now connect</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}
