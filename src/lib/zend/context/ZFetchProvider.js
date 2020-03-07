import React, { useState } from 'react';

import { ZFetchContext } from './ZFetchContext';

const ZFetchProvider = ({ children }) => {
    const [resources, setResources] = useState({});

    return (
        <ZFetchContext.Provider value={{ resources, setResources }}>
            {children}
        </ZFetchContext.Provider>
    );
};

export default ZFetchProvider;
