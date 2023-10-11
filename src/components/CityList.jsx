import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Messsage from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CityContext";

function CityList() {
	const { cities, isLoading } = useCities();

	if (isLoading) return <Spinner />;

	if (!cities.length) return <Messsage message={"You do'nt have a city yet,  click on a city on the map to add one "} />;

	return (
		<ul className={styles.city}>
			{cities?.map(city => {
				return (
					<CityItem
						key={city.id}
						city={city}
					/>
				);
			})}
		</ul>
	);
}

export default CityList;
