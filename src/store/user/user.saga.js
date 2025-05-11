import { takeLatest, all, call, put } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import {
    createDocumentFromAuth,
    createUserAuthWithEmailandPassword,
    getCurrentUser,
    signInUserAuthWithEmailandPassword,
    signInWithGooglePopup,
    signOutUser,
} from "../../utils/firebase/firebase.utils";
import {
    signInFailed,
    signInSuccess,
    signOutFailed,
    signOutSuccess,
    signUpFailed,
    signUpSuccess,
} from "./user.action";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        const userSnapshot = yield call(
            createDocumentFromAuth,
            userAuth,
            additionalDetails
        );
        yield put(
            signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })
        );
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield call(
            signInUserAuthWithEmailandPassword,
            email,
            password
        );
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* isGoogleUserAuthenticated() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* onSignUpCreateUser({
    payload: { email, password, displayName },
}) {
    try {
        const { user } = yield call(
            createUserAuthWithEmailandPassword,
            email,
            password
        );

        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}

export function* signInAfterSignup({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOutAuth() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* signInWithGoogle() {
    yield takeLatest(
        USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
        isGoogleUserAuthenticated
    );
}

export function* emailSignIn() {
    yield takeLatest(
        USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
        isUserAuthWithEmail
    );
}

export function* onCheckUserSession() {
    //checks on CHECK_USER_SESSION and then our auth state
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpAuth() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, onSignUpCreateUser);
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignup);
}

export function* onSignOut() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOutAuth);
}

export function* userSaga() {
    yield all([
        call(onCheckUserSession),
        call(emailSignIn),
        call(signInWithGoogle),
        call(onSignUpAuth),
        call(onSignUpSuccess),
        call(onSignOut),
    ]);
}
