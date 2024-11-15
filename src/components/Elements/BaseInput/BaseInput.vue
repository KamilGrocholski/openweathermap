<script lang="ts">
export const sizes = {
    md: "md",
};

export interface BaseInputProps {
    size?: keyof typeof sizes;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<BaseInputProps>(), {
    variant: "primary",
    size: "md",
})
const model = defineModel();
</script>

<template>
    <input v-model="model" class="input" :class="[sizes[size]]" />
</template>

<style scopes>
.input {
    display: block;
    width: 100%;
    font-size: 1rem;
    font-family: inherit;
    border: 1px solid #ccc;
    border-radius: 0.375rem;
    padding-inline: 1rem;
    padding-block: 0.5rem;
    color: #213547;
    background-color: #f9f9f9;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-shadow: none;
    outline: none;

    &.md {
        padding-inline: 1.25rem;
        padding-block: 0.5rem;
    }
}
</style>
