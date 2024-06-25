<template>
    <SectionWithHeaderSpacer>
        <ApartmentRegister />
    </SectionWithHeaderSpacer>
</template>

<script>
import ApartmentRegister from '../components/appartment/ApartmentRegister.vue';
import SectionWithHeaderSpacer from '../components/shared/SectionWithHeaderSpacer';
    export default {
        name: 'RegisterApartmentPage',
        components: {
            ApartmentRegister,
            SectionWithHeaderSpacer,
        }
    }
</script>

<style lang="scss" scoped>

</style>