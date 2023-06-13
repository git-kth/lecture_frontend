import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../Constant/Constant';

const InstanceRegister = () => {
    const [input, setInput] = useState({
        imprint: '',
        book_id: '',
    });
    const [books, setBooks] = useState();

    const changeHandler = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const registerInstance = () => {
        const data = JSON.stringify(input);
        axios
            .post(Constant.BASE_URL + `/admin/bookinstance`, data, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                },
            })
            .then(_ => window.location.replace('/instances'))
            .catch(err => alert(err));
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get(Constant.BASE_URL + `/member/book`, {
                headers: {
                    Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                },
            });
            setBooks(response.data.content);
        };
        fetchBooks();
    }, []);
    return (
        books && (
            <>
                <h2>Book Instance Register</h2>
                <form method="post">
                    <>
                        <table>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="imprint"
                                        placeholder="Imprint"
                                        value={input['imprint']}
                                        onChange={changeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select name="book_id" onChange={changeHandler}>
                                        <option value={null}>Book Name</option>
                                        {books.map(book => (
                                            <option value={book['id']}>{book['title']}</option>
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
                                registerInstance();
                            }}
                        />
                    </>
                </form>
            </>
        )
    );
};

export default InstanceRegister;
