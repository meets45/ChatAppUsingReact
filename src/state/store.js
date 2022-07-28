import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "persist-user",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));
export const persistore = persistStore(store);
