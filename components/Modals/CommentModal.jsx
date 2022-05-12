import React, { useEffect, useState } from 'react'
import { Button, Modal, Toast, ToastContainer } from 'react-bootstrap'
import { setCookies } from 'cookies-next'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../../redux/users/actionsUsers'
import { useFormik, yupToFormErrors } from 'formik'
import * as yup from 'yup'
import { getUser } from '../../redux/users/selectorsUsers'
import { addOneComment } from '../../redux/comments/actionsComments'

export default function CommentModal({ commentModal, setCommentModal, projectId, setNewComment }) {

  const [showToast, setShowToast] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch();
  const user = useSelector(getUser)

  const toggleShowToast = () => setShowToast(!showToast)

  const addOnDb = async (data) => {
    try {
      await fetch('http://localhost:3000/api/comments/addNewCommentForProjectId', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          // console.log(data)
          setNewComment(true)
        })
    } catch(e) {
      console.log(e.message)
    }
  }

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: (values, { resetForm }) => {
      const data = {
        userName: user.user.pseudo,
        projectId: +projectId,
        content: values.message
      }
      dispatch(addOneComment(data))
      addOnDb(data)
      resetForm()
      setShowToast(true)
      setCommentModal(false)
    },
    validationSchema: yup.object({
      message: yup.string().trim().required('Message is required')
    })
  })
  
  return (
    <>
      <Modal show={commentModal} onHide={() => setCommentModal(false)}>
        <form onSubmit={formik.handleSubmit} className="mb-3">
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <label htmlFor="message" className="form-label">Message</label>
              <textarea 
                name="message"
                className='form-control'
                placeholder='Your message ...'
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.message && (
                <div className="text-danger">{formik.errors.message}</div>
              )}
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setCommentModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <ToastContainer className="p-3" position='bottom-end'>
        <Toast onClose={toggleShowToast} show={showToast} animation={true} delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">Good Job !</strong>
            <small>Comment success</small>
          </Toast.Header>
          <Toast.Body>You can manage your comment if you want</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}
