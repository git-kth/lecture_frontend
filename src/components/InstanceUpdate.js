import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../Constant/Constant';
import { useParams } from 'react-router-dom';

const InstanceUpdate = () => {
    const [instance, setInstance] = useState();
    const { id } = useParams();
    const changeHandler = e => {
        setInstance({
            ...instance,
            [e.target.name]: e.target.value,
        });
    };

    const updateInstance = () => {
        const data = JSON.stringify({
            ...instance,
            book_id: instance['book']['id'],
        });
        console.log(instance);
        axios
            .patch(Constant.BASE_URL + `/admin/bookinstance/${id}`, data, {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                    Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                },
            })
            .then(_ => window.location.replace('/instances'))
            .catch(err => alert(err));
    };
    useEffect(() => {
        const fetchInstance = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/admin/bookinstance/${id}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                });
                setInstance(response.data);
            } catch (err) {
                alert(err);
            }
        };
        fetchInstance();
    }, []);
    return (
        instance && (
            <>
                <h2>Instance Update</h2>
                <form method="post">
                    <>
                        <table>
                            <tr>
                                <td>
                                    출판사{' '}
                                    <input
                                        type="text"
                                        name="imprint"
                                        placeholder="Imprint"
                                        value={instance['imprint']}
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
                                updateInstance();
                            }}
                        />
                    </>
                </form>
            </>
        )
    );
};

export default InstanceUpdate;
