import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../../Constant/Constant';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/member/book`);
                setBooks(response.data.content);
                console.log(response.data.content);
            } catch (err) {
                alert(err.response.data);
            }
        };
        fetchBooks();
    }, []);

    return (
        books && (
            <>
                {Object.keys(books).map(idx => (
                    <li>
                        {books[idx]['title']} ({books[idx]['author']['name']}){' '}
                        {<Link to={`/all-instance/${books[idx]['id']}`}>자세히</Link>}{' '}
                    </li>
                ))}
            </>
        )
    );
};

export default BookList;
