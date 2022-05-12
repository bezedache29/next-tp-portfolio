import React from 'react'
import { useState } from 'react'

export default function Create() {

  const [name, setName] = useState('')

  const createLanguage = async (e) => {
    e.preventDefault()
    if (name !== '') {
      const formData = {
        name
      }
      try {
        await fetch('http://localhost:3000/api/languages/addNewLanguage', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json"
          }
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setName('')
            alert(`language ${data.name} added`)
          })
      } catch(e) {
        console.log(e.message)
      }
    } else {
      alert('erreur form')
    }
  }

  return (
    <form className='container'>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="title" />
      </div>

      <div className='mt-4'>
        <button className="btn btn-primary" onClick={createLanguage}>Create language</button>
      </div>
    </form>
  )
}
