<template>
    <main class="login">
        <AuthSection>
            <AppLogin />
        </AuthSection>
    </main>
</template>

<script>
import AppLogin from '../components/auth/login/AppLogin';
import AuthSection from '../components/auth/AuthSection.vue';

export default {
    name: 'LoginPage',
    components: {
        AppLogin,
        AuthSection,
    },
};
</script>

<style lang="scss" scoped></style>