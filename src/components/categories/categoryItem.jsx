import { useNavigate } from "react-router-dom";

const CategoryItem = ({ title, url }) => {
    const categoryClass = title.toLowerCase();

    const navigate = useNavigate();
    const handleNavigate = () => navigate(url);

    return (
        <div
            className={`clothing__type ${categoryClass}`}
            onClick={handleNavigate}
        >
            <div className="clothing__type--category">
                <h2 title={title}>{title}</h2>
                <a href={url}>Shop Now</a>
            </div>
        </div>
    );
};

export default CategoryItem;
