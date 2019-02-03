import React from 'react';
import ArchivedComponentDetails from "./ArchivedComponentDetails";

const ArchivedDocuments = (props) => {

    const documentsList = props.documents.map((doc) => <ArchivedComponentDetails key={doc._id} document={doc}/>)

    return (
        <div>
            {documentsList}
        </div>
    );
};

export default ArchivedDocuments;