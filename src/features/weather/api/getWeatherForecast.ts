import { myFetch } from "@/utils/http";

import { WeatherForecastRequest, WeatherForecastResponse } from "../types";

export async function getWeatherForecast(
  input: WeatherForecastRequest,
): Promise<WeatherForecastResponse> {
  const response = await myFetch(
    `https://api.openweathermap.org/data/2.5/forecast/?exclude=minutely&units=metric&q=${input.city}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`,
  );
  const json = (await response.json()) as WeatherForecastResponse;
  return json;
}
