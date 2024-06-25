<template>
  <div id="app">
    <AppNotification />
    <div class="content">
      <AppHeader />
      <div class="router">
        <router-view></router-view>
      </div>
      <AppFooter />
    </div>
    <CircleLoader v-if="loading" width="90" height="90" color="#ff662d" />
  </div>
</template>

<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import AppNotification from './components/shared/AppNotification.vue';
import CircleLoader from './components/shared/loaders/CircleLoader.vue';

export default {
  name: 'App',
  components: {
    AppFooter,
    AppHeader,
    AppNotification,
    CircleLoader,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    messageApartment() {
      return this.$store.state.apartment.message;
    },
    loading() {
      return this.$store.state.technicial.loading;
    }
  },
  watch: {
    messageApartment(newMessage) {
      if (newMessage) {
        this.$notify({
          type: "info",
          title: `${newMessage}`,
        });
        this.$store.commit("apartment/clearMessage");
      }
    }
  },
  async mounted() {
    try {
      this.$store.dispatch('technicial/startLoading');
      const authData = await JSON.parse(localStorage.getItem("apartment-rent-auth"));
      if (authData && authData.accessToken) {
        const payload = { accessToken: authData.accessToken, refreshToken: authData.refreshToken, sid: authData.sid };
        await this.$store.dispatch('auth/getUser', payload);
      } else {
        return;
      }
    } catch (error) {
      this.$notify({
        type: 'info',
        title: 'Увійдіть до вашого облікового запису знову',
      });
    }
    finally {
      this.$store.dispatch('technicial/stopLoading');
    }
  },
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  font-family: Montserrat, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.content {
  position: absolute;
  top: 0;
  left: 0px;
  width: 100%;
  flex-grow: 1;
}

.router {
  min-height: calc(100vh - 30px);
}

</style>
