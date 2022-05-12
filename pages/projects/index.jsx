import Link from 'next/link'
import React from 'react'
import { useState, useEffect } from 'react'

export default function Index({ projectsList }) {

  const [search, setSearch] = useState('')
  const [projects, setProjects] = useState(projectsList)

  useEffect(() => {
    searchProjects(search)
  }, [search])

  const searchProjects = async (value) => {
    if (value.length > 3) {
      const response = await fetch('http://localhost:3000/api/projects/searchProjects?' + new URLSearchParams({
        title: value
      }))
      const result = await response.json()
      setProjects(result)
    } else if (value.length === 0) {
      const response = await fetch('http://localhost:3000/api/projects/getAllProjects')
      const result = await response.json()
      setProjects(result)
    }
  }

  return (
    <div className="container mt-4">
      <div className="input-group input-group-lg w-50 mx-auto my-5">
        <span className="input-group-text" id="search">Search</span>
        <input type="text" className="form-control" value={search} onChange={(e) => setSearch(e.target.value)} aria-label="search" aria-describedby="search" />
      </div>
      <div className="row align-items-center">
        { projects.length > 0 ? projects.map(project => (
          <div className="col-12 col-md-3" key={project.id}>
            <div className="card m-1">
              <div className="card-body">
                <h5 className="card-title">{project.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Languages : {project.languages.map((lang, index) => (
                    <span key={index}>{lang.languageName} {index === project.languages.length - 1 ? '' : ' - '}</span>
                  ))}
                </h6>
                <p className="card-text">{project.description}</p>
                <div className="row justify-beetween align-items-center">
                  <Link href={`/projects/${project.id}`}><a className="card-link w-75">Details</a></Link>
                  <div className="row g-0 w-25 align-items-center">
                    <div className="w-25 ms-auto">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                        <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                      </svg>
                    </div>
                    <p className="m-0 w-25 ms-2 mt-1">{project.comments.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <h1 className="text-center mt-2">No Projects</h1>
        )}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost:3000/api/projects/getAllProjects')
  const projectsList = await data.json()

  // projectsList.forEach(el => console.log(el.languages))

  return {
    props: {
      projectsList
    }
  }
}
