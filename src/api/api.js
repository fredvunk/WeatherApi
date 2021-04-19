import axios from 'axios';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const URL2 = 'https://api.openweathermap.org/data/2.5/forecast';
const key = 'Add your API key here';
const cn = '7'

export const getWeather = async (query) =>{
  const {data} = await axios.get(URL, {
    params: {
      q: query,
      appid: key,
      units: 'metric',
    }
  })
  return data;
}

export const getForecast = async (query) => {
  const { data } = await axios.get(URL2, {
    params: {
      q: query,
      APPID: key,
      cnt: cn,
      units: 'metric',
    }
  });
  return data;
}