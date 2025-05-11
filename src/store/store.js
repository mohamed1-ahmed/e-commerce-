import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";

const sagaMiddleWare = createSagaMiddleware();

const middleWares = [
    import.meta.env.VITE_APP_ENVIRONMENT !== "production" && logger,
    // thunk,
    sagaMiddleWare,
].filter(Boolean);

const composeEnhancer =
    (import.meta.env.VITE_APP_ENVIRONMENT !== "production" &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const persistConfig = {
    key: "root",
    storage,
    blacklist: ["user"],
    // whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares)); //enhance our store

//action -> middleware runs before action hits -> reducers
export const store = createStore(
    persistedReducer,
    // undefined,
    composedEnhancers
); //undefined for an optional parameter - additional default state for testing made easy

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
