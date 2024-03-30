import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterForm from "./components/RegisterForm";
import { UserProvider } from "./context/UserContext";
import FastingTimer from "./components/FastingTimer";
import { FastingProvider } from "./context/FastingContext";
import { ProfileProvider } from "./context/ProfileContect";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <ProfileProvider>
          <FastingProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<RegisterForm />} />
                <Route path="/timer" element={<FastingTimer />} />
              </Routes>
            </Layout>
          </FastingProvider>
        </ProfileProvider>
      </UserProvider>
    </Router>
  );
};

export default App;
