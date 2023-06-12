import axios from 'axios';
import { useState } from 'react';
import Constant from '../Constant/Constant';

const AuthorRegister = () => {
    const [input, setInput] = useState({
        name: '',
        birthDate: '',
        deathDate: '',
    });

    const changeHandler = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const registerAuthor = () => {
        const data = JSON.stringify(input);
        axios
            .post(Constant.BASE_URL + `/admin/author`, data, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                },
            })
            .then(_ => window.location.replace('/authors'))
            .catch(err => alert(err));
    };
    return (
        <>
            <h2>Author Register</h2>
            <form method="post">
                <>
                    <table>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={input['name']}
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="date"
                                    name="birthDate"
                                    placeholder="BirthDate"
                                    value={input['birthDate']}
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="date"
                                    name="deathDate"
                                    placeholder="DeathDate"
                                    value={input['deathDate']}
                                    onChange={changeHandler}
                                />
                            </td>
                        </tr>
                    </table>
                    <input
                        type="submit"
                        value="등록"
                        onClick={e => {
                            e.preventDefault();
                            registerAuthor();
                        }}
                    />
                </>
            </form>
        </>
    );
};

export default AuthorRegister;
