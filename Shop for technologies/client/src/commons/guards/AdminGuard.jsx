import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

export default function AdminGuard() {
    const { user } = useUserContext();

    return (
        <>
            {
                user && user.isAdmin
                ? <Outlet /> 
                : <Navigate to="home" />
            }
        </>
    );
}
