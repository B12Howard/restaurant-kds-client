import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './_bars.scss';
import { LogoutService } from '../../Services/AuthenticationService';
import { GetUserToken } from '../../Services/LocalStorage';

const Topbar = ({ showLinks }) => {
    const navigate = useNavigate();

    const redirect = useCallback(
        (path) => {
            navigate(path, { replace: false });
        },
        [navigate]
    );

    const toggleLinks = () => {
        const myLinks = document.getElementById('myLinks');
        const elem = document.querySelector('#mobile-menu');
        const style = getComputedStyle(elem);

        if (style.display === 'none') {
            return;
        }

        if (myLinks.classList.contains('show-mobile-nav-list')) {
            myLinks.classList.remove('show-mobile-nav-list');
        } else {
            myLinks.classList.add('show-mobile-nav-list');
        }
    };
    return (
        <>
            <div className="topnav">
                <a className={`logo text-2`} onClick={() => navigate('/home/dashboard', { replace: false })}>
                    GifHub
                </a>
                <div className="nav-list mobile-nav-list" id="myLinks">
                    <a
                        className={`nav-list-item`}
                        onClick={() => {
                            toggleLinks();
                            navigate('/home/dashboard', { replace: false });
                        }}
                    >
                        Dashboard
                    </a>
                    <a
                        className={`nav-list-item`}
                        onClick={() => {
                            toggleLinks();
                            navigate('/home/player', { replace: false });
                        }}
                    >
                        Player
                    </a>
                    <a
                        className={`nav-list-item`}
                        onClick={() => {
                            toggleLinks();
                            navigate('/home/playlists', { replace: false });
                        }}
                    >
                        Playlists
                    </a>
                    {GetUserToken() && (
                        <a
                            className={`nav-list-item`}
                            onClick={() => {
                                toggleLinks();
                                navigate('/members/gif-creator', { replace: false });
                            }}
                        >
                            Gif Creator
                        </a>
                    )}
                    {GetUserToken() && (
                        <a
                            className={`nav-list-item`}
                            onClick={() => {
                                toggleLinks();
                                navigate('/members/my-uploads', { replace: false });
                            }}
                        >
                            My Uploads
                        </a>
                    )}
                    <a
                        className={`nav-list-item`}
                        onClick={() => {
                            LogoutService();
                            redirect('/auth/login');
                        }}
                    >
                        {GetUserToken() ? 'Logout' : 'Login'}
                    </a>
                </div>
                <a href="javascript:void(0);" className={`mobile-menu`} id="mobile-menu" onClick={() => toggleLinks()}>
                    <span className="mobile-icon">≡</span>
                </a>
            </div>
        </>
    );
};
export default Topbar;
