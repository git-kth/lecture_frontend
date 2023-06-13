import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../Constant/Constant';

const Home = () => {
    const [books, setBooks] = useState();
    const [authors, setAuthors] = useState();
    const [instances, setInstances] = useState();
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/member/book`);
                setBooks(response.data.content);
            } catch (err) {
                alert(err.response.data);
            }
        };
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/member/author`);
                setAuthors(response.data.content);
            } catch (err) {
                alert(err.response.data);
            }
        };
        const fetchInstances = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/member/bookinstance`);
                setInstances(response.data.content);
            } catch (err) {
                alert(err.response.data);
            }
        };
        fetchBooks();
        fetchAuthors();
        fetchInstances();
    }, []);
    return (
        books &&
        instances &&
        authors && (
            <>
                <h1>Library Home</h1>
                <p>
                    Welcome to LocalLibrary, a website developed by
                    <em style={{ fontSize: '20px' }}>&nbsp;KSU SOFTWARE KIM TAE HYUN</em>!
                </p>
                <h2>Dynamic content</h2>
                <p>The library has the following record counts:</p>
                <ul>
                    <li>
                        <strong>Books:</strong> {Object.keys(books).length}
                    </li>
                    <li>
                        <strong>Copies:</strong> {Object.keys(instances).length}
                    </li>
                    <li>
                        <strong>Authors:</strong> {Object.keys(authors).length}
                    </li>
                </ul>
            </>
        )
    );
};

export default Home;
