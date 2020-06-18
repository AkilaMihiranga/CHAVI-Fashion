import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div>  
                <div style={{marginTop: '7%'}}>
                    <div className="container">
                        <div className="card card-body"><br/>
                            <h1 className="text-center mb-3"><i class="far fa-sad-tear fa-7x text-danger"></i></h1>
                            <h1 className="text-center mb-3"><b>403</b></h1>
                            <h1 className="text-center mb-3"><b>ACCESS DENIED...</b></h1>
                            <h1 className="text-center mb-3">You don't have permission to access this page...</h1>
                            
                            <a href="/" className="btn btn-info text-center"><i className="fas fa-home"></i>&nbsp;Go to Home page</a>
                            <br/><br/>
                        </div>
                    </div>
                </div>
            </div>       
        );
    }
}

export default Error;