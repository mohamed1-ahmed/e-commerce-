import CategoryItem from "./categoryItem";

const Categories = () => {
    const categories = [
        {
            id: "1",
            title: "Hats",
            route: "/shop/hats",
        },
        {
            id: "2",
            title: "Jackets",
            route: "/shop/jackets",
        },
        {
            id: "3",
            title: "Sneakers",
            route: "/shop/sneakers",
        },
        {
            id: "4",
            title: "Womens",
            route: "/shop/womens",
        },
        {
            id: "5",
            title: "Mens",
            route: "/shop/mens",
        },
    ];

    return (
        <div className="clothing">
            {categories?.map((category) => (
                <CategoryItem
                    title={category?.title}
                    url={category?.route}
                    key={category?.id}
                />
            ))}
        </div>
    );
};

export default Categories;
