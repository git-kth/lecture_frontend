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

const Router = ({ isLogin, isAdmin, changeSigninHandler }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={isLogin ? <Home /> : <Signup />} />
            <Route
                path="/signin"
                element={isLogin ? <Home /> : <Signin changeSigninHandler={changeSigninHandler} />}
            />
            <Route
                path="/books"
                element={
                    isLogin && isAdmin ? (
                        <Book />
                    ) : (
                        <Signin changeSigninHandler={changeSigninHandler} />
                    )
                }
            />
            <Route
                path="/book/register"
                element={
                    isLogin && isAdmin ? (
                        <BookRegister />
                    ) : (
                        <Signin changeSigninHandler={changeSigninHandler} />
                    )
                }
            />
            <Route
                path="/book/update/:id"
                element={
                    isLogin && isAdmin ? (
                        <BookUpdate />
                    ) : (
                        <Signin changeSigninHandler={changeSigninHandler} />
                    )
                }
            />

            <Route
                path="/authors"
                element={
                    isLogin && isAdmin ? (
                        <Author />
                    ) : (
                        <Signin changeSigninHandler={changeSigninHandler} />
                    )
                }
            />
            <Route
                path="/author/register"
                element={
                    isLogin && isAdmin ? (
                        <AuthorRegister />
                    ) : (
                        <Signin changeSigninHandler={changeSigninHandler} />
                    )
                }
            />
            <Route
                path="/author/update/:id"
                element={
                    isLogin && isAdmin ? (
                        <AuthorUpdate />
                    ) : (
                        <Signin changeSigninHandler={changeSigninHandler} />
                    )
                }
            />

            <Route
                path="/instances"
                element={
                    isLogin && isAdmin ? (
                        <Instance />
                    ) : (
                        <Signin changeSigninHandler={changeSigninHandler} />
                    )
                }
            />
            <Route
                path="/instance/register"
                element={
                    isLogin && isAdmin ? (
                        <InstanceRegister />
                    ) : (
                        <Signin changeSigninHandler={changeSigninHandler} />
                    )
                }
            />
            <Route
                path="/instance/update/:id"
                element={
                    isLogin && isAdmin ? (
                        <InstanceUpdate />
                    ) : (
                        <Signin changeSigninHandler={changeSigninHandler} />
                    )
                }
            />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
