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
        const {title, author, content, date, description} = item;

        const paylaod = {
            title,
            author,
            content,
            date,
            description,
            archiveDate: new Date(),
            id: item._id
        };

        const response = await documentsAPI.put('/document', paylaod);

        if (response.data.message.toUpperCase() === 'DOCUMENT UPDATED') {
            const actualDocuments = this.state.documents;

            const updatedDocuments = actualDocuments.map((val) => {
                    if (val._id === item._id)
                        val.archiveDate = paylaod.archiveDate;
                    return val;
                }
            );

            this.setState({
                documents: updatedDocuments
            });
        } else {
            console.log('There are some error');
        }


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