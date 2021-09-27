import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import '@fontsource/roboto/700.css';
import NavBar from './component/NavBar';
import PublisherManager from './route/PublisherManager';

const App = () => {

    return (

        <Router>
            <div>

                <NavBar />

                <Switch>

                    <Route path="/publisher">
                        <PublisherManager />
                    </Route>

                    <Route path="/users">
                        <>Users</>
                    </Route>

                    <Route path="/">
                        <>Welcome home</>
                    </Route>

                </Switch>
            </div>
        </Router>

    );
}

export default App;
