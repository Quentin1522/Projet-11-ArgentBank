import { loginUserSuccess, loginUserFailure } from './authSlice';

export const loginUser = (userData) => {
    return async (dispatch) => {
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                dispatch(loginUserSuccess({user: data.user, token}));
            } else {
                dispatch(loginUserFailure('Invalid credentials'));
            }
        } catch (error) {
            console.error('Error logging in:', error);
            dispatch(loginUserFailure('An error occurred'));
        }
    };
};
