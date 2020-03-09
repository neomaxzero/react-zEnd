import React, { useState } from 'react';

import { ZFetchContext } from './ZFetchContext';

const ZFetchProvider = ({ children, fetchOptions }) => {
	const [resources, setResources] = useState({});

	return (
		<ZFetchContext.Provider value={{ resources, setResources, fetchOptions }}>
			{children}
		</ZFetchContext.Provider>
	);
};

export default ZFetchProvider;
