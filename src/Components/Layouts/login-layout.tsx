import { Outlet } from 'react-router-dom';
import Topbar from '../Bars/topbar';
const LoginLayout = () => {
    return (
        <div className={`container`}>
            <Topbar showLinks={false} />

            <Outlet />
        </div>
    );
};
export default LoginLayout;
