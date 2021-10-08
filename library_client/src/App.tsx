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
import UserManager from "./route/UserManager";
import AuthorManager from "./route/AuthorManager";
import BorrowManager from "./route/BorrowManager";


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

                    <Route path="/author">
                        <PrivateComponent />
                        <AuthorManager />
                    </Route>                    

                    <Route path="/users">
                        <PrivateComponent />
                        <UserManager />
                    </Route>

                    <Route path="/book">
                        <PrivateComponent />
                        <BookManager />
                    </Route>

                    <Route path="/borrow">
                        <PrivateComponent />
                        <BorrowManager />
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
