import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Bottombar from '../Bars/bottombar';
import Topbar from '../Bars/topbar';
import { GetUserDataByKey, GetUserToken } from '../../Services/LocalStorage';
import usePlaylist from '../Playlist/playlist-smart';
import { db } from '../../db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Location } from 'history';
// @ts-ignore
import M from 'materialize-css/dist/js/materialize.min.js';
import loginBg from '../../Assets/antenna-jqh0GEvuNBY-unsplash-min.jpeg';
import playerBg from '../../Assets/barna-kovacs-vfAguUFUIgo-unsplash-min.jpeg';
import myUploadsBg from '../../Assets/iwan-shimko-PhciG8fpRKw-unsplash-min.jpeg';
import creatorBg from '../../Assets/rochelle-lee-6LscnhGdFsw-unsplash-min.jpeg';
import playlistBg from '../../Assets/rochelle-lee-uqa8vZROxkY-unsplash-min.jpeg';

const MainLayout = () => {
    const [closeSidebar, setCloseSidebar] = useState(false);
    const [message, setMessage] = useState('');
    const [bgUrl, setBgUrl] = useState('');
    const [bgOpacity, setBgOpacity] = useState('0.95');
    const [inputValue, setInputValue] = useState('');
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
    const myPlaylists = useLiveQuery(() => db.playlists.toArray());
    const [sidebarClassname, setSidebarClassname] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>();
    let [delay, setDelay] = useState(1000);
    // @ts-ignore
    const location = useLocation<Location>();
    const { addPlaylist, setPlaylist, setActivePlaylist, setEditPlaylist, newPlaylist, setNewPlaylist, playlist } =
        usePlaylist();
    const savedCallback: React.MutableRefObject<any> = useRef();

    useLayoutEffect(() => {
        const path = location.pathname;

        switch (path) {
            case '/home/player':
                setBgOpacity('0.93');
                setBgUrl(playerBg);
                break;
            case '/home/dashboard':
                setBgOpacity('0.90');
                setBgUrl(loginBg);
                break;
            case '/home/playlists':
                setBgOpacity('0.95');
                setBgUrl(playlistBg);
                break;
            case '/members/gif-creator':
                setBgOpacity('0.95');
                setBgUrl(creatorBg);
                break;
            case '/members/my-uploads':
                setBgOpacity('0.90');
                setBgUrl(myUploadsBg);
                break;

            default:
                setBgOpacity('0.95');
                setBgUrl(loginBg);
        }
        // };
    }, [location]);

    useEffect(() => {
        setSocket(new WebSocket('ws://localhost:5020/ws/' + GetUserDataByKey('uid')));
    }, []);

    useEffect(() => {
        if (!socket) return;
        socket.onopen = () => {
            setMessage('Connected');
        };
        socket.onmessage = (e) => {
            const parsed = JSON.parse(e.data);
            setMessage('Get message from server: ' + e.data);
            M.toast({ html: parsed.eventPayload.username + ': ' + parsed.eventPayload.message, displayLength: 3000 });
        };

        return () => {
            socket.close();
        };
    }, [socket]);

    useEffect(() => {
        setCurrentLocation(location);
    }, [location]);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (GetUserToken() && delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);

    function callback() {
        if (socket?.readyState === 3) {
            setSocket(new WebSocket('ws://localhost:5020/ws/' + GetUserDataByKey('uid')));
        }
    }

    const sendMessage = useCallback(
        (e) => {
            e.preventDefault();

            if (!socket) return;

            socket.send(
                JSON.stringify({
                    EventName: 'message',
                    EventPayload: { message: inputValue, userID: GetUserDataByKey('uid') },
                })
            );
        },
        [inputValue]
    );

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }, []);

    return (
        <div
            className={`container`}
            id={`main-container`}
            style={{
                backgroundImage: `linear-gradient(to top right, rgba(246, 241, 237, ${bgOpacity}) 10%, rgba(255, 242, 232, ${bgOpacity})), url('${bgUrl}')`,
            }}
        >
            <Topbar showLinks={true} />
            {GetUserToken() ? `Server is ${socket?.readyState === 1 ? 'up' : 'down'}` : ''}
            <div className={`row`}>
                <div className="App"></div>
                <Outlet />
                <div className={'bottombar'}>
                    <Bottombar
                        myPlaylists={myPlaylists}
                        newPlaylist={newPlaylist}
                        setNewPlaylist={setNewPlaylist}
                        addPlaylist={addPlaylist}
                        setEditPlaylist={setEditPlaylist}
                        setActivePlaylist={setActivePlaylist}
                        sidebarClassname={sidebarClassname}
                        setPlaylist={setPlaylist}
                        currentLocation={currentLocation}
                        playlist={playlist}
                        setCloseSidebar={setCloseSidebar}
                        closeSidebar={closeSidebar}
                    />
                </div>
            </div>
        </div>
    );
};
export default MainLayout;
