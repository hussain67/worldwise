/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Auth0Provider
		domain={import.meta.env.VITE_REACT_APP_AUTH_DOMAIN}
		clientId={import.meta.env.VITE_REACT_APP_AUTH_CLIENT_ID}
		authorizationParams={{
			redirect_uri: "https://app-worldwise.netlify.app/loading"
		}}
	>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Auth0Provider>
);
