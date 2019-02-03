import React from 'react';
import ComponentDetails from "./ComponentDetails";
import {Link} from "react-router-dom";


const NewDocuments = (props) => {

    const onDocumentArchive = (term) => {
        props.onDocumentArchive(term);
    };

    const documentsList = props.documents.map((doc) =>
        <ComponentDetails key={doc._id} document={doc} onDocumentArchive={onDocumentArchive}/>
    );


    return (
        <div>
            <div className="shadow-lg p-3 mb-3 bg-white rounded">
                <h1 className="text-center">Wellcome to your news</h1>
            </div>

            <div className="row justify-content-center mb-3">
                <Link to="/archived" className="badge badge-primary">GO TO ARCHIVE</Link>
            </div>

            {documentsList}
        </div>
    );
};

export default NewDocuments;