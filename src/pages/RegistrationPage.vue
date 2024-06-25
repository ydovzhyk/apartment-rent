<template>
  <main class="registration">
    <AuthSection>
      <AppRegistration />
    </AuthSection>
  </main>
</template>

<script>
import AuthSection from '../components/auth/AuthSection.vue';
import AppRegistration from '../components/auth/registration/AppRegistration.vue';

export default {
  name: 'RegistrationPage',
  components: {
    AuthSection,
    AppRegistration,
  },
};
</script>

<style lang="scss" scoped></style>
