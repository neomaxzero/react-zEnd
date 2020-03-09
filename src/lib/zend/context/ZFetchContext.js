import React from 'react';

export const ZFetchContext = React.createContext({
	resources: {},
	setResources: () => {},
	fetchOptions: {},
});
