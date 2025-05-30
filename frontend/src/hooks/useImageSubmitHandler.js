import { useDeleteImageMutation } from '../slices/usersApiSlice';

export const useImageSubmitHandler = ({
	mutationFn,
	uploadMutationFn,
	extractFormData,
	buildPayload,
	onSuccess = () => {},
	onError = () => {},
}) => {
	const [deleteImage] = useDeleteImageMutation();

	const submitHandler = async (values, onSubmitProps) => {
		let imageData = null;

		try {
			// ① File upload
			const { file, fieldName } = extractFormData(values);

			const formData = new FormData();
			formData.append(fieldName, file);

			imageData = await uploadMutationFn(formData).unwrap();

			// ② Create register data(text)
			const payload = buildPayload(values, imageData);

			const response = await mutationFn(payload).unwrap();
			onSuccess(response);
		} catch (error) {
			console.error('Failed:', error);

			// 🔥 Delete upload image, when registration failed
			if (imageData?.public_id) {
				try {
					await deleteImage({ public_id: imageData.public_id });
					console.log('🗑️ Deleted Upload Image');
				} catch (deleteError) {
					console.error('Failed to delete image:', deleteError);
				}
			}

			onError(error);
			onSubmitProps?.setSubmitting(false);
		}
	};

	return { submitHandler };
};
