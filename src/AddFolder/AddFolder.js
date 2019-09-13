import React, { Component } from 'react';
import ApiContext from '../ApiContext';
import config from '../config'; 
import NotefulForm from '../NotefulForm';

class AddFolder extends Component {
    // state = {
    //     folderValid: false
    // };
    
    static contextType = ApiContext;

    handleSubmit = e => {
        e.preventDefault()
        const folder = e.target.value

        fetch (`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder),
        })
        .then(response => {
            if(!response.ok)
            return response.json().then(e => Promise.reject(e))
        })
        .then(folder => {
            this.context.addFolder(folder)
        })
        .catch(error => {
            console.error({error});
        })
        
    }

    render(){
        return(
            <section className="AddFolder">
                <p>Add a new folder</p>
                <NotefulForm onSubmit={this.handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="folder-name">
                            Folder name
                        </label>
                        <input type="text" placeholder="folder-name/=" id="folder-name"/>
                    </div>
                    <button type="submit">Add Folder</button>
                </NotefulForm>
            </section>

        )
    }

}

export default AddFolder;