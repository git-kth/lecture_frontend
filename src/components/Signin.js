import { useState } from 'react';

const Signin = () => {
    const [input, setInput] = useState({
        id: '',
        pw: '',
    });
    return (
        <>
            <h2>로그인</h2>
            <form method="post">
                <>
                    <table>
                        <tr>
                            <td>
                                <input type="text" name="id" placeholder="ID" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" name="pw" placeholder="PW" />
                            </td>
                        </tr>
                    </table>
                    <input type="submit" value="로그인" />
                </>
            </form>
        </>
    );
};

export default Signin;
