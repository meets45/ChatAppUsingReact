import "./App.css";
import { AuthProvider } from "./context/authContext";
import { store, persistore } from "./state/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RouteContainer from "./components/Routes";

function App() {
  return (
    <div className="overflow">
      <Provider store={store}>
        <PersistGate persistor={persistore}>
          <AuthProvider>
            <RouteContainer />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
