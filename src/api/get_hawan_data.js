import axiosInstance from "./ApiManager";

export const get_app_version_updates = async data => {
  console.log('Request Data Get App Version :: ', data);
  try {
    const response = await axiosInstance('pooja_category.json', {
      method: 'GET',
      headers: {
        'content-type': 'multipart/form-data',
      },
      params: data,
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};
