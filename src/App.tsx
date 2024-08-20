import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/user/login/login"
import RegisterPage from "./pages/user/register/register"
import HomePage from "./pages/home/home"
import ProfilePage from "./pages/user/profile/profile"
import { useDispatch } from "react-redux"
import { getInformation, login } from "./redux/UserSlice"
import { AdminRoute, AuthRoute, PrivateRoute } from "./route"
import AboutUs from "./pages/static/about-us"
import ContactUs from "./pages/static/contact-us"
import NotFound from "./pages/static/not-found"
import ChangePassword from "./pages/user/password/change-password"
import AddMovie from './pages/admin/movie/add-movie'
import UploadMovie from './pages/admin/movie/upload-movie'
import UserAdmin from "./pages/admin/user/user-admin"
import { getProfile } from "./components/header/api"
import MoviesList from "./pages/admin/movie/list-movie"
import Dashboard from "./pages/admin/dashboard/dashboard"

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ListMoviesPage from "./pages/movies/list-movie"
import LikeMoviesList from "./pages/user/like/list-like"
import SingleMovie from "./pages/movies/single/single-movie"
import WatchPage from "./pages/movies/watch-page"

function App() {
  const dispatch = useDispatch()
  const token = sessionStorage.getItem('token');

  const fetchInformation = async () => {
    try {
      const res = await getProfile()
      dispatch(getInformation(res.data))
    }
    catch (err: any) {
      // Token expire then logout
      if (err.response.status == 401) {
        sessionStorage.removeItem('token')
        window.location.href = "/"
      }
    }
  }
  if (token !== null) {
    dispatch(login(JSON.parse(token)));
    fetchInformation()
  }

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/movies" element={<ListMoviesPage />} />
        <Route path="/movie/:id" element={<SingleMovie />} />


        {/* Auth routes */}
        <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
        <Route path="/register" element={<AuthRoute><RegisterPage /></AuthRoute>} />

        {/* Private routes */}
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/password" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
        <Route path="/favorite" element={<PrivateRoute><LikeMoviesList /></PrivateRoute>} />
        <Route path="/watch/:id" element={<PrivateRoute><WatchPage /></PrivateRoute>} />

        {/* Admin routes */}
        <Route path="/addmovie" element={<AdminRoute><AddMovie /></AdminRoute>} />
        <Route path="/users" element={<AdminRoute><UserAdmin /></AdminRoute>} />
        <Route path="/upload/:id" element={<AdminRoute><UploadMovie /></AdminRoute>} />
        <Route path="/movieslist" element={<AdminRoute><MoviesList /></AdminRoute>} />
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />

        {/* Other */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
