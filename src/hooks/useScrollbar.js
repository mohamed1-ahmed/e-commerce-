import { useState, useEffect } from "react";

const useScrollbar = (ref, dependency) => {
    const [hasScrollbar, setHasScrollbar] = useState(false);

    useEffect(() => {
        const checkScrollbar = () => {
            const element = ref.current;
            const hasScrollbar = element.scrollHeight > element.clientHeight;
            setHasScrollbar(hasScrollbar);
        };

        // Initial check for scrollbar
        checkScrollbar();

        // Add event listener for window resize
        window.addEventListener("resize", checkScrollbar);

        // Clean up the event listener
        return () => {
            window.removeEventListener("resize", checkScrollbar);
        };
    }, [ref, dependency]);

    return hasScrollbar;
};

export default useScrollbar;
