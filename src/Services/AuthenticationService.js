import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../Shared/Config/firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { DeleteLocalStorage } from './LocalStorage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
/**
 * Handle login
 *
 * @param {string} inputEmail user's email
 * @param {string} inputPassword user's pass
 * @return {Promise}
 */

const LoginService = async (inputEmail, inputPassword) => {
    return await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
};

const CheckTokenService = async () => {
    return await auth.currentUser.getIdToken();
};
const LogoutService = () => {
    DeleteLocalStorage();
};

export default LoginService;
export { CheckTokenService, LogoutService };
