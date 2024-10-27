import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sw-api.starnavi.io',
});

export const getHeroes = async (page: number) => {
  return api.get(`/people/?page=${page}`);
};

export const getHeroDetails = (heroId: number) => {
  return api.get(`/people/${heroId}`);
};
