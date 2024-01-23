async function fetchAllNotes() {
  try {
    const res = await fetch('https://thrifty-pet-be-4c9efd8c099d.herokuapp.com/api/v1/notes/get')
    if (!res.ok) {
      throw new Error(`${res.status}: Failed to fetch notes`)
    }
    return res.json()
  } catch (error) {
    throw new Error(`${(error as Error).message}: Failed in fetch all notes catch block`)
  }
}

async function postNote(note: object) {
  try {
    const res = await fetch('https://thrifty-pet-be-4c9efd8c099d.herokuapp.com/api/v1/notes/create', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(note)
    })
    if (!res.ok) {
      throw new Error(`${res.status}: Failed to post a note`)
    }
    return res.json()
  } catch (error) {
    throw new Error(`${(error as Error).message}: Failed in post a note catch block`)
  }
}

async function deletePost(noteId: string) {
  try {
    const res = await fetch(`https://thrifty-pet-be-4c9efd8c099d.herokuapp.com/api/v1/notes/delete/${noteId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    if (!res.ok) {
      throw new Error(`${res.status}: Failed to delete a note`)
    }
    return res.json()
  } catch (error) {
    throw new Error(`${(error as Error).message}: Failed in delete a note catch block`)
  }
}

async function patchNote(noteId: string, noteToUpdate: object) {
  try {
    const res = await fetch(`https://thrifty-pet-be-4c9efd8c099d.herokuapp.com/api/v1/notes/update/${noteId}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(noteToUpdate)
    })
    if (!res.ok) {
      throw new Error(`${res.status}: Failed to post a note`)
    }
    return res.json()
  } catch (error) {
    throw new Error(`${(error as Error).message}: Failed in patch a note catch block`)
  }
}

export {
  fetchAllNotes,
  postNote,
  deletePost,
  patchNote
}