import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {

    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updateNote} = props;

    return (
        <>
        <div className='col-md-4'>
            <div className="card my-3" >
                <div className="card-body container">
                    <div>
                        <h5 className="card-title">{note.title}</h5>
                        <div id="emailHelp" className="form-text">{note.tag}</div>
                    </div>

                    <p className="mt-1 card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-3" onClick={()=> {deleteNote(note._id); props.showAlert("Deletion Successful", "success");}}></i>
                    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=> {updateNote(note)}}></i>
                </div>
            </div>
        </div>
        </>
    )
}

export default NoteItem