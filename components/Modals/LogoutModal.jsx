import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { removeCookies} from 'cookies-next'
import { useDispatch } from 'react-redux'
import { loadUser } from '../../redux/users/actionsUsers'

export default function LogoutModal({ logoutModal, setLogoutModal }) {

  const dispatch =  useDispatch()

  const logout = () => {
    removeCookies('jwt')
    setLogoutModal(false)
    dispatch(loadUser({}))
  }

  return (
    <>
      <Modal show={logoutModal} onHide={() => setLogoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Disconnect</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure to log out ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={logout}>
            Disconnect
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
