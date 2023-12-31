import axios from 'axios';
import { useState } from 'react';
import Constant from '../Constant/Constant';
import { useNavigate } from 'react-router-dom';

const Signin = ({ changeSigninHandler }) => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        id: '',
        pw: '',
    });

    const changeHandler = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const signin = () => {
        const data = JSON.stringify(input);
        axios
            .post(Constant.BASE_URL + `/member/signin`, data, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(res => {
                window.localStorage.setItem('acc_tok', res.data);
                changeSigninHandler(true);
                window.location.replace('/');
                // navigate('/');
            })
            .catch(err => alert(err.response.data));
    };
    return (
        <>
            <h2>로그인</h2>
            <form method="post">
                <>
                    <table>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="id"
                                    placeholder="ID"
                                    value={input['id']}
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="password"
                                    name="pw"
                                    placeholder="PW"
                                    value={input['pw']}
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                    </table>
                    <input
                        type="submit"
                        value="로그인"
                        onClick={e => {
                            e.preventDefault();
                            signin();
                        }}
                    />
                </>
            </form>
        </>
    );
};

export default Signin;
