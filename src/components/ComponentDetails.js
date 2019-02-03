import React from 'react';

const ComponentDetails = (props) => {

    const doc = props.document;

    const onDocumentArchive = () => {
        props.onDocumentArchive(doc);
    };


    return (
        <div className="card">
            <div className="card-header">
                {doc.title}
            </div>
            <div className="card-body">
                <h6 className="card-title">{doc.description}</h6>
                <p className="card-text">{doc.content}</p>

            </div>
            <div className="card-footer text-muted">
                <div className="row">
                    <div className="col-4">
                        Author: {doc.author}
                    </div>
                    <div className="col-4">
                        Date: {doc.date}
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-secondary" onClick={onDocumentArchive}>Archive</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentDetails;