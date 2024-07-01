<template>
    <main class="my-profile-page">
        <SectionWithHeaderSpacer>
            <EditProfile />
        </SectionWithHeaderSpacer>
    </main>
</template>

<script>
import SectionWithHeaderSpacer from '../components/shared/SectionWithHeaderSpacer';
import EditProfile from '../components/editProfile/EditProfile.vue'


export default {
    name: 'MyProfilePage',
    components: {
        SectionWithHeaderSpacer,
        EditProfile,
    },
    data() {
        return {
            // orders: [],
            loading: false,
        };
    },
    async created() {
        try {
            await this.$store.dispatch('orders/getOrdersData');
            // const { data } = await getOrders();
            // this.orders = data;
            this.loading = false;
        } catch (error) {
            this.loading = false;
            this.$notify({
                type: 'error',
                title: 'Відбулась помилка',
                text: error.message,
            });
        }
    },
};
</script>

<style lang="scss" scoped>
.my-profile-page {
    &__content {
        max-width: 730px;
        margin: 0 auto 100px;
    }
    &__content-border {
        widows: 100%;
        border: 1px solid red;
    }
}
</style>