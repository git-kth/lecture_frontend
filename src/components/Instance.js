import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../Constant/Constant';
import { Link, useNavigate } from 'react-router-dom';

const Instance = () => {
    const [instances, setInstances] = useState();
    const [currentPage, setCurrentPage] = useState(0);
    const deleteInstance = instance_id => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            axios
                .delete(Constant.BASE_URL + `/admin/bookinstance?uuid=${instance_id}`, {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                })
                .then(_ => window.location.replace('/instances'))
                .catch(err => alert(err));
        }
    };
    useEffect(() => {
        const fetchInstances = async () => {
            const response = await axios.get(
                Constant.BASE_URL + `/member/bookinstance?page=${currentPage}`,
                {
                    headers: {
                        Authorization: `Baerer ${window.localStorage.getItem('acc_tok')}`,
                    },
                },
            );
            setInstances(response.data.content);
        };
        fetchInstances();
    }, [currentPage]);
    return (
        instances && (
            <>
                <h2>Book Instance list</h2>
                <Link to="/instance/register">Book Instance Register</Link>
                {Object.keys(instances).map(x => (
                    <li>
                        {instances[x]['book']['title']} ({instances[x]['book']['author']['name']}) -{' '}
                        {instances[x]['imprint']} [
                        {!instances[x]['due_back'] ? '대출 가능' : '대출 중'}]{' '}
                        {<Link to={`/instance/update/${instances[x]['id']}`}>수정</Link>}{' '}
                        {
                            <a
                                href=""
                                data-id={instances[x]['id']}
                                onClick={e => {
                                    e.preventDefault();
                                    deleteInstance(e.target.dataset.id);
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

export default Instance;
