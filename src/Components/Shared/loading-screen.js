import { useEffect } from 'react';
import NProgress from 'nprogress';

const LoadingScreen = () => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    }, []);

    return (
        <div className="container">
            <div className={`loader`}>Loading GifHub</div>
        </div>
    );
};

export default LoadingScreen;
