import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import registerService from "../services/register";

const USER_TYPE = "student";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUserAction(_state, action) {
            return action.payload;
        },
        clearUserAction(_state, _action) {
            return null;
        },
    },
});

const { setUserAction, clearUserAction } = userSlice.actions;

/**
 * Sets the current operating user to the store.
 * Use this function when the user object is read from the local storage.
 *
 * @param {object} user - The user object stored in local storage
 * @returns {void} This function does not return anything.
 */
export const setUser = (user) => {
    // TODO: it does not necessarily to be a redux thunk action creator
    // since there is no asynchronous operation.
    return (dispatch) => {
        dispatch(setUserAction(user));
    };
};

/**
 * Perform the login operation and set the current operating user to the store.
 * Note that this action creator is not responsible for either storing the token to the local storage or set token in blog service.
 * Use this function when logging in.
 *
 * @param {string} studentId - student id
 * @param {string} password - the unencrypted password
 * @returns {Promise<Object>} A Promise that resolves with the user object upon successful login.
 */
export const loginUser = (studentId, password) => {
    return async (dispatch) => {
        const user = await loginService.login(
            {
                studentId,
                password,
            },
            USER_TYPE,
        );
        dispatch(setUserAction(user));
        return user;
    };
};

export const registerUser = (studentId, username, password) => {
    return async (dispatch) => {
        const user = await registerService.register({
            studentId,
            username,
            password,
        });
        dispatch(setUserAction(user));
        return user;
    };
};

/**
 * Clear the current logged in user from the store.
 * Use this function when logging out.
 *
 * @returns {void}
 */
export const clearUser = () => {
    return (dispatch) => {
        dispatch(clearUserAction());
    };
};

export default userSlice.reducer;
