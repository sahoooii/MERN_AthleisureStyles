// Limited（5MB）
const MAX_FILE_SIZE = 5 * 1024 * 1024; //5242880

// Whitelist for extension checking
const validFileExtensions = {
	image: ['jpg', 'jpeg', 'png', 'webp'],
};

//A function to check if the extension is valid
function isValidFileType(fileName, fileType) {
	if (!fileName) return false;

	const ext = fileName.split('.').pop().toLowerCase();
	return validFileExtensions[fileType]?.includes(ext);
}

export function validateFile(file, type = 'image') {
	// stringやURLの場合はチェック不要（編集時）
	if (!(file instanceof File)) {
		return { isValid: true }; // スルー
	}

	if (!file) return { isValid: false, error: 'File does not exist' };

	if (file.size > MAX_FILE_SIZE) {
		return { isValid: false, error: 'File size too large (up to 5MB)' };
	}

	if (!isValidFileType(file.name, type)) {
		return { isValid: false, error: 'Unsupported file format' };
	}

	return { isValid: true };
}
