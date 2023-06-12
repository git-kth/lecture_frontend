import { Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Router from './components/Router';
import { useState } from 'react';
import axios from 'axios';
import Constant from './Constant/Constant';
import Sidebar from './components/Sidebar';

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [member, setMember] = useState({});
    const changeSigninHandler = state => {
        setIsLogin(state);
    };
    useState(() => {
        setIsLoading(true);
        const fetchMember = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/member/`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('acc_tok')}`,
                    },
                });
                setMember(response.data);
                if (response.data['authorities']['0']['name'] == 'ROLE_ADMIN') setIsAdmin(true);
                changeSigninHandler(true);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        };
        if (window.localStorage.getItem('acc_tok')) {
            fetchMember();
        } else {
            setIsLoading(false);
        }
    }, [isLogin]);

    return (
        !isLoading && (
            <div class="container-fluid">
                <div class="row">
                    <Sidebar
                        isLogin={isLogin}
                        member={member}
                        changeSigninHandler={changeSigninHandler}
                    />
                    <div class="col-sm-10 ">
                        <Router
                            isLogin={isLogin}
                            isAdmin={isAdmin}
                            changeSigninHandler={changeSigninHandler}
                        />
                    </div>
                </div>
            </div>
        )
    );
}

export default App;
