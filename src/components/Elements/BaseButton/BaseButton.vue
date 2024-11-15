<script lang="ts">
export const variants = {
    primary: "primary",
};

export const sizes = {
    md: "md",
}

export interface BaseButtonProps {
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    isLoading?: boolean;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<BaseButtonProps>(), {
    variant: "primary",
    size: "md",
    isLoading: false,
})
</script>

<template>
    <button class="button" :class="[variants[variant], sizes[size]]">
        <span v-if="isLoading">Loading...</span>
        <span v-else>
            <slot></slot>
        </span>
    </button>
</template>

<style scoped>
.button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.25s, border-color 0.25s, transform 0.1s;
    border: 1px solid transparent;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }

    &.primary {
        background-color: #f9f9f9;
        color: var(--color);
        border: 1px solid #ccc;

        &:hover {
            background-color: #e0e0e0;
        }

        &:focus,
        &:focus-visible {
            outline: 4px auto -webkit-focus-ring-color;
        }
    }

    &.md {
        padding-inline: 1.25rem;
        padding-block: 0.5rem;
    }
}
</style>
