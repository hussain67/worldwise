import { useAuth0 } from "@auth0/auth0-react";
import styles from "./User.module.css";

function User() {
	const { logout } = useAuth0();

	function handleClick() {
		localStorage.removeItem("user");
		logout({ returnTo: "http://localhost:5173" });
	}
	return (
		<div className={styles.user}>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
}

export default User;
