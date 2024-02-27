import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryOfAccessoryQuery } from '../../slices/itemsApiSlice';
import Categories from '../../components/Home/Categories/Categories';

const CategoryOfAccessoryScreen = () => {
	const { pageNumber } = useParams();

	const { data, isLoading, error } = useGetCategoryOfAccessoryQuery({
		pageNumber,
	});

	return (
		<>
			<Categories
				data={data}
				isLoading={isLoading}
				error={error}
				title='Accessories'
				typography='Accessories'
				menu='/item/accessories'
			/>
		</>
	);
};

export default CategoryOfAccessoryScreen;
