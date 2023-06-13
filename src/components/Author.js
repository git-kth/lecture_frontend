import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../Constant/Constant';
import { Link, useNavigate } from 'react-router-dom';

const Author = () => {
    const [authors, setAuthors] = useState();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const deleteAuthor = author_id => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            axios
                .delete(Constant.BASE_URL + `/admin/book?id=${author_id}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                })
                .then(_ => window.location.replace('/authors'))
                .catch(err => alert(err));
        }
    };
    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await axios.get(
                Constant.BASE_URL + `/member/author?page=${currentPage}`,
                {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                },
            );
            setAuthors(response.data.content);
        };
        fetchAuthors();
    }, [currentPage]);
    return (
        authors && (
            <>
                <h2>Author list</h2>
                <Link to="/author/register">Author Register</Link>
                {Object.keys(authors).map(x => (
                    <li>
                        {authors[x]['name']}{' '}
                        {<Link to={`/author/update/${authors[x]['id']}`}>수정</Link>}{' '}
                        {
                            <a
                                href=""
                                data-id={authors[x]['id']}
                                onClick={e => {
                                    e.preventDefault();
                                    deleteAuthor(e.target.dataset.id);
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

export default Author;
