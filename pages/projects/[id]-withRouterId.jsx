import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../redux/users/selectorsUsers'
import CommentModal from '../../components/Modals/CommentModal'
import { getComments } from '../../redux/comments/selectorsComments'
import { loadComments } from '../../redux/comments/actionsComments'

export default function Show() {

  const router = useRouter()
  const { id } = router.query

  const dispatch =  useDispatch()
  const user = useSelector(getUser)
  const comments = useSelector(getComments)

  console.log(comments)

  const [project, setProject] = useState({})
  const [commentModal, setCommentModal] = useState(false)
  const [newComment, setNewComment] = useState(false)

  useEffect(() => {
    loadProject(id)
    loadAllComments(id)
  }, [id])

  useEffect(() => {
    if (newComment) {
      loadProject(id)
      dispatch(getComments)
      setNewComment(false)
    }
  }, [newComment])

  const loadAllComments = async (id) => {
    const result = await fetch('http://localhost:3000/api/comments/getAllCommentsByProjectId?' + new URLSearchParams({
        id: id
    }))
    const comments = await result.json()
    console.log(comments)
    dispatch(loadComments(comments))
  }

  const loadProject = async (id) => {
    const result = await fetch('http://localhost:3000/api/projects/getOneProject?' + new URLSearchParams({
        id: id
    }))
    const project = await result.json()
    setProject(project)
  }

  return (
    <div className="container">
      {project ? (
        <>
          <h1 className="text-center my-2">{project.title}</h1>
          <p>Description :</p>
          <p>{project.description}</p>
          <p>Languages :</p>
          <ul>
            {project.languages && project.languages.map((language, index) => <li key={index}>{language.languageName}</li>)}
          </ul>
          { Object.keys(user).length !== 0 && (
            <>
              <button className="btn btn-primary" onClick={() => setCommentModal(true)}>Ajouter un commentaire</button>

              <CommentModal commentModal={commentModal} setCommentModal={setCommentModal} projectId={id} setNewComment={setNewComment} />
            </>
          )}
          <h2 className='text-center my-4'>{comments.length > 0 ? 'Liste des commentaires' : 'Pas encore de commentaires'}</h2>
          {
            comments && comments.length > 0 && comments.map((comment, index) => (
              <div className="card my-1" key={index}>
                <div className="card-body">
                  <h5 className="card-title">{comment.userName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Date here</h6>
                  <p className="card-text">{comment.content}</p>
                </div>
              </div>
            ))
          }
        </>
      ) : (
        <h1 className="text-center my-2">Loading ...</h1>
      )}
    </div>
  )
}

