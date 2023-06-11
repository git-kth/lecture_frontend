import axios from 'axios';
import { useState } from 'react';
import Constant from '../Constant/Constant';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        id: '',
        pw1: '',
        pw2: '',
        name: '',
        birthDate: '',
    });
    const changeHandler = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };
    const signup = () => {
        const data = JSON.stringify(input);
        axios
            .post(Constant.BASE_URL + `/member/signup`, data, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(_ => navigate('/'))
            .catch(err => alert(err.response.data));
    };
    return (
        <>
            <h2>회원가입</h2>
            <form method="post">
                <>
                    <table>
                        <tr>
                            <td>
                                <label for="id">ID</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="id"
                                    name="id"
                                    value={input['id']}
                                    placeholder="(6 ~ 15자를 입력하세요)"
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="pw1">패스워드</label>
                            </td>
                            <td>
                                <input
                                    type="password"
                                    id="pw1"
                                    name="pw1"
                                    value={input['pw1']}
                                    placeholder="(8 ~ 18자를 입력하세요)"
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="pw2">패스워드 확인</label>
                            </td>
                            <td>
                                <input
                                    type="password"
                                    id="pw2"
                                    name="pw2"
                                    value={input['pw2']}
                                    placeholder="(8 ~ 18자를 입력하세요)"
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="name">이름</label>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={input['name']}
                                    placeholder="(본인 이름을 입력하세요)"
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="birthDate">생년월일</label>
                            </td>
                            <td>
                                <input
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    value={input['birthDate']}
                                    max={Constant.NOW}
                                    min="1900-01-01"
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                    </table>
                    <input
                        type="submit"
                        value="회원가입"
                        onClick={e => {
                            e.preventDefault();
                            signup();
                        }}
                    />
                </>
            </form>
        </>
    );
};

export default Signup;
