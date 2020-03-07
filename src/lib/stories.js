import React from 'react';
// Import the storybook libraries
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// Import our component from this folder
import { ZendProvider, zFetch } from './zend';

// Here we describe the stories we want to see of the Button. The component is
// pretty simple so we will just make two, one with text and one with emojis
// Simple call storiesOf and then chain .add() as many times as you wish
//
// .add() takes a name and then a function that should return what you want
// rendered in the rendering area

storiesOf('zFetch').add('get request ', () => (
	<ZendProvider>
		{React.createElement(() => {
			const { error, response, loading } = zFetch(
				'https://random.dog/woof.json?ref=apilist.fun'
			);

			return loading ? (
				'Loading: eZ Request'
			) : (
				<>
					{error ? (
						<span>Error: {error}</span>
					) : (
						<>
							<h1>get request: done!</h1>
							<img src={response.url} alt="dog" width="100%" />
						</>
					)}
				</>
			);
		})}
	</ZendProvider>
));
