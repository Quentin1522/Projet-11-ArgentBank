import { combineReducers } from 'redux';
import authReducer from './authSlice';

//combine les reducers pour former le rootReducer
const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;
