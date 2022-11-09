import { useRef, useEffect, useState } from 'react';
import { IPlaylist } from '../../Models/playlist';

interface Props {
    activePlaylist: IPlaylist | undefined;
    setActivePlaylist: any;
    setEditPlaylist: any;
}

const usePlayer = ({ activePlaylist, setActivePlaylist, setEditPlaylist }: Props) => {
    const [index, setIndex] = useState(0);
    const timeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
    const [playlist, setPlaylist] = useState(activePlaylist);
    const [playLength, setPlayLength] = useState<number>(0);
    const [delay, setDelay] = useState<number>();
    const [autoPlay, setAutoPlay] = useState(true);

    const defaultDuration: number = 2500;

    useEffect(() => {
        setPlaylist(activePlaylist);
        setPlayLength(activePlaylist?.record?.length || 0);
    }, [activePlaylist, setPlayLength, setPlaylist]);

    useEffect(() => {
        if (playlist?.record) {
            setDelay(playlist?.record[index]?.duration * 1000);
        }
    }, [playlist]);

    useEffect(() => {
        let defaultDelay: number = defaultDuration;
        if (!playlist) {
            return;
        }

        defaultDelay = playlist?.record ? playlist?.record[index]?.duration * 1000 : defaultDuration;

        if (!autoPlay) {
            return;
        }
        resetTimeout();
        timeoutRef.current = setTimeout(() => {
            setIndex((prevIndex) => {
                return prevIndex === playLength - 1 ? 0 : prevIndex + 1;
            });
        }, defaultDelay);

        return () => {
            resetTimeout();
        };
    }, [index, playlist]);

    const resetTimeout = () => {
        setDelay(playlist?.record ? playlist?.record[index]?.duration * 1000 : defaultDuration);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const stopAutoPlay = () => {
        if (autoPlay) {
            resetTimeout();
            setAutoPlay(false);
        } else {
            setIndex(index === playLength - 1 ? 0 : index + 1);
            setAutoPlay(true);
        }
    };

    const toggleEdit = () => {
        setEditPlaylist(activePlaylist);
        setActivePlaylist(undefined);
    };

    return {
        timeoutRef,
        index,
        setIndex,
        playlist,
        setPlaylist,
        playLength,
        setPlayLength,
        delay,
        setDelay,
        autoPlay,
        setAutoPlay,
        stopAutoPlay,
        toggleEdit,
        resetTimeout,
        defaultDuration,
    };
};

export default usePlayer;
