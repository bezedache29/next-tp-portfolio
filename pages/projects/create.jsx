import React from 'react'
import { useState } from 'react'

export default function Create({ projectsLanguages }) {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [languages, setLanguages] = useState([])

  const createProjetFetchRequest = async (e) => {
    e.preventDefault()
    if (title !== '' && description !== '' && languages.length > 0) {

      const formData = {
        title,
        description,
        languages
      }

      try {
        await fetch('http://localhost:3000/api/projects/addNewProject', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            resetInputs()
            alert(`Project ${data.title} added`)
          })
      } catch(e) {
        console.log(e.message)
      }
      
    } else {
      alert('erreur form')
    }
  }
  const handleCheckbox = (e) => {
    const array = [...languages]
    const index = array.indexOf(e.target.value)
    if (index > -1) {
      array.splice(index, 1)
    } else {
      array.push(e.target.value)
    }
    setLanguages(array)
  }

  const resetInputs = () => {
    setTitle('')
    setDescription('')
    setLanguages([])
  }

  return (
    <form className='container'>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} id="title" />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} id="description" />
      </div>

      <div className="btn-group" role="group" aria-label="languages btns">
        {projectsLanguages && projectsLanguages.map(language => (
          <div key={language.id} className='me-1'>
            <input type='checkbox' className="btn-check" id={language.name} value={language.name} onChange={handleCheckbox} name="languages" checked={languages.includes(language.name)} />
            <label className="btn btn-outline-primary" htmlFor={language.name}>{language.name}</label>
          </div>
        ))}
      </div>

      <div className='mt-4'>
        <button className="btn btn-primary" onClick={createProjetFetchRequest}>Create project</button>
      </div>
    </form>
  )
}

export async function getStaticProps() {
  const data = await fetch('http://localhost:3000/api/projects/getAllLanguages')
  const projectsLanguages = await data.json()

  return {
    props: {
      projectsLanguages
    }
  }
}
