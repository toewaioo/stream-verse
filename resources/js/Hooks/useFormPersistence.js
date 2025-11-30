import { useEffect } from 'react';

export default function useFormPersistence(key, data, setData) {
    // Load saved data on mount
    useEffect(() => {
        const saved = localStorage.getItem(key);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // We use a functional update to merge with existing default values
                // ensuring we don't lose keys that might not be in localStorage
                // but are in the initial state (though usually initial state is what we start with)
                setData((prevData) => ({ ...prevData, ...parsed }));
            } catch (error) {
                console.error('Error parsing local storage data:', error);
            }
        }
    }, [key]); // Only run when key changes (mount or id change)

    // Save data on change
    useEffect(() => {
        if (data) {
            localStorage.setItem(key, JSON.stringify(data));
        }
    }, [data, key]);

    // Clear storage helper
    const clearStorage = () => {
        localStorage.removeItem(key);
    };

    return { clearStorage };
}
