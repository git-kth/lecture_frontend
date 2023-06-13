import { Link } from 'react-router-dom';

const Sidebar = ({ isLogin, member, changeSigninHandler }) => {
    return (
        <div class="col-sm-2">
            <ul class="sidebar-nav">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <a href="/all-book">All books</a>
                </li>
                {/* <li>
                    <a href="">All authors</a>
                </li> */}
            </ul>
            <ul class="sidebar-nav">
                {isLogin ? (
                    <>
                        <li>User: {member['name']}</li>
                        <li>
                            <Link to="/myloan">My Borrowed</Link>
                        </li>
                        <li>
                            <a
                                href=""
                                onClick={_ => {
                                    window.localStorage.removeItem('acc_tok');
                                    changeSigninHandler(false);
                                    alert('로그아웃 되었습니다.');
                                }}
                            >
                                Logout
                            </a>
                        </li>
                        {Object.keys(member).length > 0 &&
                            member['authorities'][0]['name'] == 'ROLE_ADMIN' && (
                                <>
                                    <hr />
                                    <li>Admin</li>
                                    <li>
                                        <Link to="/allloan">All Borrowed</Link>
                                    </li>
                                    <li>
                                        <Link to="/books">Book</Link>
                                    </li>
                                    <li>
                                        <Link to="/instances">Book Instance</Link>
                                    </li>
                                    <li>
                                        <Link to="/authors">Author</Link>
                                    </li>
                                </>
                            )}
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signin">로그인</Link>
                        </li>
                        <li>
                            <Link to="/signup">회원가입</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sidebar;
