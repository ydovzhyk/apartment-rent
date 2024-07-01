<template>
    <AppContainer class="profile">
        <MainTitle class="profile__title">Відредагуйте свої данні у профілі</MainTitle>
        <form class="profile__form" @submit.prevent="handleSubmit">
            <div class="profile__part">
                <RegularText tag="p" alignment="left">Ваш нікнейм</RegularText>
                <CustomInput ref="username" v-model="formData.username" :placeholder="formData.username"
                    autocomplete="title" name="username" :rules="titleRules" class="custom-input" width="300px" />
            </div>
            <div class="profile__part">
                <RegularText tag="p" alignment="left">Вкажіть контактну інформацію</RegularText>
                <div class="profile__part-address">
                    <CustomInput ref="ownerNameInput" v-model="formData.owner.name" :placeholder="nameOfUser"
                        autocomplete="ownerName" name="ownerName" :rules="ownerNameRules" class="custom-input"
                        width="300px" />
                    <CustomInput ref="ownerPhoneInput" v-model="formData.owner.phone" :placeholder="phone"
                        autocomplete="ownerPhone" name="ownerPhone" :rules="phoneRules" class="custom-input"
                        width="300px" />
                    <CustomInput ref="ownerEmailInput" v-model="formData.owner.email"
                        :placeholder="formData.owner.email" autocomplete="ownerEmail" name="ownerEmail"
                        :rules="emailRules" class="custom-input" width="300px" />
                </div>
            </div>
            <div class="profile__part">
                <RegularText tag="p" alignment="left">Додайте інформацію "Про себе"</RegularText>
                <CustomTextArea ref="nameInput" v-model="formData.aboutUser" :placeholder="aboutUser"
                    autocomplete="description" name="description" :rules="descrRules" class="custom-input"
                    width="100%" />
            </div>
            <div class="profile__part">
                <RegularText tag="p" alignment="left">Оновіть аватар</RegularText>
                <div class="profile__part-photo">
                    <div v-if="mainImageUrl" class="uploaded-image"
                        :style="{ backgroundImage: 'url(' + mainImageUrl + ')' }"></div>
                    <FormInputFile name="mainPhoto" accept="image/png, image/jpeg" :multiple="false" :single="true"
                        label="Завантажити фотографію аватара" @change="handleMainPhotoChange" />
                </div>
            </div>
            <div class="btn-wrapper">
                <ButtonVue class="btn-dark" type="submit" label="Оновити" height="49px">
                </ButtonVue>
            </div>
        </form>
    </AppContainer>
</template>

<script>
import AppContainer from '../shared/AppContainer.vue';
import MainTitle from '../shared/MainTitle.vue';
import RegularText from '../shared/RegularText.vue';
import CustomInput from '../shared/CustomInput.vue';
import CustomTextArea from '../shared/CustomTextArea.vue';
import ButtonVue from '../shared/ButtonVue.vue';
import FormInputFile from '../shared/FormInputFile.vue'
import {
    descrLimit,
    titleLimit,
    isRequired,
    phoneValidation,
    emailValidation,
    minTextLimit,
} from '../../utils/validationRules';
import { resizeImage } from '../../utils/imageUtils';
import store from '@/store';

export default {
    name: 'EditProfile',
    components: {
        AppContainer,
        MainTitle,
        RegularText,
        CustomInput,
        CustomTextArea,
        ButtonVue,
        FormInputFile,
    },
    data() {
        return {
            mainImageUrl: '',
            formData: {
                username: store.state.auth.user.username,
                aboutUser: store.state.auth.user.aboutUser || '',
                owner: {
                    email: store.state.auth.user.email,
                    name: store.state.auth.user.name || '',
                    phone: store.state.auth.user.phone || '',
                },
            },
        };
    },
    computed: {
        phone() {
            return this.$store.state.auth.user.phone ? this.$store.state.auth.user.phone : "телефон"
        },
        nameOfUser() {
            return this.$store.state.auth.user.name ? this.$store.state.auth.user.name : 'ім\'я'
        },
        aboutUser() {
            return this.$store.state.auth.user.aboutUser ? this.$store.state.auth.user.aboutUser : 'Про себе'
        },
        rules() {
            return {
                isRequired,
                descrLimit,
                titleLimit,
                phoneValidation,
                emailValidation,
                minTextLimit,
            };
        },
        descrRules() {
            return [this.rules.isRequired, this.rules.descrLimit(2000)];
        },
        titleRules() {
            return [this.rules.isRequired, this.rules.titleLimit(200)];
        },
        ownerNameRules() {
            return [this.rules.isRequired, this.rules.minTextLimit(2)];
        },
        emailRules() {
            return [this.rules.isRequired, this.rules.emailValidation];
        },
        phoneRules() {
            return [this.rules.isRequired, this.rules.phoneValidation];
        },
    },
    methods: {
        handleMainPhotoChange(file) {
            if (file) {
                resizeImage(file, 200, 200, (base64Data) => {
                    this.mainImageUrl = base64Data;
                });
            }
        },
        async handleSubmit() {
            const isFormValid = Object.values(this.$refs)
                .every(ref => ref.isValid);

            if (isFormValid) {
                const dataForUpload = {
                    username: this.formData.username,
                    userAvatar: this.mainImageUrl,
                    email: this.formData.owner.email,
                    phone: this.formData.owner.phone,
                    name: this.formData.owner.name,
                    aboutUser: this.formData.aboutUser
                }
                try {
                    this.$store.dispatch('technicial/startLoading');
                    await this.$store.dispatch('auth/editUserData', dataForUpload);
                    this.resetForm();
                } catch (error) {
                    this.$notify({
                        type: 'error',
                        title: "Помилка",
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
            this.mainImageUrl = '',
            this.formData = {
                username: store.state.auth.user.username,
                aboutUser: store.state.auth.user.aboutUser || '',
                owner: {
                    email: store.state.auth.user.email,
                    name: store.state.auth.user.name || '',
                    phone: store.state.auth.user.phone || '',
                },
            };
        },
    },
}
</script>

<style lang="scss" scoped>
.profile {
    &__form {
        margin-top: 30px;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 30px;
    }

    &__part {
        display: flex;
        flex-direction: column;
        gap: 10px
    }

    &__part-address {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    &__part-price {
        display: flex;
        flex-direction: row;
        gap: 30px;
    }

    &__part-photo {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 30px;
        align-items: left;
    }

    &__input {
        margin-bottom: 20px;
        width: 100%;
    }

    &__btn {
        margin-top: 15px;
        width: 100%;
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(5, 2fr);
        gap: 20px;
    }

    .uploaded-image {
        width: 220px;
        height: 220px;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .slider {
        position: relative;
        width: 100%;
        height: 350px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .slider-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 30px;
    }

    .slider-button {
        width: 50px;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background: none;
        border: none;
        z-index: 1000;
    }

    .slider-image {
        width: 580px;
        height: 350px;
    }

    .image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
    }

    .slider-icon {
        width: 50px;
        height: 50px;
        cursor: pointer;
    }

    .btn-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;
    }
}
</style>