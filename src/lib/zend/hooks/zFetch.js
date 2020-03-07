import { useState, useEffect, useContext } from 'react';

import { ZFetchContext } from '../context/ZFetchContext';
import handleErrors from './utils/fetch';

/**
 * @param {*} timeCreated
 * @param {*} cacheRefreshTime time in MINUTES
 */
const cacheExpired = (timeCreated, cacheRefreshTime = 60) => {
	const difference = new Date().getTime() - timeCreated;
	const diffInMinutes = difference / 1000 / 60;
	return diffInMinutes > cacheRefreshTime;
};

const zFetch = (url, options = {}) => {
	const { resources, setResources } = useContext(ZFetchContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (resources[url] && !cacheExpired(resources[url].requested)) {
			setLoading(false);
			setError(false);
		} else {
			setLoading(true);
			fetch(url, {
				...options,
			})
				.then(handleErrors)
				.then((r) => r.json())
				.then((data) => {
					console.log(data);
					console.log(url);
					setResources((oldResources) => ({
						...oldResources,
						[url]: { data, requested: new Date().getTime() },
					}));
					setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setError(true);
					setLoading(false);
				});
		}
	}, [url, resources[url] && resources[url].requested]);

	console.log('loading', loading);
	console.log('response', resources);
	return {
		loading,
		error,
		response: resources[url] ? resources[url].data : undefined,
	};
};

export default zFetch;
