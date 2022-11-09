import React, { useEffect, useState } from 'react';
import { IPlaylist } from '../../Models/playlist';
import { Location } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import './_bars.scss';
interface Props {
    myPlaylists: IPlaylist[] | undefined;
    newPlaylist: string;
    setNewPlaylist: React.Dispatch<React.SetStateAction<string>>;
    addPlaylist: any;
    setEditPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    setActivePlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    setPlaylist: React.Dispatch<React.SetStateAction<IPlaylist | undefined>>;
    sidebarClassname: boolean;
    currentLocation: Location | null;
    playlist: IPlaylist | undefined;
    setCloseSidebar: React.Dispatch<React.SetStateAction<boolean>>;
    closeSidebar: boolean;
}

const Bottombar = ({ myPlaylists, setPlaylist, currentLocation, playlist, setCloseSidebar, closeSidebar }: Props) => {
    const [opened, setOpened] = useState<boolean>(false);
    const [hideBottomBar, setHideBottomBar] = useState<boolean>(false);

    useEffect(() => {
        switch (currentLocation?.pathname) {
            case '/home/player':
                setHideBottomBar(false);
                break;

            default:
                setHideBottomBar(true);
                break;
        }
    }, [currentLocation]);

    const toggleLinks = () => {
        const myLinks = document.getElementById('bottomBarLinks');
        const elem = document.querySelector('#bottom-menu');
        if (!elem || !myLinks) return;
        const style = getComputedStyle(elem);

        if (style.display === 'none') {
            return;
        }

        if (myLinks.classList.contains('show-playlist-display')) {
            myLinks.classList.remove('show-playlist-display');
        } else {
            myLinks.classList.add('show-playlist-display');
        }
    };

    const getPlayerButtonAction = () => {
        return (
            <>
                <div className="bottomnav">
                    <div className="playlist-display mobile-playlist-display" id="bottomBarLinks">
                        {<span className={`text-1`}>My Playlists</span>}
                        {myPlaylists
                            ?.filter((playlist: IPlaylist) => playlist.name)
                            .map((playlist: IPlaylist, index: number) => (
                                <a
                                    key={index}
                                    className={`paylist-item`}
                                    href="javascript:void(0);"
                                    onClick={() => {
                                        toggleLinks();
                                        setPlaylist(playlist);
                                    }}
                                >
                                    {playlist.name}
                                </a>
                            ))}
                    </div>
                </div>
            </>
        );
    };

    return !hideBottomBar ? (
        <div className={`action-button-container`}>
            {getPlayerButtonAction()}
            <div className={`close-button`} style={{ zIndex: `${opened ? 15000 : 14000}` }}>
                <button
                    className="close-control-button"
                    onClick={(e: any) => {
                        toggleLinks();
                        // setOpened(false);

                        // setCloseSidebar(!closeSidebar);
                    }}
                    id="bottom-menu"
                >
                    <FontAwesomeIcon icon={faListAlt} />
                </button>
            </div>
        </div>
    ) : (
        <div></div>
    );
};
export default Bottombar;
