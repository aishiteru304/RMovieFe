import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { RootState } from "../redux/store";

export const AuthRoute = ({ children }: { children: JSX.Element }) => {
    const token = useSelector((state: RootState) => state.user.token)
    return token ? <Navigate to='/' /> : children;
}

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const token = useSelector((state: RootState) => state.user.token)
    return token ? children : <Navigate to='/login' />;
}

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin)
    return isAdmin ? children : <Navigate to='/' />;
}