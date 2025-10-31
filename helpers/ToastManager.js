import { toast } from "react-toastify";


// Keep only one success toast visible at a time and avoid rapid duplicates
let lastSuccess = { message: "", time: 0 };
const GLOBAL_SUCCESS_TOAST_ID = "global-success-toast";

export const showSuccess = (message, options = {}) => {
  const now = Date.now();
  if (lastSuccess.message === message && now - lastSuccess.time < 1500) {
    return; // Ignore rapid duplicate success messages
  }
  lastSuccess = { message, time: now };
  // Dismiss any existing global success toast, then show the new one with a stable id
  toast.dismiss(GLOBAL_SUCCESS_TOAST_ID);
  toast.success(message, { toastId: GLOBAL_SUCCESS_TOAST_ID, ...options });
};

export const showError = (message) => {
  toast.error(message);
};

export const showInfo = (message) => {
  toast.message(message);
};
