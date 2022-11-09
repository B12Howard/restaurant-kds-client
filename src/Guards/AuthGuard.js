import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../Services/AuthorizationService';
import { Context } from '../Store/Store';
import { DeleteLocalStorage } from '../Services/LocalStorage';

const PrivateRoute = ({ children }) => {
    const context = useContext(Context);
    const loggedIn = isTokenValid();

    return loggedIn ? (
        loggedIn.status === true ? (
            children
        ) : (
            // For the case when a user has an expired token and has to re-log in. Clear the context state if there is any.
            // Local storage is already cleared in the AuthService function
            <>
                {context[1]({
                    type: 'RESET_STATE',
                })}
                {DeleteLocalStorage()}
                return <Navigate to="/auth/login" />
            </>
        )
    ) : (
        // For the case when a user has an expired token and has to re-log in. Clear the context state if there is any.
        // Local storage is already cleared in the AuthService function
        <>
            {context[1]({
                type: 'RESET_STATE',
            })}
            {DeleteLocalStorage()}
            return <Navigate to="/auth/login" />
        </>
    );
};
export default PrivateRoute;
