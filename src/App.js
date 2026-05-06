import logo from "./logo.svg";
import "./App.css";
import {AuthProvider} from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import {Provider} from "react-redux";
import store from './redux/store'; // Ensure this path is correct
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        // storage entire application m available...
        <Provider store={store}>
            <AuthProvider>
                {
                    // everyone will ask from here....
                }
                <BrowserRouter>
                    <Navbar/>
                    <Routes>
                        <Route path="/"
                               element={<Navigate to="/dashboard"/>}
                        />

                        <Route path="/login"
                               element={<Login/>}
                        />

                        <Route path="/register"
                               element={<Register/>}
                        />
                        <Route path="/dashboard"
                               element={
                                   <ProtectedRoute>
                                       <Dashboard/>
                                   </ProtectedRoute>}
                        />
                    </Routes>

                </BrowserRouter>
            </AuthProvider>
        </Provider>
    );
}

export default App;
