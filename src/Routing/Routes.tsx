import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GifCreator from '../Components/GifCreator/gif-creator';
import MyUploads from '../Components/MyUploads/my-uploads-presentation';
import LoadingScreen from '../Components/Shared/loading-screen';
import Login from '../Components/Login/login';
import PlayerPresentation from '../Components/Player/player-presentation';
import DashboardPresentation from '../Components/Dashboard/dashboard-presentation';
import LoginLayout from '../Components/Layouts/login-layout';
import PrivateRoute from '../Guards/AuthGuard';

const Loadable = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<LoadingScreen />}>
            <Component {...props} />
        </Suspense>
    );

const MainLayout = Loadable(lazy(() => import('../Components/Layouts/main-layout')));
const PlaylistLayout = Loadable(lazy(() => import('../Components/Playlist/playlist-presentation')));

const AppRoutes = () => (
    <Routes>
        <Route path="auth" element={<LoginLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Navigate replace to="/auth/login" />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
            <Route path="home">
                <Route path="dashboard" element={<DashboardPresentation />} />
                <Route path="player" element={<PlayerPresentation />} />
                <Route path="playlist/:playlistId/edit" element={<PlaylistLayout mode={'edit'} />} />
                <Route path="playlists" element={<PlaylistLayout mode={'list'} />} />
            </Route>
            <Route
                path="members/gif-creator"
                element={
                    <PrivateRoute>
                        <GifCreator />
                    </PrivateRoute>
                }
            />
            <Route
                path="members/my-uploads"
                element={
                    <PrivateRoute>
                        <MyUploads />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<Navigate replace to="/home/dashboard" />} />
        </Route>
    </Routes>
);

export default AppRoutes;
