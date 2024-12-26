import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

export default function AdminGuard() {
    const { user } = useUserContext();
    const parentContext=useOutletContext();

    return (
        <>
            {
                user && user.isAdmin
                ? <Outlet context={parentContext}/> 
                : <Navigate to="/home" />
            }
        </>
    );
}
