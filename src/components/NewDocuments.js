import React from 'react';

const NewDocuments = (props) => {
    const d = props.documents.map((dm) => <div>{dm.title}</div>);

    console.log(props.doc)

    return (<div>{d}</div>)
};

export default NewDocuments;