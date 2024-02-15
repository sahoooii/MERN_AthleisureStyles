import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description}></meta>
			<meta name='keywords' content={keywords}></meta>
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'Welcome To Athleisure Styles',
	description:
		'We sell Sports and Fashion mixed styles, which we call Athleisure Styles.',
	keywords: 'nike, adidas, athleisure, sports, shopaholic, styles',
};

export default Meta;
