import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{

  const notesInitial = [
      {
        "_id": "63529b1ace437e317e492982",
        "user": "63510ae47f1a29a42d36a38e",
        "title": "Hello",
        "description": "where can i find you?",
        "tag": "general",
        "date": "2022-10-21T13:14:02.923Z",
        "__v": 0
      },
      {
        "_id": "63529df44161a5fe61e9c979",
        "user": "63510ae47f1a29a42d36a38e",
        "title": "I am done here?",
        "description": "Go home",
        "tag": "general",
        "date": "2022-10-21T13:26:12.214Z",
        "__v": 0
      },
      {
        "_id": "6352ad59773732fe23169fde",
        "user": "63510ae47f1a29a42d36a38e",
        "title": "I am done here?",
        "description": "Go home",
        "tag": "general",
        "date": "2022-10-21T14:31:53.196Z",
        "__v": 0
      },
      {
        "_id": "6352b33661b73f99b9eba05d",
        "user": "63510ae47f1a29a42d36a38e",
        "title": "I am done here?",
        "description": "Go home",
        "tag": "general",
        "date": "2022-10-21T14:56:54.471Z",
        "__v": 0
      },
      {
        "_id": "6352b34b61b73f99b9eba060",
        "user": "63510ae47f1a29a42d36a38e",
        "title": "I am done here?",
        "description": "Go home",
        "tag": "general",
        "date": "2022-10-21T14:57:15.589Z",
        "__v": 0
      }
    ]

  const [notes, setNotes] = useState(notesInitial);

  //add note function
  const addNote = (title, description, tag) => {
    // TODO : API CALL
    const note = {
      "_id": "6352b34b61b7c3f99b9eba060",
      "user": "63510ae47f1a29a42d36a38e",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2022-10-21T14:57:15.589Z",
      "__v": 0
    }
    setNotes(notes.concat(note));
    console.log("success")
  }

  //delete note
  const deleteNote = () => {

  }

  //update note
  const updateNote = () => {

  }

  return (
      //allows to export function that you can use.
      <NoteContext.Provider value={{notes, addNote}}> 
          {props.children}
      </NoteContext.Provider>
  )
}

export default NoteState;