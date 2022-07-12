import { Navigate, useRoutes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MemoDetailPage from './pages/MemoDetailPage';
import MemoManagerPage from './pages/MemoManagerPage';
import MemoTrashPage from './pages/MemoTrashPage';
import MemoWritePage from './pages/MemoWritePage';

const Routes = () => {
    return useRoutes([{
        path: "/",
        element: <MainPage />
    }, {
        path: "/manager",
        element: <MemoManagerPage />
    }, {
        path: "/trash",
        element: <MemoTrashPage />
    }, {
        path: "/:id",
        element: <MemoDetailPage />
    }, {
        path: "/:id/edit",
        element: <MemoWritePage />
    }, {
        path: "/*",
        element: <Navigate to={"/"} replace />
    }])
}

export default Routes