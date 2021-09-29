import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import '@fontsource/roboto/700.css';
import NavBar from './component/NavBar';
import HomePage from './route/HomePage';
import PublisherManager from './route/PublisherManager';

const App = () => {

    return (

        <Router basename='/'>
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
                        <HomePage />
                    </Route>

                </Switch>

            </div>
        </Router>

    );
}

export default App;
