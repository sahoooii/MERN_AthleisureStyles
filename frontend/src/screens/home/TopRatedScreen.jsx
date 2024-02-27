import React from 'react';
import { useGetTopRatedItemsQuery } from '../../slices/itemsApiSlice';
import Tabs from '../../components/Home/Tabs/Tabs';

const TopRatedScreen = () => {
	const { data, isLoading, error } = useGetTopRatedItemsQuery();

	return (
		<>
			<Tabs
				data={data}
				isLoading={isLoading}
				error={error}
				title='Top Rated Six Items'
				typography='Our Top'
				typographyBold='Six Items'
			/>
		</>
	);
};

export default TopRatedScreen;
