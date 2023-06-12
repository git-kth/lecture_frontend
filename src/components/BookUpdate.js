import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../Constant/Constant';
import { useParams } from 'react-router-dom';

const BookUpdate = () => {
    const [book, setBook] = useState();
    const [authors, setAuthors] = useState();
    const { id } = useParams();
    const changeHandler = e => {
        setBook({
            ...book,
            [e.target.name]: e.target.value,
        });
    };

    const updateBook = () => {
        const data = JSON.stringify(book);
        console.log(book);
        axios
            .patch(Constant.BASE_URL + `/admin/book/${id}`, data, {
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
            try {
                const response = await axios.get(Constant.BASE_URL + `/admin/author`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                });
                setAuthors(response.data.content);
            } catch (err) {
                alert(err);
            }
        };
        const fetchBook = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/admin/book/${id}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                });
                setBook({ ...response.data, author_id: response.data['author']['id'] });
            } catch (err) {
                alert(err);
            }
        };
        fetchBook();
        fetchAuthors();
    }, []);
    return (
        book &&
        authors && (
            <>
                <h2>Book Update</h2>
                <form method="post">
                    <>
                        <table>
                            <tr>
                                <td>
                                    제목{' '}
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        value={book['title']}
                                        onChange={changeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    요약{' '}
                                    <input
                                        type="text"
                                        name="summary"
                                        placeholder="Summary"
                                        value={book['summary']}
                                        onChange={changeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    저자{' '}
                                    <select name="author_id" onChange={changeHandler}>
                                        <option value={null}>Author Name</option>
                                        {authors.map(author => (
                                            <option
                                                value={author['id']}
                                                selected={author['name'] == book['author']['name']}
                                            >
                                                {author['name']}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        </table>
                        <input
                            type="submit"
                            value="수정"
                            onClick={e => {
                                e.preventDefault();
                                updateBook();
                            }}
                        />
                    </>
                </form>
            </>
        )
    );
};

export default BookUpdate;
