import React from 'react';
import moment from 'moment';

const ArchivedComponentDetails = (props) => {

    const doc = props.document;

    const onDocumentRemove = () => {
        props.onDocumentRemove(doc);
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
                        Date: {moment(doc.date).format('YYYY-MM-DD HH:mm:SS')}
                    </div>
                    <div className="col-4">
                        <button type="button" className="btn btn-secondary" onClick={onDocumentRemove}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchivedComponentDetails;