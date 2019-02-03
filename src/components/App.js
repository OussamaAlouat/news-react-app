import React from 'react';
import moment from 'moment';
import {BrowserRouter, Route} from "react-router-dom";

import documentsAPI from "../apis/documentsAPI";

import NewDocuments from "./NewDocuments";
import ArchivedDocuments from "./ArchivedDocuments";
import AddNewDocument from "./AddNewDocument";

class App extends React.Component {

    state = {documents: []};


    componentDidMount() {
        this.loadDocuments();
    }

    loadDocuments = async () => {
        const response = await documentsAPI.get('/documents');
        this.setState({documents: response.data.data})
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

    getNewDocuments = () => {
        const newDocuments = this.state.documents.filter((val) => val.archiveDate === null);
        const orderedDocuments = this.sortDocumentsByDate(newDocuments);
        return orderedDocuments;
    };


    getArchiveDocuments = () => {
        const archived = this.state.documents.filter((val) => val.archiveDate !== null);
        const ordered = this.sortByArchiveDate(archived);
        return ordered;
    };

    sortByArchiveDate = (documents) => {
        return documents.sort((a, b) => new moment(a.archiveDate).format('YYYY-MM-DD HH:mm:ss') - new moment(b.archiveDate).format('YYYY-MM-DD HH:mm:ss'))
    };

    onFormSubmit = async (item) => {
        const {author, content, description, title} = item;
        const date = new Date();
        const archiveDate = null;
        const payload = {
            author,
            title,
            description,
            content,
            date,
            archiveDate
        };
        const response = await  documentsAPI.post('/document',payload);

        if (response.data.message.toUpperCase()  === 'DOCUMENT CREATED CORRECTLY' && response.status === 201 ){
            this.loadDocuments();
        } else {
            console.log('Something wrong')
        }

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

                    <Route
                        path="/new"
                        exact
                        render={props =>
                            <AddNewDocument
                                {...props}
                                onFormSubmit={this.onFormSubmit}
                            />}
                    />

                </div>
            </BrowserRouter>
        );
    }
}

export default App;