import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

export default function UserGuard() {
    const { user } = useUserContext();

    return (
        <>
            {
                user
                ? <Outlet /> 
                : <Navigate to="/login" />
            }
        </>
    );
}
