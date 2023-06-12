import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../Constant/Constant';

const BookRegister = () => {
    const [input, setInput] = useState({
        title: '',
        summary: '',
        author_id: '',
    });
    const [authors, setAuthors] = useState();

    const changeHandler = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const registerBook = () => {
        const data = JSON.stringify(input);
        axios
            .post(Constant.BASE_URL + `/admin/book`, data, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                },
            })
            .then(_ => window.location.replace('/books'))
            .catch(err => alert(err));
    };

    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await axios.get(Constant.BASE_URL + `/admin/author`, {
                headers: {
                    Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                },
            });
            setAuthors(response.data.content);
        };
        fetchAuthors();
    }, []);
    return (
        authors && (
            <>
                <h2>Book Register</h2>
                <form method="post">
                    <>
                        <table>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={input['title']}
                                        onChange={changeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="summary"
                                        placeholder="Summary"
                                        value={input['summary']}
                                        onChange={changeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select name="author_id" onChange={changeHandler}>
                                        <option value={null}>Author Name</option>
                                        {authors.map(author => (
                                            <option value={author['id']}>{author['name']}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <input
                            type="submit"
                            value="등록"
                            onClick={e => {
                                e.preventDefault();
                                registerBook();
                            }}
                        />
                    </>
                </form>
            </>
        )
    );
};

export default BookRegister;
