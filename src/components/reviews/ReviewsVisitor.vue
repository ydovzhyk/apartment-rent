<template>
  <section class="reviews">
    <div class="reviews__heading">
      <h2 class="reviews__title">Сумарний рейтинг</h2>
      <div class="reviews__rating">
        <span>{{ amountOfReviews }} відгук(ів)</span>
        <StarRating :ranking="totalRanking" />
      </div>
    </div>
    <ReviewsItem v-for="review in currentReviews" :key="review.author" :review="review" />
    <button @click="toggleReviews" class="reviews__show-more">
      {{ buttonText }}
    </button>
  </section>
</template>

<script>
import ReviewsItem from './reviews-item'
import StarRating from '../shared/StarRating'

export default {
  name: 'ReviewsVisitor',
  components: {
    ReviewsItem,
    StarRating,
  },
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      reviewsLimit: 2,
    }
  },
  computed: {
    totalRanking() {
      const total = this.reviews.reduce((acc, review) => acc + review.ranking, 0)

      return total / this.reviews.length
    },
    amountOfReviews() {
      return this.reviews.length
    },
    currentReviews() {
      return this.reviews.slice(0, this.reviewsLimit)
    },
    buttonText() {
      return this.reviewsLimit === this.reviews.length
        ? 'Згорнути'
        : 'Читати ще...'
    },
  },
  methods: {
    toggleReviews() {
      if (this.reviewsLimit === this.reviews.length) {
        this.reviewsLimit = 2
        return
      }

      this.reviewsLimit = this.reviews.length
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.reviews {
  margin-top: 20px;
  background: $card-bg;
  padding: 0 2px;

  &__heading {
    padding: 20px 20px 10px;
  }

  &__title {
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__rating {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__show-more {
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    padding: 12px;
    font-family: inherit;
    font-size: 16px;
  }
}
</style>
