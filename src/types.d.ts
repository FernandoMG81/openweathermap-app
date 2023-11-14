export type CityJSON = {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: {
    lon: number;
    lat: number;
  };
}

export type City = {
  cityID: number;
  name: string;
  countryCode: string;
}


export type WeatherData = {
  cityID: number;
  timestamp: number;
  temp: number;
  humidity: number;
  feelsLike: number;
  icon: string;
  city: City;
}

 export type CardWeather = {
   city: string;
   country: string;
   temp: number;
   feelsLike: number;
   humidity: number;
   icon: string;
   timestamp?: number
 }

export type CityRecord = {
  cityID: int;
  timestamp: int
}

export type GlobalState = {
  cardWeather: WeatherData | null;
  weatherRecords: WeatherData[] | null;
}

export type CityContextType = {
  addCityWeather: (cityWeatherID: number, getAllRecords: boolean) => Promise<void>;
  deleteCityWeatherRecord: (cityWeatherID: number, timestamp: number) => Promise<void>;
  cardWeather: WeatherData | null;
  weatherRecords: WeatherData[] | null;
  loading: boolean
};