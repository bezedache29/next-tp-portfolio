import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import LoginModal from '../Modals/LoginModal'
import RegisterModal from '../Modals/RegisterModal'
import { checkCookies } from 'cookies-next'
import LogoutModal from '../Modals/LogoutModal'

export default function Navbar() {

  const [loginModal, setLoginModal] = useState(false)
  const [registerModal, setRegisterModal] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)

  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    checkCookies('jwt') ? setIsConnected(true) : setIsConnected(false)
  })

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Portfolio</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <Link href={'/'}><a className="nav-link">Home</a></Link>
              </li>
              <li className="nav-item">
                <Link href={'/projects'}><a className="nav-link">Projects</a></Link>
              </li>
              {isConnected && (
                <>
                  <li className="nav-item">
                    <Link href={'/projects/create'}><a className="nav-link">Add Project</a></Link>
                  </li>
                  <li className="nav-item">
                    <Link href={'/languages/create'}><a className="nav-link">Add Language</a></Link>
                  </li>
                </>
              )}
              {isConnected ? (
                <li className="nav-item ms-auto">
                  <a className="nav-link cursor-pointer" onClick={() => setLogoutModal(true)}>Logout</a>
                </li>
              ) : (
                <>
                  <li className="nav-item ms-auto">
                    <a className="nav-link cursor-pointer" onClick={() => setRegisterModal(true)}>Register</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link cursor-pointer" onClick={() => setLoginModal(true)}>Login</a>
                  </li>
                </>
              )}
              
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal Login */}
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />

      {/* Modal Register */}
      <RegisterModal registerModal={registerModal} setRegisterModal={setRegisterModal} />

      {/* Modal Logout */}
      <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
    </>
    
  )
}