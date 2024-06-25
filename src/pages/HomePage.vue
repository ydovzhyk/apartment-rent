<template>
  <main class="homepage">
    <SectionWithHeaderSpacer>
    <AppContainer>
      <ApartmentsFilterForm @submit="updateData"/>
    </AppContainer>
    <AppContainer>
      <p v-if="!apartments.length">За вашим пошуком не знайдено квартир</p>
      <ApartmentsList v-else :items="apartments">
        <template v-slot:apartment="{ apartment }">
          <ApartmentsItem
            :_id="apartment._id"
            :description="apartment.description"
            :ranking="apartment.ranking"
            :mainImage="apartment.mainImage"
            :price="apartment.price"
          />
        </template>
      </ApartmentsList>
      <AppPagination 
      v-if="apartments.length > 0" 
        :totalPages="totalPage"
        :currentPage="currentPage"
        @pageChange="handlePageChange" />
    </AppContainer>
    </SectionWithHeaderSpacer>
  </main>
</template>

<script>
import ApartmentsList from '../components/appartment/ApartmentsList.vue';
import ApartmentsItem from '../components/appartment/ApartmentsItem.vue';
import ApartmentsFilterForm from '../components/appartment/ApartmentsFilterForm.vue';
import AppContainer from '../components/shared/AppContainer.vue';
import SectionWithHeaderSpacer from '@/components/shared/SectionWithHeaderSpacer.vue';
import AppPagination from '../components/shared/AppPagination';


export default {
  name: 'HomePage',
  components: {
    ApartmentsList,
    ApartmentsItem,
    ApartmentsFilterForm,
    AppContainer,
    SectionWithHeaderSpacer,
    AppPagination,
  },
  data() {
    return {
      text: '',
      selectedItem: '',
      filters: {
        city: '',
        price: ''
      }
    }
  },
  computed: {
     apartments() {
      return this.$store.state.apartment.apartments;
    },
    totalPage() {
      return this.$store.state.apartment.totalPage;
    },
    currentPage() {
      return this.$store.state.apartment.currentPage;
    }
  },
  async created() {
    await this.loadApartments(this.currentPage);
  },
  methods: {
    async loadApartments(page) {
      try {
        this.$store.dispatch('technicial/startLoading');
        const payload = { page: page};
        await this.$store.dispatch('apartment/getApartmentsListData', payload);
      } catch (error) {
        this.$notify({
          type: 'error',
          title: "We received an error",
          text: error.message,
        });
      } finally {
        this.$store.dispatch('technicial/stopLoading');
      }
    },
    handlePageChange(page) {
      this.loadApartments(page);
    },
    async updateData({ city, price }) {
      if (city !== undefined && price !== undefined) {
        try {
          this.$store.dispatch('technicial/startLoading');
          const payload = { page: this.currentPage, city, price };
          await this.$store.dispatch('apartment/getApartmentsListData', payload);
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
      } else {
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.apartments-filter {
  margin-bottom: 40px;
}
</style>
