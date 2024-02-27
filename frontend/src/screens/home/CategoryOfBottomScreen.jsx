import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryOfBottomQuery } from '../../slices/itemsApiSlice';
import Categories from '../../components/Home/Categories/Categories';

const CategoryOfBottomScreen = () => {
	const { pageNumber } = useParams();

	const { data, isLoading, error } = useGetCategoryOfBottomQuery({
		pageNumber,
	});

	return (
		<>
			<Categories
				data={data}
				isLoading={isLoading}
				error={error}
				title='Bottoms'
				typography='Bottoms'
				menu='/item/bottoms'
			/>
		</>
	);
};

export default CategoryOfBottomScreen;
