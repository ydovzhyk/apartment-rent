<template>
  <div class="account-actions" @mouseover="open" @mouseleave="closeHower">
    <div class="account-actions__info-box">
      <div class="account-actions__info-options">
        <router-link class="account-actions__link" :to="{ name: 'my-orders' }">
          <div class="account-actions__info-options-booking">
          </div>
        </router-link>
        <router-link class="account-actions__link" :to="{ name: 'my-orders' }">
          <div class="account-actions__info-options-message">
            <div class="account-actions__info-count">
              <span class="account-actions__info-count-text">14</span>
            </div>
          </div>
        </router-link>
      </div>
      <router-link class="account-actions__link" :to="{ name: 'my-profile' }">
        <span class="account-actions__info-link-text">Привіт, {{ userName }}</span>
        <div class="account-actions__icon-wrapper" :style="backgroundImageStyle">
        </div>
      </router-link>
      <img src="@/assets/img/info/vertical-line.png" alt="Vertical-line" class="account-actions__devider-icon">
      <button @click="handleLogout" class="account-actions__logout">
        <img src="@/assets/img/info/exit.png" alt="Exit" class="account-actions__info-icon">
        <span class="account-actions__info-icon-text">Вихід</span>
      </button>
    </div>
    <ul v-show="isOpen" class="account-actions__list">
      <li class="account-actions__item">
        <router-link class="account-actions__link" :to="{ name: 'my-orders' }">Мої замовлення</router-link>
      </li>
      <li class="account-actions__item">
        <button @click="handleLogout" class="account-actions__logout">
          <div class="account-actions__info">
            <img src="@/assets/img/info/exit.png" alt="Exit-regular" class="account-actions__info-icon">
          </div>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AccountActions',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    async handleLogout() {
      try {
        this.$store.dispatch('technicial/startLoading');
        await this.$store.dispatch('auth/logout');
        this.$router.push({ name: 'homepage' });
      } catch (error) {
        this.$notify({
          type: 'error',
          title: 'Не вдалося вийти з акаунту',
        });
      } finally {
        this.$store.dispatch('technicial/stopLoading');
      }
    },
  },
  computed: {
    userName() {
      return this.$store.state.auth.user.username;
    },
    avatarUrl() {
      return this.$store.state.auth.user.userAvatar;
    },
    backgroundImageStyle() {
      return {
        backgroundImage: `url(${this.avatarUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '40px',
        height: '40px' 
      };
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';

.account-actions {
  position: relative;
  display: inline-flex;
  padding: 5px 0;
  color: #fff;

  &__info-box {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }

  &__info-options {
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  &__info-options-booking {
    position: relative;
    width: 30px;
    height: 30px;
    background-image: url('@/assets/img/info/booking.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transition: background-image 0.4s;
  }

  &__info-options-booking:hover {
    background-image: url('@/assets/img/info/booking_1.png');
  }

   &__info-options-message {
    position: relative;
    width: 30px;
    height: 30px;
    background-image: url('@/assets/img/info/message.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    transition: background-image 0.4s;
  }

  &__info-options-message:hover {
    background-image: url('@/assets/img/info/message_1.png');
  }

  &__info-count {
    position: absolute;
    right: -10px;
    top: -10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
  }

  &__info-count-text {
    color: $btn-text-color;
    font-size: 13px;
  }

  &__icon {
    transition: fill 0.4s;
    fill: currentColor;
    width: 16px;
    height: 18px;
  }

  &__item {
    margin-bottom: 5px;
    transition: color 0.4s;
    &:hover {
      color: $main-color;
    }
  }

  &__link {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: inherit;
  }

  &__logout {
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    background: none;
    border: none;
    font-size: inherit;
    color: inherit;
    font-family: inherit;
    cursor: pointer;
  }

  &__icon-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #fff;
  }

  &__avatar-icon {
    width: 30px;
    height: 35px;
    fill: #fff;
  }

  &__icon-wrapper-info {
    display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 37px;
      height: 37px;
      border-radius: 50%;
      border: 2px solid #fff;
  }
  
  &__info-icon {
    width: 30px;
    height: 30px;
  }
  
  &__devider-icon {
    width: 20px;
    height: 40px;
  }

  &__info-icon-text {
    transition: color 0.4s;
  }

  &__info-link-text {
    transition: color 0.4s;
  }
}

.account-actions__logout:hover .account-actions__info-icon-text {
  color: $main-color;
}
.account-actions__link:hover .account-actions__info-link-text {
  color: $main-color;
}
</style>
