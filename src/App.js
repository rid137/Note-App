import { BrowserRouter, Routes, Route, Router } from 'react-router-dom'
import { AuthContextProvider } from './components/context/AuthContext';
import Home from './pages/home/Home';
import Write from './pages/write/Write';
import Login from "./pages/login/Login";
import Register from './pages/register/Register';
import SingleNotePage from './pages/singleNotePage/SingleNotePage';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* <ThemeContextProvider> */}

        <AuthContextProvider>
          {/* <Navbar /> */}
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/write" element={<Write  />} />
          <Route path="/editNote/:id" element={<Write  />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/note/:id" element={<SingleNotePage />} />
            {/* <Route path="/account" element={<Protected> <Account /> </Protected>} /> */}
          </Routes>
          <Footer />

        </AuthContextProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
