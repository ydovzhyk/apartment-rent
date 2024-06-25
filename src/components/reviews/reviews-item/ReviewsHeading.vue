<template>
  <div class="reviews-heading">
    <Avatar class="reviews-heading__avatar" />
    <div class="reviews-heading__content">
      <span class="reviews-heading__author">{{ author }}</span>
      <StarRating :rating="rating" />
    </div>
  </div>
</template>

<script>
import StarRating from '../../shared/StarRating.vue';
import Avatar from './RevieasAvatar';

export default {
  name: 'ReviewsHeading',
  components: {
    StarRating,
    Avatar,
  },
  props: {
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss" scoped>
.reviews-heading {
  display: flex;
  align-items: center;

  &__avatar {
    margin-right: 18px;
  }

  &__content {
    display: flex;
    flex-direction: column;
  }
}
</style>
