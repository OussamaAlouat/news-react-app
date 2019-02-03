import React from 'react';
import ArchivedComponentDetails from "./ArchivedComponentDetails";

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
            {documentsList}
        </div>
    );
};

export default ArchivedDocuments;