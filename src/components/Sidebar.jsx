import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";

function Sidebar() {
	return (
		<div className={styles.sidebar}>
			<Logo />
			<AppNav />
			<Outlet />
			<div className={styles.footer}>
				<p className={styles.copyright}> &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.</p>
			</div>
		</div>
	);
}

export default Sidebar;
