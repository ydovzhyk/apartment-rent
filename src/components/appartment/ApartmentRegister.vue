<template>
    <AppContainer class="register">
        <MainTitle class="register__title">Реєстрація помешканя</MainTitle>
        <form class="register__form" @submit.prevent="handleSubmit">
            <div class="register__part">
                <RegularText tag="p" alignment="left">Вкажіть назву вашого житла</RegularText>
                <CustomInput ref="nameInput" v-model="formData.title" placeholder="Назва помешкання"
                    autocomplete="title" name="title" :rules="titleRules" class="custom-input" width="300px" />
            </div>
            <div class="register__part">
                <RegularText tag="p" alignment="left">Вкажіть адресу</RegularText>
                <div class="register__part-address">
                    <CustomSelect :items="cities" v-model="formData.location.city" class="custom-select"
                        width="334px" />
                    <CustomInput ref="streetInput" v-model="formData.location.street" placeholder="вулиця"
                        autocomplete="street" name="street" :rules="streetRules" class="custom-input" width="300px" />
                    <CustomInput ref="buildingInput" v-model="formData.location.building" placeholder="будинок"
                        autocomplete="building" name="building" :rules="buildingRules" class="custom-input"
                        width="90px" />
                    <CustomInput ref="apartmentInput" v-model="formData.location.apartment" placeholder="квартира"
                        autocomplete="apartment" name="apartment" class="custom-input" width="90px" />
                </div>
            </div>
            <div class="register__part">
                <RegularText tag="p" alignment="left">Додайте детальний опис житла</RegularText>
                <CustomTextArea ref="nameInput" v-model="formData.descr" placeholder="Description"
                    autocomplete="description" name="description" :rules="descrRules" class="custom-input"
                    width="100%" />
            </div>
            <div class="register__part">
                <RegularText tag="p" alignment="left">Оберіть додаткові опції</RegularText>
                <div class="services-grid">
                    <ServicesInfo v-for="service in services" :key="service.name + servicesKey" :service="service"
                        @toggle-selection="addToServiceList" />
                </div>
            </div>
            <div class="register__part">
                <RegularText tag="p" alignment="left">Вкажіть контактну інформацію</RegularText>
                <div class="register__part-address">
                    <CustomInput ref="ownerNameInput" v-model="formData.owner.name" placeholder="Im'я"
                        autocomplete="ownerName" name="ownerName" :rules="ownerNameRules" class="custom-input"
                        width="300px" />
                    <CustomInput ref="ownerPhoneInput" v-model="formData.owner.phone" placeholder="телефон"
                        autocomplete="ownerPhone" name="ownerPhone" :rules="phoneRules" class="custom-input"
                        width="300px" />
                    <CustomInput ref="ownerEmailInput" v-model="formData.owner.email" placeholder="email"
                        autocomplete="ownerEmail" name="ownerEmail" :rules="emailRules" class="custom-input"
                        width="300px" />
                </div>
            </div>
            <div class="register__part">
                <RegularText tag="p" alignment="left">Вкажіть можливість розселення</RegularText>
                <div class="register__part-address">
                    <CustomInput ref="accommodationRooms" v-model="formData.accommodation.livingRooms"
                        placeholder="к-ть житлових кімнат" autocomplete="accommodationRooms" name="accommodationRooms"
                        :rules="qtyRules" class="custom-input" width="300px" />
                    <CustomInput ref="accommodationAdults" v-model="formData.accommodation.qtyAdults"
                        placeholder="к-ть розміщення дорослих" autocomplete="accommodationAdults"
                        name="accommodationAdults" :rules="qtyRules" class="custom-input" width="300px" />
                    <CustomInput ref="accommodationChildrens" v-model="formData.accommodation.qtyChildrens"
                        placeholder="к-ть розміщення дітей" autocomplete="accommodationChildrens"
                        name="accommodationChildrens" :rules="qtyRules" class="custom-input" width="300px" />
                </div>
            </div>
            <div class="register__part">
                <RegularText tag="p" alignment="left">Вкажіть ціну</RegularText>
                <div class="register__part-price">
                    <CustomInput ref="priceValueInput" v-model="formData.price.value" placeholder="ціна за добу"
                        autocomplete="priceValue" name="priceValue" :rules="priceRules" class="custom-input"
                        width="120px" />
                    <CustomSelect :items="currencies" v-model="formData.price.currency" class="custom-select"
                        width="95px" />
                </div>
            </div>
            <div class="register__part">
                <RegularText tag="p" alignment="left">Додайте фотографії</RegularText>
                <div class="register__part-photo">
                    <div v-if="mainImageUrl" class="uploaded-image"
                        :style="{ backgroundImage: 'url(' + mainImageUrl + ')' }"></div>
                    <FormInputFile name="mainPhoto" accept="image/png, image/jpeg" :multiple="false" :single="true"
                        label="Завантажити основну фотографію" @change="handleMainPhotoChange" />
                </div>
            </div>
            <div class="register__part">
                <div class="register__part-photo">
                    <div v-if="otherImageUrls.length > 0" class="slider">
                        <button type="button" class="slider-button" :style="{ marginLeft: '20px' }"
                            :disabled="!isPrevButtonActive">
                            <img v-if="isPrevButtonActive" src="@/assets/img/create_appartment/left.svg"
                                alt="Previous Slide" class="slider-icon" @click="prevSlide">
                            <img v-if="!isPrevButtonActive" src="@/assets/img/create_appartment/left_inactive.svg"
                                alt="Previous Slide" class="slider-icon" @click="prevSlide">
                        </button>
                        <div class="slider-container">
                            <div v-for="(image, index) in displayedImages" :key="index" class="slider-image">
                                <div class="image" :style="{ backgroundImage: 'url(' + image + ')' }"></div>
                            </div>
                        </div>
                        <button type="button" class="slider-button" :style="{ marginRight: '20px' }"
                            :disabled="!isNextButtonActive">
                            <img v-if="isNextButtonActive" src="@/assets/img/create_appartment/right.svg"
                                alt="Next Slide" class="slider-icon" @click="nextSlide">
                            <img v-if="!isNextButtonActive" src="@/assets/img/create_appartment/right_inactive.svg"
                                alt="Next Slide" class="slider-icon" @click="nextSlide">
                        </button>
                    </div>
                    <FormInputFile name="otherPhotos" accept="image/png, image/jpeg" :multiple="true" :single="false"
                        label="Завантажити інші фотографії" @multipleChange="handleOtherPhotoChange" />
                </div>
            </div>
            <div class="btn-wrapper">
                <ButtonVue class="btn-dark" type="submit" label="Зареєструвати" :loading="loading" height="49px">
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
import CustomSelect from '../shared/CustomSelect.vue';
import CustomTextArea from '../shared/CustomTextArea.vue';
import ButtonVue from '../shared/ButtonVue.vue';
import ServicesInfo from '../shared/ServicesInfo.vue';
import FormInputFile from '../shared/FormInputFile.vue'
import {
    descrLimit,
    titleLimit,
    isRequired,
    phoneValidation,
    emailValidation,
    minTextLimit,
    numberValidation,
} from '../../utils/validationRules';
import { resizeImage } from '../../utils/imageUtils';

    export default {
        name: 'ApartmentRegister',
        components: {
            AppContainer,
            MainTitle,
            RegularText,
            CustomInput,
            CustomSelect,
            CustomTextArea,
            ButtonVue,
            ServicesInfo,
            FormInputFile,
        },
        data() {
            return {
                serviceList: [],
                mainImageUrl: '',
                otherImageUrls: [],
                currentSlide: 0,
                servicesKey: 0, // Додаємо ключ для перемалювання компонента Сервісів при скиданні форми
                formData: {
                    title: '',
                    location: {
                        city: 'Київ',
                        street: '',
                        building: '',
                        apartment: '',
                    },
                    accommodation: {
                        livingRooms: '',
                        qtyAdults: '', 
                        qtyChildrens: '', 
                    },
                    descr: '',
                    owner: {
                        email: '',
                        name: '',
                        phone: '',
                    },
                    price: {
                        value: '',
                        currency: 'UAH',
                    },
                    imageContainer: {
                        mainImageName: '',
                        imageFiles: [],
                    },
                },
            };
        },
    computed: {
        isPrevButtonActive() {
            return this.currentSlide > 0;
        },
        isNextButtonActive() {
            return (this.currentSlide + 1) * 2 < this.otherImageUrls.length;
        },
        cities() {
            const citiesFromStore = this.$store.state.technicial.cities;
            const citiesWithoutFirst = citiesFromStore.slice(1); 
            return [{ value: "Київ", label: "Київ", selected: false }, ...citiesWithoutFirst];
        },
        currencies() {
            const currenciesFromStore = this.$store.state.technicial.currency;
            const currenciesWithoutFirst = currenciesFromStore.slice(1);
            return [{ value: "UAH", label: "UAH", selected: false }, ...currenciesWithoutFirst];
        },
        services() {
            return this.$store.state.technicial.services;
        },
        rules() {
            return {
                isRequired,
                descrLimit,
                titleLimit,
                phoneValidation,
                emailValidation,
                minTextLimit,
                numberValidation,
            };
        },
        descrRules() {
            return [this.rules.isRequired, this.rules.descrLimit(2000)];
        },
        titleRules() {
            return [this.rules.isRequired, this.rules.titleLimit(200)];
        },
        streetRules() {
            return [this.rules.isRequired, this.rules.descrLimit(50)];
        },
        buildingRules() {
            return [this.rules.isRequired, this.rules.descrLimit(4)];
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
        priceRules() {
            return [this.rules.isRequired, this.rules.descrLimit(4)];
        },
        qtyRules() {
            return [this.rules.isRequired, this.rules.numberValidation];
        },
        displayedImages() {
            // Відображаємо по дві картинки одночасно
            const startIndex = this.currentSlide * 2;
            return this.otherImageUrls.slice(startIndex, startIndex + 2);
        }
    },
    methods: {
        resetSelectedServices() {
            this.serviceList = [];
            this.services.forEach(service => {
                service.isSelected = false;
            });
        },
        prevSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
            }
        },
        nextSlide() {
            if ((this.currentSlide + 1) * 2 < this.otherImageUrls.length) {
                this.currentSlide++;
            }
        },
        addToServiceList(serviceName) {
            const index = this.serviceList.indexOf(serviceName);
            if (index === -1) {
                this.serviceList.push(serviceName);
            } else {
                this.serviceList.splice(index, 1);
            }
        },
        handleMainPhotoChange(file) {
            if (file) {
                this.formData.imageContainer.mainImageName = file.name;
                this.formData.imageContainer.imageFiles.push(file);
                resizeImage(file, 500, 500, (base64Data) => {
                    this.mainImageUrl = base64Data;
                });
            }
        },
        handleOtherPhotoChange(files) {
            Array.from(files).forEach(file => {
                this.formData.imageContainer.imageFiles.push(file);
                resizeImage(file, 500, 500, (base64Data) => {
                    this.otherImageUrls.push(base64Data);
                });
            });
        },
        async handleSubmit() {
            const isFormValid = Object.values(this.$refs)
                .every(ref => ref.isValid);
            if (isFormValid) {
                const dataForUpload = new FormData();
                dataForUpload.append('title', this.formData.title);
                dataForUpload.append('location', JSON.stringify(this.formData.location));
                dataForUpload.append('description', this.formData.descr);
                dataForUpload.append('owner', JSON.stringify(this.formData.owner));
                dataForUpload.append('accommodation', JSON.stringify(this.formData.accommodation));
                dataForUpload.append('price', JSON.stringify(this.formData.price));
                dataForUpload.append('servicesList', this.serviceList);
                dataForUpload.append('mainImage', this.formData.imageContainer.mainImageName);
                this.formData.imageContainer.imageFiles.forEach(file => {
                    dataForUpload.append('files', file);
                });
                try {
                    this.$store.dispatch('technicial/startLoading');
                    await this.$store.dispatch('apartment/apartmentCreate', dataForUpload);
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
            this.serviceList = [],
            this.mainImageUrl = '',
            this.otherImageUrls = [],
            this.currentSlide = 0,
            this.formData = {
                title: '',
                location: {
                    city: 'Київ',
                    street: '',
                    building: '',
                    apartment: '',
                },
                descr: '',
                owner: {
                    email: '',
                    name: '',
                    phone: '',
                },
                accommodation: {
                    livingRooms: '',
                    qtyAdults: '',
                    qtyChildrens: '',
                },
                price: {
                    value: '',
                    currency: 'UAH',
                },
                imageContainer: {
                    mainImageName: '',
                    imageFiles: [],
                },
            };
            this.servicesKey++;//Використовуємо для перемалювання Сервісів з початковим станом
        },
    },
}
</script>

<style lang="scss" scoped>

.register {
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
    width: 580px;
    height: 350px;
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