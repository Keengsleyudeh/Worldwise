import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProviderRoute({children}) {
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(function() {
        if (!isAuthenticated) navigate("/")
    })

    if (isAuthenticated) return children
}
export default ProviderRoute;