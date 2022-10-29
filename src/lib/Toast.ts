import { toast } from 'react-toastify';

const config = {
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
}

export const showAlert = (message: String, type: String) => {
	if (type === 'error') {
		toast.error(message, config);
	} else if (type === 'warning') {
		toast.warning(message, config);
	} else if (type === 'success') {
		toast.success(message, config);
	} else {
		toast.info(message, config);
	}
};