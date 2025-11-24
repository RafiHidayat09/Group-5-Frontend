import { API } from '../_api';

export const getPsychologists = async () => {
  try {
    const { data } = await API.get('/psychologists');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getPsychologist = async (id) => {
  try {
    const { data } = await API.get(`/psychologists/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}