import React from 'react';

const ArchivedDocuments = (props) => {

    const documentsList = props.documents.map((val) => <li>{val.title}</li>)



    return(
        <div>
            {documentsList}
        </div>
    );
};

export default ArchivedDocuments;