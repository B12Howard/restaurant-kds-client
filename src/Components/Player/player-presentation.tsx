import { useEffect, useState, useContext } from 'react';
import './_player.scss';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { IPlaylist } from '../../Models/playlist';
import { Context } from '../../Store/Store';
import 'materialize-css/dist/css/materialize.min.css';

SwiperCore.use([EffectCoverflow, Pagination]);

interface Props {
    activePlaylist: IPlaylist | undefined;
    setActivePlaylist: any;
    setEditPlaylist: any;
}

const PlayerPresentation = () => {
    // @ts-ignore
    const [context, dispatch] = useContext(Context);
    const [presentationActivePlaylist, setPresentationActivePlaylist] = useState<any>(null);
    const [playlistName, setPlaylistName] = useState<string>('');
    useEffect(() => {
        if (context?.activePlaylist !== null && context?.activePlaylist !== undefined) {
            setPlaylistName(context.activePlaylist.playlist?.name);
            setPresentationActivePlaylist(context.activePlaylist.playlist);
        }
    }, [context?.activePlaylist]);

    return (
        <>
            Current Playlist: {playlistName}
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                }}
                pagination={true}
                className="mySwiper"
            >
                {presentationActivePlaylist &&
                    presentationActivePlaylist?.record?.map((record: any, i: number) => {
                        return (
                            <SwiperSlide key={i}>
                                <img
                                    className={`gif-player-image`}
                                    src={record?.blob ? URL.createObjectURL(record?.blob) : record.url}
                                    alt=""
                                />
                            </SwiperSlide>
                        );
                    })}
            </Swiper>
        </>
    );
};
export default PlayerPresentation;
