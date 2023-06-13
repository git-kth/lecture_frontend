import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Constant from '../../Constant/Constant';

const InstanceList = ({ isLogin }) => {
    const { book_id } = useParams();
    const [instances, setInstances] = useState();
    const loanInstance = uuid => {
        axios
            .get(Constant.BASE_URL + `/member/loan/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('acc_tok')}`,
                },
            })
            .then(res => {
                alert('대출 완료했습니다.');
                window.location.replace(`/all-instance/${book_id}`);
            })
            .catch(err => alert(err.response.data));
    };

    useEffect(() => {
        const fetchInstance = async () => {
            try {
                const response = await axios.get(
                    Constant.BASE_URL + `/member/bookinstance/${book_id}`,
                );
                setInstances(response.data);
            } catch (err) {
                alert(err.response.data);
            }
        };
        fetchInstance();
    }, [book_id]);

    return (
        instances && (
            <>
                {Object.keys(instances).map(idx => (
                    <li>
                        {instances[idx]['book']['title']} -{' '}
                        {instances[idx]['book']['author']['name']} ({instances[idx]['imprint']}) [
                        {!instances[idx]['due_back'] ? '대출 가능' : '대출중'}]{' '}
                        {isLogin && (
                            <>
                                {!instances[idx]['due_back'] && (
                                    <a
                                        href=""
                                        data-uuid={instances[idx]['id']}
                                        onClick={e => {
                                            e.preventDefault();
                                            loanInstance(e.target.dataset.uuid);
                                        }}
                                    >
                                        대출
                                    </a>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </>
        )
    );
};

export default InstanceList;
