import CategoriesPreview from "../../components/categories/categoriesPreview";
import { useSelector } from "react-redux";
import {
    selectorCategoriesIsLoading,
    selectorCategoriesMap,
} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner";

const Categories = () => {
    const categoriesMap = useSelector(selectorCategoriesMap);
    const isLoading = useSelector(selectorCategoriesIsLoading);

    return (
        <>
            {isLoading ? (
                <Spinner />
            ) : (
                /* categoriesMap is an object that has titles holding arrays {title: [], title: []} */
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (
                        <CategoriesPreview
                            key={title}
                            title={title}
                            products={products}
                        />
                    );
                })
            )}
        </>
    );
};

export default Categories;
