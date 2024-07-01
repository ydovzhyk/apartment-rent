<template>
  <AuthContainer class="login">
    <MainTitle class="login__title">Login</MainTitle>
    <form class="login__form" @submit.prevent="handleSubmit">
      <CustomInput
        v-model="formData.email"
        placeholder="Email"
        autocomplete="email"
        name="email"
        :rules="emailRules"
        class="login__input"
      />
      <CustomInput
        v-model="formData.password"
        placeholder="Password"
        autocomplete="current-password"
        type="password"
        name="password"
        :rules="passwordRules"
        class="login__input"
      />
      <ButtonVue class="btn-dark" type="submit" label="Вхід"></ButtonVue>
    </form>
  </AuthContainer>
</template>

<script>
import CustomInput from '../../shared/CustomInput.vue';
import ButtonVue from '../../shared/ButtonVue.vue';
import AuthContainer from '../AuthContainer.vue';
import MainTitle from '../../shared/MainTitle.vue';
import {
  emailValidation,
  passwordValidation,
  isRequired,
} from '../../../utils/validationRules';

export default {
  name: 'AppLogin',
  components: {
    CustomInput,
    ButtonVue,
    AuthContainer,
    MainTitle,
  },
  data() {
    return {
      formData: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    rules() {
      return {
        emailValidation,
        passwordValidation,
        isRequired,
      };
    },
    emailRules() {
      return [this.rules.isRequired, this.rules.emailValidation];
    },
    passwordRules() {
      return [this.rules.isRequired];
    },
  },
  methods: {
    async handleSubmit() {
      const isFormValid = Object.values(this.$refs)
        .every(ref => ref.isValid);
      if (isFormValid) {
        try {
          this.$store.dispatch('technicial/startLoading');
          await this.$store.dispatch('auth/login', this.formData);
          this.resetForm();
          this.$router.push({ name: 'homepage' });
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
    resetForm() {
      this.formData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  &__form {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr; 
    grid-gap: 30px; 
    justify-items: center;
  }

  &__title {
    text-align: center;
  }

  &__input {
    margin-bottom: 20px;
    width: 100%;
  }

  &__btn {
    margin-top: 15px;
    width: 100%;
  }
}
</style>
