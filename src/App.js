import { Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Router from './components/Router';

function App() {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-2">
                    <ul class="sidebar-nav">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <a href="">All books</a>
                        </li>
                        <li>
                            <a href="">All authors</a>
                        </li>
                    </ul>
                    <ul class="sidebar-nav">
                        <li>User: A</li>
                        <li>
                            <a href="{% url 'my-borrowed' %}">A</a>
                        </li>
                        <li>
                            <Link to="/signin">Signin</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-10 ">
                    <Router />
                </div>
            </div>
        </div>
    );
}

export default App;
