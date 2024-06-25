<template>
    <header class="header">
        <AppContainer>
            <div class="header__content">
                <AppLogo />
                <router-link v-if="isLoggedIn" class="header__link" :to="{ name: 'register-apartment' }">
                    Зареєструвати помешкання
                </router-link>
                <AccountActions v-if="isLoggedIn"/>
                <AuthActions v-else/>
            </div>
        </AppContainer>
    </header>
</template>

<script>
import AppContainer from '../components/shared/AppContainer.vue'
import AppLogo from './shared/AppLogo.vue';
import AuthActions from '../components/accountStatus/AuthActions.vue';
import AccountActions from '../components/accountStatus/AccountActions.vue'

export default {
    name: 'AppHeader',
    components: {
        AppContainer,
        AppLogo,
        AuthActions,
        AccountActions
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.auth.isLoggedIn;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables.scss';

.header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: $secondary-color;
    padding: 16px 0;
    z-index: 100;

    &__content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__link {
        position: absolute;
        margin-left: 180px;
        color: white;
        text-decoration: none;
        transition: color 0.4s;

    &:hover {
        color: $main-color;
    }
    }
}
</style>