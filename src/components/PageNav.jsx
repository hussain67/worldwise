import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useAuth0 } from "@auth0/auth0-react";

function PageNav() {
	const { loginWithRedirect } = useAuth0();

	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li>
					<NavLink to={"/product"}>Product</NavLink>
				</li>
				<li>
					<NavLink to={"/pricing"}>Pricing</NavLink>
				</li>
				<li>
					<NavLink
						onClick={loginWithRedirect}
						className="cta"
					>
						logIn
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default PageNav;
