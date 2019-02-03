import React from 'react';
import ComponentDetails from "./ComponentDetails";

const NewDocuments = (props) => {

    const onDocumentArchive = (term) => {
        props.onDocumentArchive(term);
    };

    const d = props.documents.map((doc) =>
        <ComponentDetails document={doc} onDocumentArchive={onDocumentArchive}/>
    );


    return(
        <div>
            {d}
        </div>
    );
};

export default NewDocuments;