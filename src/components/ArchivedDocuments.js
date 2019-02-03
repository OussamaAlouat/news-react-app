import React from 'react';
import ArchivedComponentDetails from "./ArchivedComponentDetails";
import {Link} from "react-router-dom";

const ArchivedDocuments = (props) => {

    const onDocumentRemove = (item) => {
        props.onDocumentRemove(item);
    };

    const documentsList = props.documents.map((doc) =>
        <ArchivedComponentDetails
            key={doc._id}
            document={doc}
            onDocumentRemove={onDocumentRemove}/>);


    return (
        <div>
            <div className="shadow-lg p-3 mb-3 bg-white rounded">
                <h1 className="text-center">Welcome to your archive news</h1>
            </div>

            <div className="row justify-content-center">
                <div className="col-2 justify-content-center mb-3 ">
                    <Link to="/" className="badge badge-primary">GO TO NEW NEWS</Link>
                </div>

                <div className="col-2 justify-content-center mb-3">
                    <Link to="/new" className="badge badge-primary">GO TO ADD NEWS</Link>
                </div>
            </div>
            <div>{documentsList}</div>
        </div>
    );
};

export default ArchivedDocuments;