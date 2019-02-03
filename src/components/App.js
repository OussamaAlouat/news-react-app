import React from 'react';
import NewDocuments from "./NewDocuments";

class App extends React.Component {

    state = {documents: []};

    render() {

        return (
            <div>
                <NewDocuments/>
            </div>
        );
    }
}

export default App;