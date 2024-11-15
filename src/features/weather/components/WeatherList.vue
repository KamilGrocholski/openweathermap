<script setup lang="ts">
import { formatDate } from "@/utils/format";

export interface WeatherListProps {
    data: WeatherListDataItem[];
}

export interface WeatherListDataItem {
    time: Date | number;
    temperature: number;
}

const props = defineProps<WeatherListProps>();
</script>

<template>
    <div class="weather-list">
        <h2 class="weather-list__title">Weather Forecast List</h2>
        <ul class="weather-list__items">
            <li v-for="item in props.data" :key="item.time.valueOf()" class="weather-list__item">
                <span class="weather-list__time">{{ formatDate(item.time) }}</span>
                <span class="weather-list__temp">{{ item.temperature }} °C</span>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.weather-list {
    padding: 1rem;
    background: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    max-width: 400px;
    margin: auto;
    font-family: Arial, sans-serif;
}

.weather-list__title {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
    color: #333;
    text-align: center;
}

.weather-list__items {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.weather-list__item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #ddd;
    align-items: center;
}

.weather-list__item:last-child {
    border-bottom: none;
}

.weather-list__time {
    font-size: 0.9rem;
    color: #666;
}

.weather-list__temp {
    font-size: 1rem;
    font-weight: bold;
    color: #333;
}
</style>

