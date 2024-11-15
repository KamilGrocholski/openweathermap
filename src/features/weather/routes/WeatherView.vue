<script setup lang="ts">
import { ref, computed } from "vue";

import { ResponseError } from "@/utils/http"
import { BaseInput, BaseButton } from "@/components/Elements"
import { MainLayout } from "@/components/Layouts"

import WeatherChart, { WeatherChartData } from "../components/WeatherChart.vue"
import WeatherList, { WeatherListDataItem } from "../components/WeatherList.vue"
import { WeatherForecastResponse } from "../types";
import { getWeatherForecast } from "../api/getWeatherForecast";


const city = ref<string>("");
const searchState = ref<"error" | "loading" | "found" | "not_found" | null>(null);
const inputErrorMessage = ref<string | null>(null);
const weatherForecastResponse = ref<WeatherForecastResponse | null>(null);

const weatherChartData = computed<WeatherChartData | null>(() =>
    weatherForecastResponse.value ? mapWeatherForecastResponseToWeatherChartData(weatherForecastResponse.value) : null);
const weatherListData = computed<WeatherListDataItem[] | null>(() =>
    weatherForecastResponse.value ? mapWeatherForecastResponseToWeatherListData(weatherForecastResponse.value) : null);

function handleSearch() {
    if (searchState.value === "loading") return;

    if (!city.value.trim()) {
        inputErrorMessage.value = "City name cannot be empty.";
        return;
    }

    inputErrorMessage.value = null;
    weatherForecastResponse.value = null;
    searchState.value = "loading";

    getWeatherForecast({ city: city.value })
        .then((data) => {
            weatherForecastResponse.value = data;
            searchState.value = "found";
        })
        .catch((err) => {
            searchState.value = err instanceof ResponseError && err.response.status === 404 ? "not_found" : "error";
        });
}

function mapWeatherForecastResponseToWeatherChartData(response: WeatherForecastResponse): WeatherChartData {
    return {
        cityName: response.city.name,
        timeline: response.list.map((self) => new Date(self.dt_txt)),
        temperatures: response.list.map((self) => self.main.temp),
    };
}

function mapWeatherForecastResponseToWeatherListData(response: WeatherForecastResponse): WeatherListDataItem[] {
    return response.list.map((self) => ({
        time: new Date(self.dt_txt),
        temperature: self.main.temp,
    }));
}
</script>

<template>
    <MainLayout>
        <div class="wrapper">
            <div class="weather-form-wrapper">
                <form @submit.prevent="handleSearch">
                    <BaseInput v-model="city" autofocus placeholder="Search city"
                        :disabled="searchState === 'loading'" />
                    <BaseButton type="submit" :is-loading="searchState === 'loading'"
                        :disabled="searchState === 'loading'">Search</BaseButton>
                </form>
                <p v-if="inputErrorMessage" class="error-message">{{ inputErrorMessage }}</p>
            </div>

            <div v-if="searchState === null">
                Check the weather forecast by typing a city name in the search bar.
            </div>
            <div v-else-if="searchState === 'loading'">Searching...</div>
            <div v-else-if="searchState === 'error'">An error occurred while trying to get the data.</div>
            <div v-else-if="searchState === 'not_found'">City not found.</div>
            <div v-else-if="searchState === 'found'">
                <WeatherChart v-if="weatherChartData" :data="weatherChartData" />
                <WeatherList v-if="weatherListData" :data="weatherListData" />
            </div>
        </div>
    </MainLayout>
</template>

<style scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
    box-sizing: border-box;
}

.weather-form-wraper {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
}

form div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.error-message {
    color: red;
}
</style>
