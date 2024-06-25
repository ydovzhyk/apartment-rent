<template>
  <div class="orders-list">
    <p v-if="!this.orders.length">У вас не має замовлень</p>
    <!-- <p v-if="!orders.length">У вас не має замовлень</p> -->
      <template v-else>
        <OrdersItem
          v-for="order in this.orders"
          :key="order.id"
          :order="order.apartment"
        />
    </template>
  </div>
</template>

<script>
import OrdersItem from './OrdersItem';

export default {
  name: 'OrdersList',
  components: {
    OrdersItem,
  },
  // props: {
  //   orders: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  computed: {
    orders() {
      return this.$store.state.orders.orders;
    },
  }
};
</script>

<style lang="scss" scoped>
.orders-list {
  margin-top: 20px;
}
</style>
