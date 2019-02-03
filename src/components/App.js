import React from 'react';
import moment from 'moment';
import {BrowserRouter, Route} from "react-router-dom";


import NewDocuments from "./NewDocuments";
import documentsAPI from "../apis/documentsAPI";
import ArchivedDocuments from "./ArchivedDocuments";

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
        return documents.sort((a, b) => new moment(a.date).format('YYYY-MM-DD HH:mm:ss') - new moment(b.date).format('YYYY-MM-DD HH:mm:ss'))
    };

    getNewDocuments = () => this.state.documents.filter((val) => val.archiveDate === null);

    getArchiveDocuments = () => {
        const archived = this.state.documents.filter((val) => val.archiveDate !== null)
        const ordered = this.shortByArchiveDate(archived);
        return ordered;
    };

    shortByArchiveDate = (documents) => {
        return documents.sort((a, b) => new moment(a.archiveDate).format('YYYY-MM-DD HH:mm:ss') - new moment(b.archiveDate).format('YYYY-MM-DD HH:mm:ss'))
    };

    onDocumentRemove = async (item) => {

        const response = await documentsAPI.delete('/document', {
            params: {id: item._id}
        });

        if (response.data.response.message.toUpperCase() === 'DOCUMENT WAS DELETE') {
            const documents = this.state.documents;
            const filteredDocuments = documents.filter((val) => val._id !== item._id);
            this.setState({documents: filteredDocuments});
        } else {
            console.log('Something wrong')
        }
    };

    render() {

        if (this.state.documents.length === 0)
            return <div>Loading</div>

        return (
            <BrowserRouter>
                <div className="container flex">
                    <Route
                        path="/"
                        exact
                        render={props =>
                            <NewDocuments
                                {...props}
                                documents={this.getNewDocuments()}
                                onDocumentArchive={this.onDocumentArchive}/>}
                    />
                    <Route
                        path="/archived"
                        exact
                        render={props =>
                            <ArchivedDocuments
                                {...props}
                                documents={this.getArchiveDocuments()}
                                onDocumentRemove={this.onDocumentRemove}
                            />}
                    />

                </div>
            </BrowserRouter>
        );
    }
}

export default App;