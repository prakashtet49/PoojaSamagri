// import { checkNetworkState } from '../infrastructure/utils/NetworkState';
// import { NO_INTERNET } from '../infrastructure/utils/Constants';
// import Config from 'react-native-config';
// import { useToast } from '../features/views/commons/ToastContext';
import axios from "react-native-axios";

const axiosInstance = axios.create({
  baseURL: "https://poojasamagri-ee0ae-default-rtdb.firebaseio.com/",
  responseType: 'json',
  withCredentials: true,
  timeout: 15000,
});

// axiosInstance.interceptors.request.use(
//   async config => {
//     const isNetworkConnected = await checkNetworkState();
//     if (!isNetworkConnected) {
//       throw new Error(NO_INTERNET);
//     }
//     const source = Config.MODULE;
//     config.headers['source'] = source;

//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   },
// );

// axiosInstance.interceptors.response.use(
//   response => response,
//   error => {
//     const toast = useToast();

//     if (error.code === 'ECONNABORTED') {
//       toast.showToast('The request took too long to complete. Please try again later.');
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

export default axiosInstance;
