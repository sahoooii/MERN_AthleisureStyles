import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryOfJacketQuery } from '../../slices/itemsApiSlice';
import Categories from '../../components/Home/Categories/Categories';

const CategoryOfJacketScreen = () => {
	const { pageNumber, keyword } = useParams();

	const { data, isLoading, error } = useGetCategoryOfJacketQuery({
		keyword,
		pageNumber,
	});

	return (
		<>
			<Categories
				data={data}
				isLoading={isLoading}
				error={error}
				pageNumber={pageNumber}
			/>
		</>
	);
};

export default CategoryOfJacketScreen;
