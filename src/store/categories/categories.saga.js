import { all, call, put, takeLatest } from "redux-saga/effects";
import {
    fetchCategoriesFailed,
    fetchCategoriesSuccess,
} from "./categories.action";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { CATEGORY_ACTION_TYPES } from "./categories.types";

export function* onFetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(
            getCategoriesAndDocuments,
            "categories"
        );
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(
        CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START,
        onFetchCategoriesAsync
    );
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}
