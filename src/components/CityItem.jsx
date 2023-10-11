/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CityContext";

const formatDate = date =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(new Date(date));

function CityItem({ city }) {
	const navigate = useNavigate();
	const { cityName, emoji, date, id, position } = city;
	const { deleteCity } = useCities();

	async function handleClick(e) {
		e.preventDefault();
		await deleteCity(id);
		navigate("/app/cities");
	}
	return (
		<li>
			<Link
				to={`${id}?lat=${position.lat}&lng=${position.lng}`}
				className={styles.cityItem}
			>
				<span className={styles.emoji}>{emoji}</span>
				<h1 className={styles.name}>{cityName}</h1>
				<time className={styles.time}>{formatDate(date)}</time>
				<button
					onClick={handleClick}
					className={styles.deleteBtn}
				>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
