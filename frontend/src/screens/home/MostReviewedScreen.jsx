import React from 'react';
import Tabs from '../../components/Home/Tabs/Tabs';
import { useGetMostReviewedItemsQuery } from '../../slices/itemsApiSlice';

const HomeMostReviewed = () => {
	const { data, isLoading, error } = useGetMostReviewedItemsQuery();

	return (
		<>
			<Tabs
				data={data}
				isLoading={isLoading}
				error={error}
				title='Most Reviewed Six Items'
				typography='Most Reviewed'
				typographyBold='Six Items'
			/>
		</>
	);
};

export default HomeMostReviewed;
