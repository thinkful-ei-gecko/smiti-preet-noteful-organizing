import React from 'react';
import ApiContext from '../ApiContext';
import config from '../config';
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css';


export default class AddNote extends React.Component{
    static defaultProps = {
        history: {
            push: () => {}
        }
    }
    static contextType = ApiContext;
    handleSubmit = e =>{
        e.preventDefault();
        const note = {
            name: e.target['noteName'].value,
            content: e.target['ContentName'].value,
            folderid: e.target['note-folder-select'].value,
            modified: new Date()
    }
        
        fetch (`${config.API_ENDPOINT}/note`,{
            method: 'POST',
            headers: {'content-type': 'application/JSON'},
            body: JSON.stringify(note)
        })
        .then(response => {
            if(!response.ok){
                return response.json().then(e => Promise.reject(e))
            }
                return response.json()
        })
        .then(note => {
            this.props.history.push(`/folder/${note.folderid}`)
            this.context.AddNote(note)
        })
        .catch(error => console.log(error.message))
        }
        render(){
            const {folders = []} = this.context
            return(
                <div className="">
                    <h2>Add a Note</h2>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <label htmlFor="noteName">Name</label>
                    <input type="text" id="noteName" required></input>
                    <label htmlFor="noteContent" >Content</label>
                    <input type="text" id="ContentName" required></input>
                    <label htmlFor="noteFolder">Folder</label>
                    <select id="note-folder-select">
                        {folders.map(folder =>
                            <option key={folder.id} value={folder.id}>{folder.name}
                            </option>)}
                    </select>
                    <button className="button" type="submit">Add Note</button>
                </NotefulForm>
                </div>
            )
        }
}