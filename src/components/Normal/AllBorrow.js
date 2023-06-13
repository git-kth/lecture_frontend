import axios from 'axios';
import { useEffect, useState } from 'react';
import Constant from '../../Constant/Constant';

const AllBorrow = () => {
    const [instances, setInstances] = useState();
    const dateFormatting = date => {
        const [year, month, day] = date.slice(0, 10).split('-');
        const [hours, minutes, seconds] = date.slice(11, 19).split(':');
        return `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분 ${seconds}초`;
    };
    useEffect(() => {
        const fetchInstances = async () => {
            try {
                const response = await axios.get(Constant.BASE_URL + `/admin/allloan`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('acc_tok')}`,
                    },
                });
                setInstances(response.data);
            } catch (err) {
                alert(err.response.data);
            }
        };
        fetchInstances();
    }, []);
    return (
        instances && (
            <>
                <h2>All Borrowed</h2>
                {instances &&
                    Object.keys(instances).map(idx => (
                        <>
                            <li>
                                {instances[idx]['book']['title']} -
                                {instances[idx]['book']['author']['name']} (
                                {instances[idx]['imprint']}) [
                                {dateFormatting(instances[idx]['due_back'])}까지]
                            </li>
                            - [{instances[idx]['borrower']['name']}]님께서 대출중
                        </>
                    ))}
            </>
        )
    );
};

export default AllBorrow;
