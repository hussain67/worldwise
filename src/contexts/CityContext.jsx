/* eslint-disable react/prop-types */
import { createContext, useCallback, useContext, useEffect, useReducer } from "react";

const url = "https://worldwise-server.onrender.com" || "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
	// const [cities, setCities] = useState([]);
	// const [city, setCity] = useState({});
	// const [isLoading, setIsLoading] = useState(false);

	const initialState = {
		city: {},
		cities: [],
		isLoading: false,
		error: ""
	};
	const reducer = function (state, action) {
		const { type, payload } = action;
		switch (type) {
			case "loading":
				return {
					...state,
					isLoading: true
				};
			case "cities/loaded":
				return {
					...state,
					isLoading: false,
					cities: payload
				};

			case "city/loaded":
				return { ...state, isLoading: false, city: payload };

			case "city/created":
				return { ...state, isLoading: false, cities: [...state.cities, payload] };

			case "city/deleted":
				return {
					...state,
					isLoading: false,
					cities: state.cities.filter(city => city.id !== payload)
				};
			case "rejected":
				return {
					...state,
					isLoading: false,
					error: payload
				};

			default:
				throw new Error("Unknown action type");
		}
	};
	const [state, dispatch] = useReducer(reducer, initialState);

	const countries = state.cities.reduce((arr, city) => {
		if (!arr.map(el => el.country).includes(city.country)) {
			return [...arr, { country: city.country, emoji: city.emoji, id: city.id }];
		} else {
			return arr;
		}
	}, []);

	// console.log(cities);
	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: "loading" });

			try {
				const data = await fetch(`${url}/cities`);
				const cities = await data.json();
				dispatch({ type: "cities/loaded", payload: cities });
			} catch {
				dispatch({ action: "rejected", payload: "There was an error in loading data" });
			}
		}
		fetchCities();
	}, []);

	const getCity = useCallback(
		async function getCity(id) {
			if (Number(id) === state.city.id) return;
			dispatch({ type: "loading" });

			try {
				const data = await fetch(`${url}/cities/${id}`);
				const city = await data.json();

				dispatch({ type: "city/loaded", payload: city });
			} catch {
				dispatch({ action: "rejected", payload: "There was an error in loading data" });
			}
		},
		[state.city.id]
	);

	async function createCity(newCity) {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${url}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: {
					"Content-Type": "application/json"
				}
			});
			const city = await res.json();
			dispatch({ type: "city/created", payload: city });
		} catch {
			dispatch({ action: "rejected", payload: "There was an error in creating city" });
		}
	}
	async function deleteCity(id) {
		dispatch({ type: "loading" });

		try {
			await fetch(`${url}/cities/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});
			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({ action: "rejected", payload: "There was an error in deleting city" });
		}
	}
	const value = {
		cities: state.cities,
		countries,
		isLoading: state.isLoading,
		// setIsLoading,
		getCity,
		createCity,
		deleteCity,
		city: state.city
	};
	return <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>;
}
const useCities = function () {
	const context = useContext(CitiesContext);
	if (context === undefined) {
		throw new Error(" CitiesContext was used outside the CitiesProvider");
	}
	return context;
};
// eslint-disable-next-line react-refresh/only-export-components
export { CitiesProvider, useCities };
