import React from 'react';
import ComponentDetails from "./ComponentDetails";

const NewDocuments = (props) => {
    const d = props.documents.map((doc) =>
        <ComponentDetails document={doc}/>
    );

    return(
        <div>
            {d}
        </div>
    );
};

export default NewDocuments;