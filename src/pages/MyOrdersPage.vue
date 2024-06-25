<template>
  <main class="my-orders-page">
    <SectionWithHeaderSpacer>
      <AppContainer>
        <section class="my-orders-page__content">
          <MainTitle>Мої замовлення</MainTitle>
          <OrdersList />
          <!-- <OrdersList :orders="orders" /> -->
        </section>
      </AppContainer>
      <CircleLoader v-if="loading" width="90" height="90" color="#ff662d" />
    </SectionWithHeaderSpacer>
  </main>
</template>

<script>
import AppContainer from '../components/shared/AppContainer';
import SectionWithHeaderSpacer from '../components/shared/SectionWithHeaderSpacer';
import MainTitle from '../components/shared/MainTitle';
import OrdersList from '../components/my-orders/OrdersList';
// import { getOrders } from '../services/order.service';
import CircleLoader from '../components/shared/loaders/CircleLoader.vue';

export default {
  name: 'MyOrdersPage',
  components: {
    SectionWithHeaderSpacer,
    AppContainer,
    MainTitle,
    OrdersList,
    CircleLoader,
  },
  data() {
    return {
      // orders: [],
      loading: false,
    };
  },
  async created() {
    try {
      this.loading = true;
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
.my-orders-page {
  &__content {
    max-width: 730px;
    margin: 0 auto 100px;
  }
}
</style>
