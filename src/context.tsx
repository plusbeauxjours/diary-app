import React, {useContext} from 'react';

export const DBContext = React.createContext(null);

export const useDB = () => useContext(DBContext);
