import React from 'react';
import NewDocuments from "./NewDocuments";
import documentsAPI from "../apis/documentsAPI";
import moment from 'moment';

class App extends React.Component {

    state = {documents: []};


    componentDidMount() {
        this.loadDocuments();
    }

    loadDocuments = async () => {
        const response = await documentsAPI.get('/documents');
        const shortedDocuments = this.sortDocumentsByDate(response.data.data);
        this.setState({documents: shortedDocuments})
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

    sortDocumentsByDate = (documents) => {
       return documents.sort((a,b) => new moment(a.date).format('YYYY-MM-DD HH:mm:ss') - new moment(b.date).format('YYYY-MM-DD HH:mm:ss'))
    };

    getNewDocuments = () => this.state.documents.filter((val) => val.archiveDate === null );

    render() {

        if (this.state.documents.length === 0)
            return <div>Loading</div>

        return (
            <div className="container flex">
                <NewDocuments documents={this.getNewDocuments()} onDocumentArchive={this.onDocumentArchive}/>
            </div>
        );
    }
}

export default App;