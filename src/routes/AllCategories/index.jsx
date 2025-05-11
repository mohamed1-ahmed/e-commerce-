import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/productCard";
import { useSelector } from "react-redux";
import {
    selectorCategoriesIsLoading,
    selectorCategoriesMap,
} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spinner";

const AllCategories = () => {
    const { category } = useParams();

    const isLoading = useSelector(selectorCategoriesIsLoading);
    const categoriesMap = useSelector(selectorCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <div className="productWrapper">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    {category && <h2>{category}</h2>}
                    <div className="product">
                        {products?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AllCategories;
