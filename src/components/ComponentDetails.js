import React from 'react';

const ComponentDetails = (props) => {

    const doc = props.document;
    return (
        <div className="card">
            <div className="card-header">
                {doc.title}
            </div>
            <div className="card-body">
                <h6 className="card-title">{doc.description}</h6>
                <p class="card-text">{doc.content}</p>

            </div>
            <div className="card-footer text-muted">
                <p>{doc.author}</p>
                <p> {doc.date} </p>
            </div>
        </div>)
};

export default ComponentDetails;