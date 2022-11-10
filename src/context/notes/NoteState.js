import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

    //get all notes function
    const getNotes = async () => {

      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers:{  
          'Content-Type': 'application/json',
          'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MTBhZTQ3ZjFhMjlhNDJkMzZhMzhlIn0sImlhdCI6MTY2NjI1NzU3M30.G_L3n4i6IkiEiIHyMjhYLV_ygeYDeBz00OZsITpLpNI'
        }
      });

      const json = await response.json();
      setNotes(json);

    }

  //add note function
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers:{  
        'Content-Type': 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MTBhZTQ3ZjFhMjlhNDJkMzZhMzhlIn0sImlhdCI6MTY2NjI1NzU3M30.G_L3n4i6IkiEiIHyMjhYLV_ygeYDeBz00OZsITpLpNI'
      },
      body: JSON.stringify({title, description, tag})
    });

    const note = await response.json();
    setNotes(notes.concat(note));

  }

  //delete note
  const deleteNote =  async (id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers:{  
        'Content-Type': 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MTBhZTQ3ZjFhMjlhNDJkMzZhMzhlIn0sImlhdCI6MTY2NjI1NzU3M30.G_L3n4i6IkiEiIHyMjhYLV_ygeYDeBz00OZsITpLpNI'
      }
    });

    const json = await response.json();
    //console.log(json);

    const newNotes = notes.filter((note)=>{return note._id !== id});
    setNotes(newNotes);
    
  }

  //update note
  const editNote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers:{  
        'Content-Type': 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM1MTBhZTQ3ZjFhMjlhNDJkMzZhMzhlIn0sImlhdCI6MTY2NjI1NzU3M30.G_L3n4i6IkiEiIHyMjhYLV_ygeYDeBz00OZsITpLpNI'
      },
      body: JSON.stringify({title, description, tag})
    });

    const json = await response.json();
    //console.log(json)

    //logic to edit notes
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes);

  }

  return (
      //allows to export function that you can use.
      <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}> 
          {props.children}
      </NoteContext.Provider>
  )
}

export default NoteState;