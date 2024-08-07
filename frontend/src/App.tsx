import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layouts/Layout";
import { useAppContext } from "./contexts/AppContext";

const Register = lazy(() => import("./pages/Register"));
const SignIn = lazy(() => import("./pages/SignIn"));
const AddHotel = lazy(() => import("./pages/AddHotel"));
const MyHotels = lazy(() => import("./pages/MyHotels"));
const EditHotel = lazy(() => import("./pages/EditHotel"));
const Search = lazy(() => import("./pages/Search"));
const Detail = lazy(() => import("./pages/Detail"));
const Booking = lazy(() => import("./pages/Booking"));
const Home = lazy(() => import("./pages/Home"));
const MyBookings = lazy(() => import("./pages/MyBookings"));

const App = () => {
    const { isLoggedIn } = useAppContext();
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <Layout>
                                <Search />
                            </Layout>
                        }
                    />
                    <Route
                        path="/detail/:hotelId"
                        element={
                            <Layout>
                                <Detail />
                            </Layout>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <Layout>
                                <Register />
                            </Layout>
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <Layout>
                                <SignIn />
                            </Layout>
                        }
                    />

                    {isLoggedIn && (
                        <>
                            <Route
                                path="/hotel/:hotelId/booking"
                                element={
                                    <Layout>
                                        <Booking />
                                    </Layout>
                                }
                            />

                            <Route
                                path="/add-hotel"
                                element={
                                    <Layout>
                                        <AddHotel />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/edit-hotel/:hotelId"
                                element={
                                    <Layout>
                                        <EditHotel />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/my-hotels"
                                element={
                                    <Layout>
                                        <MyHotels />
                                    </Layout>
                                }
                            />
                            <Route
                                path="/my-bookings"
                                element={
                                    <Layout>
                                        <MyBookings />
                                    </Layout>
                                }
                            />
                        </>
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default App;
