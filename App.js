import { UserProvider } from './context/UserContext';
import { FavoritesContext, FavoritesProvider } from './context/FavoritesContext';
import ErrorBoundary from './ErrorBoundary';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import LandingPage from './pages/Home/LandingPage';
import Register from './pages/Login/Register';
import ViewFavorites from './pages/Options/ViewFavorites';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Option2 from './pages/Options/Option2';
import './About.css'
import './Testimonals.css'
import './theme.css'
import './Footer.css'
import './imageslider.css'




const MyApp = () => {  //functional component

  return (
    
    <div> 
      <div className="wrapper">
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <UserProvider>
          <FavoritesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/Search" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/ViewFavorites" element={<ViewFavorites />} />
              <Route path="/Option2" element={<Option2 />} />
          {/* <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="*" element={<NoMatch />} /> */}
            </Routes>
          </BrowserRouter>
          </FavoritesProvider>
        </UserProvider>
      </ErrorBoundary>

      </div>
    </div>


  );


}

export default MyApp;