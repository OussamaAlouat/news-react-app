import React from 'react';
import NewDocuments from "./NewDocuments";
import documentsAPI from "../apis/documentsAPI";

class App extends React.Component {

    state = {documents: []};


    componentDidMount() {
        this.loadDocuments();
    }

    loadDocuments = async () => {
        const response = await documentsAPI.get('/documents');
        this.setState({documents: response.data.data})


        console.log(response.data.data)
    };

    onDocumentArchive = async (item) => {
        console.log('Im the phaher ', item)
    };

    render() {

        if (this.state.documents.length === 0)
            return <div>Loading</div>

        return (
            <div className="container flex">
                <NewDocuments documents={this.state.documents} onDocumentArchive={this.onDocumentArchive}/>
            </div>
        );
    }
}

export default App;