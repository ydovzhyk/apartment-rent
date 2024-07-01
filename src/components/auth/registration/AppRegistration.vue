<template>
  <AuthContainer class="registration">
    <MainTitle class="registration__title">Registration</MainTitle>
    <form class="registration__form" @submit.prevent="handleSubmit">
      <CustomInput
        ref="nameInput"
        v-model="formData.username"
        placeholder="Name"
        autocomplete="username"
        name="username"
        :rules="nameRules"
        class="registration__input"
      />
      <CustomInput
        ref="nameInput"
        v-model="formData.email"
        placeholder="Email"
        autocomplete="email"
        name="email"
        :rules="emailRules"
        class="registration__input"
      />
      <CustomInput
        ref="nameInput"
        v-model="formData.password"
        placeholder="Password"
        autocomplete="current-password"
        type="password"
        name="password"
        :rules="passwordRules"
        class="registration__input"
      />
      <CustomInput
        ref="nameInput"
        v-model="formData.confirmPassword"
        placeholder="Confirm password"
        autocomplete="current-password"
        type="password"
        name="password"
        :rules="confirmPassword"
        class="registration__input"
      />
      <ButtonVue class="btn-dark" type="submit" label="Зареєструватися"></ButtonVue>
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
import avatarImage from '../../../assets/img/Avatar/avatar.svg';

export default {
  name: 'AppRegistration',
  components: {
    CustomInput,
    ButtonVue,
    AuthContainer,
    MainTitle,
  },
  data() {
    return {
      userAvatar: '',
      formData: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
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
    nameRules() {
      return [this.rules.isRequired];
    },
    emailRules() {
      return [this.rules.isRequired, this.rules.emailValidation];
    },
    passwordRules() {
      return [this.rules.isRequired, this.rules.passwordValidation];
    },
    confirmPassword() {
      return [
        (val) => ({
          hasPassed: val === this.formData.password,
          message: 'Паролі не співпадають',
        }),
      ];
    },
  },
  methods: {
    async convertImageToBase64(imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    },
    async handleSubmit() {
      this.$store.dispatch('technicial/startLoading');
      const isFormValid = Object.values(this.$refs)
        .every(ref => ref.isValid);

      if (isFormValid) {
        const { username, email, password } = this.formData;
        const userAvatar = await this.convertImageToBase64(avatarImage);
        try {
          await this.$store.dispatch('auth/registerUser', { username, email, password, userAvatar });
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
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.registration {
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
