import { useCallback, useContext, useState } from 'react';
import { IFirebaseAuthResponse } from '../../Models/FirebaseAuth';
import { SetUserDataLocalStorage } from '../../Services/LocalStorage';
import LoginService, { CheckTokenService } from '../../Services/AuthenticationService';
import { Context } from '../../Store/Store';
import { useNavigate } from 'react-router-dom';
import Button from '../../Shared/Components/ButtonType1/button';
import { seteuid } from 'process';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [error, setError] = useState<string>('');
    // @ts-ignore
    const [context, dispatch] = useContext(Context);
    const navigate = useNavigate();
    const redirect = useCallback(
        (path) => {
            navigate(path, { replace: false });
        },
        [navigate]
    );

    const submit = async () => {
        try {
            const userCredentials = await LoginService(email, pass);
            setError('');
            setUserData(userCredentials.user);
            redirect('/home/player');
        } catch (err: any) {
            setError('Incorrect Credentials');
        }

        try {
            const check = await CheckTokenService();
        } catch (err: any) {}
    };

    const setUserData = (authData: IFirebaseAuthResponse) => {
        SetUserDataLocalStorage(authData);

        dispatch({
            type: 'SET_USER',
            payload: {
                authData,
            },
        });
    };

    const emailSection = () => {
        return (
            <>
                <span>
                    contact me, Howard Luong, at{' '}
                    <a href="mailto:contacthowardluong@gmail.com">contacthowardluong@gmail.com</a>
                </span>
            </>
        );
    };

    return (
        <div className={`login-body`}>
            <div className="login-container">
                <div className="login-input-container">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(ev) => setEmail(ev.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="login-input-container">
                    <input
                        id="pass"
                        name="pass"
                        type="password"
                        value={pass}
                        onChange={(ev) => setPass(ev.target.value)}
                    />
                    <label htmlFor="pass">Password</label>
                </div>
                <div>
                    <Button name={'Sign In'} callback={(val: any) => submit()} />
                </div>

                {error ? <div>{error}</div> : null}
            </div>
            <div className={`login-article`}>
                <p>
                    <span className={`bold`}>Without an account</span> you can save gifs in playlists and view them on
                    your phone! How? If the gif source allows it, GifHub will save the gif locally for offline viewing.
                    Otherwise you will need an internet connection to view your playlists.
                </p>
                <p>
                    <span className={`bold`}>With an account</span> you have access to Gif Creator where you can clip
                    mp4s from a url source and convert them to gifs at 1024p max. Files are saved for one day. And you
                    can save these to your playlists for offline viewing. Since this is just a demo, for an account{' '}
                    {emailSection()}
                </p>
                <p>
                    <span className={`bold`}>Technical Stuff:</span> Uploads are saved to a cloud storage provider and
                    are deleted automatically after 24 hours. GifHub's server is hosted on AWS EC2 instances and they
                    cost money, no suprise. So this service will have an up time of only a couple hours a day. You'll
                    know when the status light is green.
                </p>
                <p>
                    <span className={`bold`}>Want more?</span> If you're interested in this project and want something
                    similar built, whether it is gifs with overlays or video editing pipelines with FFMPEG hosted on AWS{' '}
                    {emailSection()}
                </p>
            </div>
        </div>
    );
};

export default Login;
