import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUser } from '../../redux/users/selectorsUsers'
import CommentModal from '../../components/Modals/CommentModal'
import useUtils from '../../hooks/useUtils'

export default function Show({ currentProject }) {

  const user = useSelector(getUser)

  const [project, setProject] = useState(currentProject)
  const [commentModal, setCommentModal] = useState(false)
  const [newComment, setNewComment] = useState(false)

  const { formatDate } = useUtils()

  useEffect(() => {
    if (newComment) {
      loadProject(project.id)
      setNewComment(false)
    }
  }, [newComment])

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
              <button className="btn btn-primary" onClick={() => setCommentModal(true)}>Add a comment</button>

              <CommentModal commentModal={commentModal} setCommentModal={setCommentModal} projectId={project.id} setNewComment={setNewComment} />
            </>
          )}
          <h2 className='text-center my-4'>{project.comments.length > 0 ? 'list of comments' : 'No comments yet'}</h2>
          {
            project.comments && project.comments.length > 0 && project.comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((comment, index) => (
              <div className="card my-1" key={index}>
                <div className="card-body">
                  <h5 className="card-title">From : {comment.userName}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{formatDate(comment.createdAt)}</h6>
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

export async function getStaticProps(context) {
  const id = context.params.id
  const response = await fetch('http://localhost:3000/api/projects/getAllProjects')
  const result = await response.json()

  const currentProject = result.find(list => list.id == id)

  if (!currentProject) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      currentProject
    }
  }
}

export async function getStaticPaths() {
  const response = await fetch('http://localhost:3000/api/projects/getAllProjects')
  const result = await response.json()
  
  const paths = result.map(item => ({
    params: {id: item.id.toString()}
  }))

  return {
    paths,
    fallback: false
  }
}
