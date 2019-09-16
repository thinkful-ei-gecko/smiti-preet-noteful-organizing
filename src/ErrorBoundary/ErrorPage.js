import React from 'react';

export default class ErrorPage extends React.Component{

    constructor(){
        super();
        this.state = {
            error: false
            
        }
    }

    static getDerivedStateFromError(error){
        return {
            error: true
        }
    }

    render(){
        if(this.state.error){
            return(
                <div className="ErrorPage">
                    <h1>Something went wrong!</h1>
                    <p>Refresh the page</p>

                </div>
            );
        }
        return this.props.children;
    }
}