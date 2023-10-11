import { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CityContext";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { Suspense } from "react";
import Loading from "./pages/Loading";
const HomePage = lazy(() => import("./pages/HomePage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
	return (
		<CitiesProvider>
			<BrowserRouter>
				<Suspense fallback={<SpinnerFullPage />}>
					<Routes>
						<Route
							index
							element={<HomePage />}
						/>
						<Route
							path="product"
							element={<Product />}
						/>
						<Route
							path="/pricing"
							element={<Pricing />}
						/>

						<Route
							path="/loading"
							element={<Loading />}
						/>

						<Route
							path="app"
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route
								index
								element={
									<Navigate
										to="cities"
										replace
									/>
								}
							/>
							<Route
								path="cities"
								element={<CityList />}
							/>
							<Route
								path="cities/:id"
								element={<City />}
							/>

							<Route
								path="countries"
								element={<CountryList />}
							/>
							<Route
								path="form"
								element={<Form />}
							/>
						</Route>

						<Route
							path="*"
							element={<PageNotFound />}
						/>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</CitiesProvider>
	);
}

export default App;
