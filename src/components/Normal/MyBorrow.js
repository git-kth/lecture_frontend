import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../../Constant/Constant';
import { Link } from 'react-router-dom';

const MyBorrow = () => {
    const [instances, setInstances] = useState();
    const [member, setMember] = useState();
    const dateFormatting = date => {
        const [year, month, day] = date.slice(0, 10).split('-');
        const [hours, minutes, seconds] = date.slice(11, 19).split(':');
        return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
    };
    const returnInstance = uuid => {
        axios
            .get(Constant.BASE_URL + `/member/return/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem('acc_tok')}`,
                },
            })
            .then(_ => {
                alert('반납 완료했습니다.');
                window.location.replace(`/myloan`);
            })
            .catch(err => {
                alert(err.response);
            });
    };
    useEffect(() => {
        const fetchInstances = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/member/myloan`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('acc_tok')}`,
                    },
                });
                setInstances(response.data);
            } catch (err) {
                alert(err.response.data);
            }
        };
        const fetchMember = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/member/`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('acc_tok')}`,
                    },
                });
                setMember(response.data);
            } catch (err) {
                alert(err.response.data);
            }
        };
        fetchInstances();
        fetchMember();
    }, []);
    return (
        member && (
            <>
                <h2>My Borrowed</h2>
                <li>
                    총 {instances ? Object.keys(instances).length : 0}권 대출중 (
                    {instances
                        ? (instances[0]['borrower']['authorities'][0]['name'] == 'ROLE_NORMAL'
                              ? 3
                              : 5) - Object.keys(instances).length
                        : member['authorities'][0]['name'] == 'ROLE_NORMAL'
                        ? 3
                        : 5}
                    권 추가 대출 가능)
                </li>
                {instances &&
                    Object.keys(instances).map(idx => (
                        <>
                            <li>
                                {instances[idx]['book']['title']} -
                                {instances[idx]['book']['author']['name']} (
                                {instances[idx]['imprint']}) [
                                {dateFormatting(instances[idx]['due_back'])}까지]
                                <a
                                    href=""
                                    data-uuid={instances[idx]['id']}
                                    onClick={e => {
                                        e.preventDefault();
                                        returnInstance(e.target.dataset.uuid);
                                    }}
                                >
                                    {' '}
                                    반납
                                </a>
                            </li>
                        </>
                    ))}
            </>
        )
    );
};

export default MyBorrow;
