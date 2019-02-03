import React from 'react';
import {Link} from "react-router-dom";

class AddNewDocument extends React.Component {

    state = {
        title: '',
        description: '',
        content: '',
        author: ''
    };

    submit = () => {
        console.log('Im here')
        this.props.onFormSubmit(this.state)
    };

    isDisabled = () => (this.state.title === '' || this.state.description === '' || this.state.content === '' || this.state.author === '') ? true : false;

    render() {
        return (
            <div>
                <div className="shadow-lg p-3 mb-3 bg-white rounded">
                    <h1 className="text-center">Add new news</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-2 justify-content-center mb-3 ">
                        <Link to="/" className="badge badge-primary">GO TO NEW NEWS</Link>
                    </div>

                    <div className="col-2 justify-content-center mb-3">
                        <Link to="/archived" className="badge badge-primary">GO TO ARCHIVE NEWS</Link>
                    </div>
                </div>


                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>
                                Author
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Author"
                                onChange={(event) => this.setState({author: event.target.value})}
                                required
                            />

                        </div>

                        <div className="form-group col-md-6">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="News title"
                                onChange={(event) => this.setState({title: event.target.value})}
                                required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            onChange={(event) => this.setState({description: event.target.value})}
                            required>
                        </textarea>
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            onChange={(event) => this.setState({content: event.target.value})}
                            required>
                        </textarea>
                    </div>
                    <Link style={{pointerEvents: this.isDisabled() ? 'none' : ''}} to="/" className="btn btn-primary"
                          disabled={this.isDisabled()}
                          onClick={this.submit}>
                        SAVE
                    </Link>
                </form>

            </div>
        );
    }
};

export default AddNewDocument;