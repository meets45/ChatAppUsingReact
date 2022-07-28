import "./App.css";
import { SignUp } from "./container/SignUp";
import { SignIn } from "./container/SignIn";
import { Welcome } from "./components/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { store, persistore } from "./state/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Edit } from "./container/Edit";
import { ForgotPass } from "./components/ForgotPass";
import { ChangePass } from "./components/ChangePass";
import { MainScreen } from "./container/MainScreen";

function App() {
  return (
    <div className="overflow">
      <Provider store={store}>
        <PersistGate persistor={persistore}>
          <AuthProvider>
            <Router>
              <Routes>
                <Route exact path="/" element={<MainScreen />} />
                <Route exact path="/login" element={<SignIn />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/profile" element={<Edit />} />
                <Route exact path="/forgotpass" element={<ForgotPass />} />
                <Route exact path="/welcome" element={<Welcome />} />
                <Route exact path="/changePass" element={<ChangePass />} />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
              </Routes>
            </Router>
          </AuthProvider>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
