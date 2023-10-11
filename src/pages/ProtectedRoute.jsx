/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
function ProtectedRoute({ children }) {
	const { loginWithRedirect, isAuthenticated } = useAuth0();
	if (!isAuthenticated) {
		return (
			<Navigate
				to={loginWithRedirect()}
				replace
			/>
		);
	}
	if (isAuthenticated) {
		return children;
	}
}

export default ProtectedRoute;
