import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";

const USER_TYPE = "admin";

const adminSlice = createSlice({
    name: "admin",
    initialState: null,
    reducers: {
        setAdminAction(_state, action) {
            return action.payload;
        },
        clearAdminAction(_state, _action) {
            return null;
        },
    },
});

const { setAdminAction, clearAdminAction } = adminSlice.actions;

/**
 * Perform the login operation and set the current operating admin user to the store.
 * Note that this action creator is not responsible for either storing the token to the local storage or set token in blog service.
 * Use this function when logging in.
 *
 * @param {string} username - admin account
 * @param {string} password - the unencrypted password
 * @returns {Promise<Object>} A Promise that resolves with the user object upon successful login.
 */
export const loginAdmin = (adminId, password) => {
    return async (dispatch) => {
        const admin = await loginService.login(
            {
                adminId,
                password,
            },
            USER_TYPE,
        );

        dispatch(setAdminAction(admin));
        return admin;
    };
};

/**
 * Clear the current logged in admin user from the store.
 * Use this function when logging out.
 *
 * @returns {void}
 */
export const clearAdmin = () => {
    // TODO: log out
    return (dispatch) => {
        dispatch(clearAdminAction());
    };
};

export default adminSlice.reducer;
