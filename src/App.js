import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
//Components imports
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
//Pages
import SharedLayout from "./pages/SharedLayout";
import RegisterPage from "./pages/RegisterPage";
import MatchPage from "./pages/MatchPage";
//Style imports
import './style/app.css';

function App() {
  const [userProfile, setUserProfile] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/"
          element={
            <ProtectedRoute user={userProfile} ><SharedLayout/></ProtectedRoute>
            }
        >
          <Route path="/*" element={<WelcomePage user={userProfile}/>} />
          <Route path="create/match" element={<MatchPage user={userProfile}/>} />
        </Route>

        <Route path="/login" element={<Login setUserProfile={setUserProfile}/>}/>
        <Route path="/register" element={<RegisterPage setUserProfile={setUserProfile}/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
