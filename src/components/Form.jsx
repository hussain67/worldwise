// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useUrlPosition } from "../hooks/useUrlPosition";
import Messsage from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CityContext";

// eslint-disable-next-line react-refresh/only-export-components
export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map(char => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
	const navigate = useNavigate();
	const [lat, lng] = useUrlPosition();
	const { createCity, isLoading } = useCities();
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState(null);
	const [geocodingError, setGeocodingError] = useState("");
	const [emoji, setEmoji] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

	const handleSubmit = async e => {
		e.preventDefault();
		if (!cityName || !date) return;
		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: {
				lat,
				lng
			}
		};
		await createCity(newCity);

		navigate("/app/cities");
	};
	useEffect(() => {
		if (!lat || !lng) return;
		async function fetchCityData() {
			try {
				setIsLoadingGeocoding(true);
				setGeocodingError("");

				const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
				const data = await res.json();

				if (!data.countryCode) {
					throw new Error("No city is selected click on on another place");
				}
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));

				console.log(data);
			} catch (err) {
				setGeocodingError(err.message);
				console.log(err.message);
			} finally {
				setIsLoadingGeocoding(false);
			}
		}
		fetchCityData();
	}, [lat, lng]);
	if (isLoadingGeocoding) return <Spinner />;

	if (!lat || !lng) return <Messsage message={"Please start by clicking on a city on the map"} />;
	if (geocodingError) return <Messsage message={geocodingError} />;
	return (
		<form
			className={`${styles.form} ${isLoading ? styles.loading : ""}`}
			onSubmit={handleSubmit}
		>
			<div className={styles.row}>
				<label htmlFor="cityName">City Name</label>
				<input
					type="text"
					id="cityName"
					onChange={e => setCityName(e.target.value)}
					value={cityName}
				/>
				<span className={styles.flag}>{emoji}</span>
			</div>
			<div className={styles.row}>
				<label htmlFor="date">When did go to {cityName}</label>

				<DatePicker
					id="date"
					selected={date}
					onChange={date => {
						setDate(date);
					}}
					dateFormat="dd/MM/yyyy"
				/>
			</div>
			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<input
					id="notes"
					onChange={e => setNotes(e.target.value)}
					value={notes}
				/>
			</div>

			<div className={styles.buttons}>
				<Button type={"primary"}>Add</Button>
				<Button
					onClick={e => {
						e.preventDefault();
						navigate(-1);
					}}
				>
					&larr; Back
				</Button>
			</div>
		</form>
	);
}

export default Form;
