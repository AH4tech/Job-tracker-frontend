import logo from "./logo.svg";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    // storage entire application m available...
    <Provider store={store}>
      <AuthProvider>
        {
          // everyone will ask from here....
        }
      </AuthProvider>
    </Provider>
  );
}

export default App;
