import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const Scrollbar = ({ children }) => {
	return (
		<Scrollbars
			renderTrackHorizontal={(props) => (
				<div {...props} className='track-horizontal' />
			)}
			renderTrackVertical={(props) => (
				<div {...props} className='track-vertical' />
			)}
			renderThumbHorizontal={(props) => (
				<div {...props} className='thumb-horizontal' />
			)}
			renderThumbVertical={(props) => (
				<div {...props} className='thumb-vertical' />
			)}
			renderView={(props) => <div {...props} className='view' />}
			style={{ minHeight: '100vh' }}
			// This will activate auto hide
			autoHide
			// Hide delay in ms
			autoHideTimeout={1000}
			// Duration for hide animation in ms.
			autoHideDuration={200}
			universal>
			{children}
		</Scrollbars>
	);
};

export default Scrollbar;
