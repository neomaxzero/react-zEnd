import { useState, useEffect, useContext } from 'react';

import handleErrors from './utils/fetch';
import { ZFetchContext } from '../context/ZFetchContext';

export const zEnd = (url) => {
	const { resources, setResources, fetchOptions } = useContext(ZFetchContext);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [trigger, setTrigger] = useState(false);
	const [options, setOptions] = useState({});
	const [body, setBody] = useState({});

	const reFetch = (url) => {
		setResources((oldResources) => ({
			...oldResources,
			[url]: {
				data: resources[url] ? resources[url].data : {},
				requested: new Date('01/01/1990').getTime(),
			},
		}));
	};

	const now = (body, options) => {
		if (!loading) {
			setBody(body);
			setOptions(options);
			setTrigger(true);
		}
	};

	useEffect(() => {
		if (trigger) {
			setLoading(true);
			setTrigger(false);

			if (options.optimistic) {
				const { url, updateFn } = options.optimistic;
				const newData = updateFn(resources[url].data);

				setResources((oldResources) => ({
					...oldResources,
					[url]: {
						...oldResources[url],
						data: newData,
					},
				}));
			}

			fetch(url, {
				body: JSON.stringify(body),
				...fetchOptions,
				...options.fetchOptions,
			})
				.then(handleErrors)
				.then((r) => r.json())
				.then((data) => {
					setLoading(false);
					if (options.onSuccess) {
						options.onSuccess(data);
					}
				})
				.catch((error) => {
					setError(true);
					setLoading(false);
					if (options.onError) {
						options.onError(error);
					}
				});
		}
	}, [trigger]);

	return { loading, error, now, reFetch };
};

export default zEnd;
