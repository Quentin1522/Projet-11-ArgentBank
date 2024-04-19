import { combineReducers } from 'redux';
import authReducer from './authSlice';

//combine les reducers pour former le rootReducer
const rootReducer = combineReducers({
    //utilise le nom 'auth' pour gérer l'état d'authentification
    auth: authReducer
});

export default rootReducer;
