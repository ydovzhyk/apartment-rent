<template>
    <main class="apartment-page">
        <SectionWithHeaderSpacer>
            <AppContainer>
                <div v-if="apartment" class="apartment-page__content">
                    <ApartmentsMainInfo :apartment="apartment" />
                    <div class="apartment-page__additional-info">
                        <AprtmentsOwner
                            class="apartment-page__owner"
                            :owner="apartment.owner"
                        />
                        <ReviewsVisitor :reviews="reviewsList" />
                    </div>
                </div>
            </AppContainer>
        </SectionWithHeaderSpacer>
    </main>
</template>

<script>
import AppContainer from '../components/shared/AppContainer.vue';
import SectionWithHeaderSpacer from '../components/shared/SectionWithHeaderSpacer.vue';
import ApartmentsMainInfo from '../components/appartment/ApartmentsMainInfo.vue';
import AprtmentsOwner from '../components/appartment/AprtmentsOwner.vue';
import ReviewsVisitor from '../components/reviews/ReviewsVisitor.vue';
import reviewsList from '../components/reviews/reviews.json';

export default {
    name: 'ApartmentPage',
    components: {
        AppContainer,
        SectionWithHeaderSpacer,
        ApartmentsMainInfo,
        AprtmentsOwner,
        ReviewsVisitor,
    },
    computed: {
        reviewsList() {
            return reviewsList;
        },
        apartment() {
            return this.$store.state.apartment.apartment;
        },
    },
    async created() {
        try {
            this.$store.dispatch('technicial/startLoading');
            const { _id } = this.$route.params;
            await this.$store.dispatch('apartment/getApartmentById', _id);
        } catch (error) {
            this.$notify({
                type: 'error',
                title: "We received an error",
                text: error.message,
            });
        }
        finally {
            this.$store.dispatch('technicial/stopLoading');
        }
    },
};
</script>

<style lang="scss" scoped>
.apartment-page {
    padding-bottom: 55px;

    &__content {
        display: flex;
        align-items: flex-start;
    }

    &__additional-info {
        margin-left: 30px;
        max-width: 350px;
        flex-grow: 0;
        flex-shrink: 1;
    }
}
</style>