import {
    HashRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import '@fontsource/roboto/700.css';
import NavBar from './component/NavBar';
import HomePage from './route/HomePage';
import PublisherManager from './route/PublisherManager';
import BookManager from "./route/BookManager";
import LoginPage from "./route/LoginPage";
import PrivateComponent from "./component/PrivateComponent";


const App = () => {

    return (

        <Router basename='/'>
            <div>

                <NavBar />

                <Switch>

                    <Route path="/publisher">
                        <PrivateComponent />
                        <PublisherManager />
                    </Route>                    

                    <Route path="/users">
                        <PrivateComponent />
                        <>Users</>
                    </Route>

                    <Route path="/book">
                        <PrivateComponent />
                        <BookManager />
                    </Route>

                    <Route path="/login">
                        <LoginPage />
                    </Route>

                    <Route path="/">
                        <PrivateComponent />
                        <HomePage />
                    </Route>

                </Switch>

            </div>
        </Router>

    );
}

export default App;
