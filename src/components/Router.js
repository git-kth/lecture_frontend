import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Signup from './Signup';
import Signin from './Signin';
import Book from './Book';
import BookRegister from './BookRegister';
import Author from './Author';
import AuthorRegister from './AuthorRegister';
import BookUpdate from './BookUpdate';
import AuthorUpdate from './AuthorUpdate';
import BookInstance from './Instance';
import Instance from './Instance';
import InstanceRegister from './InstanceRegister';
import InstanceUpdate from './InstanceUpdate';
import BookList from './Normal/BookList';
import InstanceList from './Normal/InstanceList';
import MyBorrow from './Normal/MyBorrow';
import AllBorrow from './Normal/AllBorrow';

const Router = ({ isLogin, isAdmin, changeSigninHandler }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={isLogin ? <Home /> : <Signup />} />
            <Route
                path="/signin"
                element={isLogin ? <Home /> : <Signin changeSigninHandler={changeSigninHandler} />}
            />

            <Route path="/all-book" element={<BookList />} />
            <Route path="/all-instance/:book_id" element={<InstanceList isLogin={isLogin} />} />
            <Route
                path="/myloan"
                element={
                    isLogin ? <MyBorrow /> : <Signin changeSigninHandler={changeSigninHandler} />
                }
            />
            <Route path="/allloan" element={isLogin && isAdmin ? <AllBorrow /> : <Home />} />
            <Route path="/books" element={isLogin && isAdmin ? <Book /> : <Home />} />
            <Route
                path="/book/register"
                element={isLogin && isAdmin ? <BookRegister /> : <Home />}
            />
            <Route
                path="/book/update/:id"
                element={isLogin && isAdmin ? <BookUpdate /> : <Home />}
            />

            <Route path="/authors" element={isLogin && isAdmin ? <Author /> : <Home />} />
            <Route
                path="/author/register"
                element={isLogin && isAdmin ? <AuthorRegister /> : <Home />}
            />
            <Route
                path="/author/update/:id"
                element={isLogin && isAdmin ? <AuthorUpdate /> : <Home />}
            />

            <Route path="/instances" element={isLogin && isAdmin ? <Instance /> : <Home />} />
            <Route
                path="/instance/register"
                element={isLogin && isAdmin ? <InstanceRegister /> : <Home />}
            />
            <Route
                path="/instance/update/:id"
                element={isLogin && isAdmin ? <InstanceUpdate /> : <Home />}
            />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
