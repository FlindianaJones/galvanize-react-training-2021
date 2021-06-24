import { createContext, useContext, useState } from 'react';

const viewProvider = createContext(undefined);
export const useView = () => useContext(viewProvider);

export const ViewContext = ({ value, children }) => {
    const [view, setView] = useState(value || 'Search');
    return (
        <viewProvider.Provider value={[view, setView]}>
            {children}
        </viewProvider.Provider>
    );
};