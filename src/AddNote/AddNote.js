import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config'; 
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'

class AddNote extends Component {
    state = {
        folderValid: false
    };
    
    static contextType = ApiContext;

    handleSubmit = e => {
        e.preventDefault()
        const newNote = {
            //change values for a new note based on JSX attributes
            name: e.target.noteName.value,
            content: e.target.contentName.value,
            folderId: e.target["note-folder-select"].value 
        }
        console.log(newNote)

        fetch (`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newNote),
        })
        .then(response => {
            if(!response.ok){
                return response.json().then(e => Promise.reject(e))
                }
                return response.json() //return response from the json server 
        })
        .then(note => {
            this.context.addNote(note)
            this.props.history.push(`/folder/${note.folderId}`) //pushing the content from the server
        })
        .catch(error => {
            console.error({error});
        })
        
    }

    render(){
        const { folders=[] } = this.context;
        return(
            <section className="AddNote">
                <p>Add a new note</p>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="note-name">
                            Name
                        </label>
                        <input type="text" placeholder="noteName/=" name="noteName"/>
                        <label htmlFor="note-content">
                            Content
                        </label>
                        <input type="text" placeholder="contentName/=" name="contentName"/>
                        <label htmlFor="note-folder-select">
                            Folder
                        </label>
                        <select name="note-folder-select">
                            <option value="null">Select</option>
                                {/*Need to have some sort of map() function for the folders */}
                                {folders.map(folder =>
                                   <option key={folder.id}>
                                       {folder.name}
                                   </option> )}
                        </select>
                    </div>
                    <button type="submit">Add Note</button>
                </NotefulForm>
            </section>

        )
    }

}

export default AddNote;