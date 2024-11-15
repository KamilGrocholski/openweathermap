const WeatherView = () => import("@/features/weather/routes/WeatherView.vue");

export const publicRoutes = [
  {
    path: "/",
    name: "home",
    component: WeatherView,
  },
];
