<template>
    <button v-bind:type="type" v-bind="$attrs" :class="[styleType]" @click="handleClick"
        :style="{ height: height }">{{
        label }}</button>
</template>

<script>
export default {
    name: 'ButtonVue',
    props: {
        type: {
            type: String,
            default: 'button'
        },
        styleType: {
            type: String,
            default: 'btn-dark'
        },
        label: {
            type: String,
            default: 'Натисніть мене'
        },
        height: {
            type: String,
            default: '40px',
        },
    },
    methods: {
        handleClick() {
            // alert('Кнопка була натиснута!');
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.btn-dark {
    width: 220px;
    background-color: $main-color;
    border: 2px solid $main-color;
    color: $background-btn-second-color;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 1.3;
    cursor: pointer;
    font-family: Montserrat, sans-serif;
    transition: background-color $transition-duration $timing-function,
        color $transition-duration $timing-function,
        border-color $transition-duration $timing-function,
        box-shadow $transition-duration $timing-function;

    &:hover {
        background-color: $background-btn-second-color;
        border-color: $btn-border-color;
        box-shadow: $hover-box-shadow;
        color: $hover-btn-text;
    }
}

.btn-lights {
    width: 196px;
    height: 40px;
    background-color: $background-btn-second-color;
    border: 1px solid $btn-border-color;
    color: $second-text-color;
    border-radius: 10.3108px;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    cursor: pointer;
    font-family: Montserrat, sans-serif;
    transition: box-shadow $transition-duration $timing-function,
        background-color $transition-duration $timing-function,
        color $transition-duration $timing-function;

    &:hover {
        background-color: $background-btn-main-color;
        box-shadow: $hover-box-shadow;
        color: $btn-text-color;
    }
}
</style>