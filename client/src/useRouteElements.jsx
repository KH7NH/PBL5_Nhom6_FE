import path from "@/constants/path";
import { AppContext } from "@/contexts/app.context";
// import BoardLayout from "@/layouts/board.layout";
import MainLayout from "@/layouts/main.layout";
import { Suspense, lazy, useContext } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

const HomePage = lazy(() => import("./pages/home"));
const LoginPage = lazy(() => import("./pages/login"));
const RegisterPage = lazy(() => import("./pages/register"));
const BoardsPage = lazy(() => import("./pages/boards"));
const BoardDetailPage = lazy(() => import("./pages/board-detail"));

const NotFound = lazy(() => import("./pages/not-found"));

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/boards" />;
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <HomePage />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: path.boards,
          element: (
            <Suspense>
              <BoardsPage />
            </Suspense>
          ),
        },
        {
          path: path.boardDetail,
          element: (
            <Suspense>
              <BoardDetailPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "",
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <Suspense>
              <LoginPage />
            </Suspense>
          ),
        },
        {
          path: path.register,
          element: (
            <Suspense>
              <RegisterPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <Suspense>
          <NotFound />
        </Suspense>
      ),
    },
  ]);
  return routeElements;
}
