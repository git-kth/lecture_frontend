import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../Constant/Constant';
import { useParams } from 'react-router-dom';

const AuthorUpdate = () => {
    const [author, setAuthor] = useState();
    const { id } = useParams();
    const changeHandler = e => {
        setAuthor({
            ...author,
            [e.target.name]: e.target.value,
        });
    };

    const updateAuthor = () => {
        const data = JSON.stringify(author);
        axios
            .patch(Constant.BASE_URL + `/admin/author/${id}`, data, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                },
            })
            .then(_ => window.location.replace('/authors'))
            .catch(err => alert(err));
    };
    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/admin/author/${id}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                });
                setAuthor(response.data);
            } catch (err) {
                alert(err);
            }
        };
        fetchAuthor();
    }, []);
    return (
        author && (
            <>
                <h2>Author Update</h2>
                <form method="post">
                    <>
                        <table>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={author['name']}
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
                                        value={author['birthDate']}
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
                                        value={author['deathDate']}
                                        onChange={changeHandler}
                                    />
                                </td>
                            </tr>
                        </table>
                        <input
                            type="submit"
                            value="수정"
                            onClick={e => {
                                e.preventDefault();
                                updateAuthor();
                            }}
                        />
                    </>
                </form>
            </>
        )
    );
};

export default AuthorUpdate;
