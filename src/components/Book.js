import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../Constant/Constant';
import { Link, useNavigate } from 'react-router-dom';

const Book = () => {
    const [books, setBooks] = useState();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const deleteBook = book_id => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            axios
                .delete(Constant.BASE_URL + `/admin/book?id=${book_id}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                })
                .then(_ => window.location.replace('/books'))
                .catch(err => alert(err));
        }
    };
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get(
                Constant.BASE_URL + `/admin/book?page=${currentPage}`,
                {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                },
            );
            setBooks(response.data.content);
        };
        fetchBooks();
    }, [currentPage]);
    return (
        books && (
            <>
                <h2>Book list</h2>
                <Link to="/book/register">Book Register</Link>
                {Object.keys(books).map(x => (
                    <li>
                        {books[x]['title']} ({books[x]['author']['name']}){' '}
                        {<Link to={`/book/update/${books[x]['id']}`}>수정</Link>}{' '}
                        {
                            <a
                                href=""
                                data-id={books[x]['id']}
                                onClick={e => {
                                    e.preventDefault();
                                    deleteBook(e.target.dataset.id);
                                }}
                            >
                                삭제
                            </a>
                        }
                    </li>
                ))}
            </>
        )
    );
};

export default Book;
