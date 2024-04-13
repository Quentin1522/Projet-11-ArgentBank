import { createSlice } from '@reduxjs/toolkit';

//crée un slice redux pour gérer l'authentification
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        error: null,
    },
    reducers: {
        //reducer pour gérer la connexion réussie de l'utilisateur
        loginUserSuccess: (state, action) => {
            //met à jour létat après une connexion réussie
            state.user = action.payload;
            state.error = null;
        },

        //reducer pour gérer l'échec de la connexion de l'utilisation
        loginUserFailure: (state, action) => {
            //met à jour létat après une connexion échouée
            state.user = null;
            state.error = action.payload;
        },
        // autres reducers
    },
});

export const { loginUserSuccess, loginUserFailure } = authSlice.actions;
export default authSlice.reducer;
