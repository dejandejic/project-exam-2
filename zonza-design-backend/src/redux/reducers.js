import auth from "./auth/reducer";
import navigation from "./navigation/reducer";
import themeChanger from "./themeChanger/reducer";
import themeSetting from "./themeSettings/reducer";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        navigation,
        themeChanger,
        themeSetting,
        router: routerReducer,
        ...asyncReducers,
    });

export default createReducer;
