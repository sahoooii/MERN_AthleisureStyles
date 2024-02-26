import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryOfJacketQuery } from '../../slices/itemsApiSlice';
import Categories from '../../components/Home/Categories/Categories';

const CategoryOfJacketScreen = () => {
	const { pageNumber } = useParams();

	const { data, isLoading, error } = useGetCategoryOfJacketQuery({
		pageNumber,
	});

	return (
		<>
			<Categories
				data={data}
				isLoading={isLoading}
				error={error}
				title='Jackets'
				typography='Jackets'
				menu='/item/jackets'
			/>
		</>
	);
};

export default CategoryOfJacketScreen;
