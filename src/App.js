import logo from './logo.svg';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
   <AuthProvider>
    {
      // everyone will ask from here....
    }
   </AuthProvider>
  );
}

export default App;
