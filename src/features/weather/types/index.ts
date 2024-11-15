export interface WeatherForecastRequest {
  city: string;
}

export interface WeatherForecastResponse {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: ForecastInstance[];
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population?: number;
  timezone: number;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface ForecastInstance {
  dt: number;
  dt_txt: string;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
  };
}
