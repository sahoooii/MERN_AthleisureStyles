import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryOfCapQuery } from '../../slices/itemsApiSlice';
import Categories from '../../components/Home/Categories/Categories';

const CategoryOfCapScreen = () => {
	const { pageNumber } = useParams();

	const { data, isLoading, error } = useGetCategoryOfCapQuery({
		pageNumber,
	});

	return (
		<>
			<Categories
				data={data}
				isLoading={isLoading}
				error={error}
				title='Caps'
				typography='Caps'
				menu='/item/caps'
			/>
		</>
	);
};

export default CategoryOfCapScreen;
