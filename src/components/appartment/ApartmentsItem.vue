<template>
    <div class="apartments-item">
        <div class="apartments-item__inner">
            <img :src="mainImage" alt="" class="apartments-item__photo" />
            <div class="apartments-item__content">
                <p class="apartments-item__description">
                    {{ description }}
                </p>
                <div class="apartments-item__rating">
                    <StarRating :ranking="ranking" />
                </div>
                <p class="apartments-item__price">{{ price.currency }} {{ price.value }}</p>
                <router-link :to="{ name: 'apartment', params: { _id } }"
                    class="apartments-item__link" @click="clearData"></router-link>
            </div>
        </div>
    </div>
</template>


<script>
import StarRating from '../shared/StarRating.vue'
    
    export default {
        name: 'ApartmentsItem',
        components: {
            StarRating,
        },
        props: {
            _id: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                default: '',
            },
            ranking: {
                type: Number,
                default: 0,
            },
            price: {
                value: {
                    type: String,
                    default: '',
                },
                currency: {
                    type: String,
                    required: true,
                    default: 'UAH',
                }
            },
            mainImage: {
                type: String,
                default: '',
            },
    },
        methods: {
        clearData() {
            this.$store.commit('apartment/clearApartment');
        },
    },
    }
</script>

<style lang="scss" scoped>
.apartments-item {
    position: relative;

    &__inner {
        position: relative;
    }

    &__content {
        position: relative;
        padding: 20px;
        opacity: 0;
        transition: opacity 0.4s;
        background: rgba(#0f1d2d, 0.7);
        min-height: 200px;
        color: #fff;
        text-align: left;
        line-height: 1.4;
        cursor: pointer;
        z-index: 1;

        &:hover {
            opacity: 1;
        }
    }

    &__description {
        margin-bottom: 20px;
        max-height: calc(1em * 1.4 * 3);
        overflow: hidden;
    }

    &__rating {
        margin-bottom: 20px;
    }

    &__price {
        font-size: 20px;
        font-weight: 600;
    }

    &__photo {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__link {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}

</style>