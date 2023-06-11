import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import NotFound from './NotFound';
import Signup from './Signup';
import Signin from './Signin';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
};

export default Router;
