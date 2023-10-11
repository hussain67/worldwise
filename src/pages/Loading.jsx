import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import SpinnerFullPage from "../components/SpinnerFullPage";
import { useEffect, useState } from "react";
function Loading() {
	const { isAuthenticated } = useAuth0();
	const [timeExpired, setTimeExpired] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setTimeExpired(true);
		}, 3000);
	}, []);
	if (!isAuthenticated && !timeExpired) return <SpinnerFullPage />;
	if (!isAuthenticated && timeExpired) return <Navigate to="/" />;
	if (isAuthenticated) return <Navigate to="/app" />;
}

export default Loading;
