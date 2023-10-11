import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Messsage from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CityContext";

function CountryList() {
	const { countries, isLoading } = useCities();
	if (isLoading) return <Spinner />;
	if (!countries.length) return <Messsage message={"You do'nt have a country yet,  click on a country on the map to add one "} />;
	return (
		<ul className={styles.city}>
			{countries?.map(country => {
				return (
					<CountryItem
						key={country.id}
						country={country}
					/>
				);
			})}
		</ul>
	);
}

export default CountryList;
