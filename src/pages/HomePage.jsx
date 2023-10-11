import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import { useAuth0 } from "@auth0/auth0-react";

export default function Homepage() {
	const { loginWithRedirect } = useAuth0();

	return (
		<main className={styles.homepage}>
			<PageNav />
			<section>
				<h1>
					You travel the world.
					<br />
					WorldWise keeps track of your adventures.
				</h1>
				<h2>A world map that tracks your footsteps into every city you can think of. Never forget your wonderful experiences, and show your friends how you have wandered the world.</h2>
				<Link
					onClick={loginWithRedirect}
					className="cta"
				>
					Start tracking now
				</Link>
			</section>
		</main>
	);
}
