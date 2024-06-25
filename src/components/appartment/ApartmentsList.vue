<template>
    <AppContainer>
        <slot name="title"></slot>
        <div class="apartments-list">
            <template v-for="apartment in items">
                <slot name="apartment" v-bind:apartment="apartment"></slot>
            </template>
        </div>
    </AppContainer>
</template>

<script>
import AppContainer from '../shared/AppContainer.vue'

    export default {
        name: 'ApartmentsList',
        components: {
            AppContainer,
        },
        props: {
            items: {
                type: Array,
                default: () => [],
            },
        },
    }
</script>

<style lang="scss" scoped>
.apartments-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
}
</style>