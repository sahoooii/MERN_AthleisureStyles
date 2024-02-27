import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryOfTopQuery } from '../../slices/itemsApiSlice';
import Categories from '../../components/Home/Categories/Categories';


const CategoryOfTopScreen = () => {
		const { pageNumber } = useParams();

		const { data, isLoading, error } = useGetCategoryOfTopQuery({
			pageNumber,
		});

	return (
		<>
			<Categories
				data={data}
				isLoading={isLoading}
				error={error}
				title='Tops'
				typography='Tops'
				menu='/item/tops'
			/>
		</>
	);
};

export default CategoryOfTopScreen;
