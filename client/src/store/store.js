import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

const reduxExtension =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (dummy) => dummy
        : (dummy) => dummy;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk), reduxExtension)
);

export default store;
