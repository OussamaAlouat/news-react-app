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
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <h1 className="text-center">Wellcome to your news</h1>
            </div>

            <div className="row justify-content-center mb-1">
                <button>GO TO ARCHIVE</button>
            </div>

            {documentsList}
        </div>
    );
};

export default NewDocuments;