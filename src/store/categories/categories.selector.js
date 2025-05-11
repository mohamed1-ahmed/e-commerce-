import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectorCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

export const selectorCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);

// const cacheObj = {};
// ---------------------------------------------------------- Waiting for review
// export const selectorCategoriesMap = (state) => {
//     const checkCache = (category) => {
//         const cacheKey = category;

//         if (cacheKey && category in cacheObj) {
//             return cacheObj[category];
//         }

//         return true;
//     };

//     return (
//         checkCache &&
//         state?.categories?.categories.reduce((acc, category) => {
//             const { title, items } = category;
//             acc[title.toLowerCase()] = items;
//             return acc;
//         }, {})
//     );
// };
