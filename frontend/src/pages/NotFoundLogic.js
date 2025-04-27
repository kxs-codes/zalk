import { useCallback } from "react";

const useNotFoundLogic = () => {
    const getRedirectLink = useCallback(() => {
        return '/'; 
    }, []);

    return { getRedirectLink };
};

export default useNotFoundLogic;
