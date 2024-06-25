<template>
  <article class="apartment-main-info">
    <div class="apartment-main-info__heading">
      <div class="apartment-main-info__title-price">
        <MainTitle :level="1">{{ apartment.title }}:</MainTitle>
        <div class="apartment-main-info__price">
          <RegularText tag="p" alignment="left">{{ apartment.price.value }}</RegularText>
          <RegularText tag="p" alignment="left">{{ apartment.price.currency }}</RegularText>
        </div>
      </div>
      <StarRating :ranking="apartment.ranking" />
    </div>
    <div class="apartment-main-info__address">
      <RegularText tag="p" alignment="left">
        {{ formattedAddress }}
      </RegularText>
    </div>
    <div class="apartment-main-info__photoContainer">
      <div class="apartment-main-info__photoContainerMain">
        <img :src="apartment.mainImage" alt="Основна фотографія" class="apartment-main-info__photoMain"
          @click="openModalWithImages(apartment.mainImage)" />
        <div class="apartment-main-info__photoOtherRight">
          <img v-for="(image, index) in apartment.imagesLink.slice(0, 2) " :key="index" :src="image"
            alt="Додаткова фотографія" class="apartment-main-info__photoRight" @click="openModalWithImages(image)" />
        </div>
      </div>
      <div class="apartment-main-info__photoOtherBottom">
        <div v-for="(image, index) in apartment.imagesLink.slice(2, 5) " :key="index" class="photo-wrapper">
          <img :src="image" alt="Додаткова фотографія" class="apartment-main-info__photoRight"
            @click="openModalWithImages(image)" />
          <div v-if="index === 2 && remainingImagesCount > 0" class="apartment-main-info__photoText">
            ще + {{ remainingImagesCount }} {{ getPhotoLabel(remainingImagesCount) }}
          </div>
        </div>
      </div>
    </div>
    <div class="apartment-main-info__servicesContainer">
      <MainTitle :level="2">Найпопулярніші зручності та послуги:</MainTitle>
      <div class="services-grid">
        <ServicesInfo v-for="service in localServices" :key="service.name" :service="service" :selectable="false" />
      </div>
    </div>
    <RegularText tag="p" alignment="left">{{ apartment.description }}</RegularText>
    <ApartmentBooking :apartmentId="apartment._id"></ApartmentBooking>

    <div class="apartment-main-info__textWrapper">
      <RegularText v-if="!availability.сhecked" tag="p" alignment="left">Перед тим як забронювати помешкання, перевірте
        його наявність.</RegularText>
      <RegularText v-if="!isLoggedIn" tag="p" alignment="left">Забронювати помешкання можуть тільки зареєстровані
        користувачі.</RegularText>
      <div v-if="availability.сhecked" class="apartment-main-info__alertTextWrapper">
        <img v-if="availability.status" :src="okIcon" alt="Іконка результату доступно"
          class="apartment-main-info__icon" />
        <RegularText v-if="availability.status" tag="p" alignment="left">
          {{ bookingMessageOk }}
        </RegularText>
        <img v-if="!availability.status" :src="noIcon" alt="Іконка результату не доступно"
          class="apartment-main-info__icon" />
        <RegularText v-if="!availability.status" tag="p" alignment="left">
          {{ bookingMessageNo }}
        </RegularText>
      </div>
    </div>

    <div v-if="isLoggedIn" class="apartment-main-info__btn">
      <ButtonVue class="btn-dark" label="Забронювати" :disabled="!availability.status" @click="handleApartmentsBooking">
      </ButtonVue>
    </div>
    <ModalWindowGallery v-if="showModal" :imageName="selectedImageName" :images="orderedImages"
      :closeModal="closeModal" />
  </article>
</template>

<script>
import StarRating from '../shared/StarRating.vue';
import ButtonVue from '../shared/ButtonVue.vue';
import ModalWindowGallery from '../shared/ModalWindowGallery.vue'
import RegularText from '../shared/RegularText.vue';
import ServicesInfo from '../shared/ServicesInfo.vue';
import MainTitle from '../shared/MainTitle.vue';
import ApartmentBooking from './ApartmentBooking.vue';
import image01 from '../../assets/img/main_info/check-mark-yes.svg';
import image02 from '../../assets/img/main_info/check-mark-no.svg';
import { mapMutations } from 'vuex';

export default {
  name: 'ApartmentsMainInfo',
  components: {
    StarRating,
    ButtonVue,
    ModalWindowGallery,
    RegularText,
    ServicesInfo,
    MainTitle,
    ApartmentBooking,
  },
  props: {
    apartment: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      okIcon: image01,
      noIcon: image02,
      showModal: false,
      selectedImageName: '',
    };
  },
  computed: {
    formattedAddress() {
      const { city, street, building, apartment } = this.apartment.location;
      const parts = [];

      if (city) parts.push(`м. ${city}`);
      if (street) parts.push(`вул. ${street}`);
      if (building) parts.push(`буд. ${building}`);
      if (apartment) parts.push(`квартира ${apartment}`);

      return parts.join(', ');
    },
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    remainingImagesCount() {
      return this.apartment.imagesLink.length - 5;
    },
    orderedImages() {
      return [this.apartment.mainImage, ...this.apartment.imagesLink];
    },
    services() {
      return this.$store.state.technicial.services;
    },
    localServices() {
      return this.services.filter(service =>
        this.apartment.servicesList.includes(service.name)
      );
    },
    statusAvaibility() {
      return this.$store.state.apartment.availability.status;
    },
    availability() {
      return this.$store.state.apartment.availability;
    },
    bookingMessageOk() {
      const { dateFrom, dateTo, numberAdults, numberChildren, numberRooms } = this.availability;
      return `Вітаємо, помешкання (з ${numberRooms} кімнат(и)) в обрані дати: з ${dateFrom} по ${dateTo} для ${numberAdults} - дорослих та ${numberChildren} - дітей доступне для замовлення!`;
    },
    bookingMessageNo() {
      const { dateFrom, dateTo, numberAdults, numberChildren, numberRooms } = this.availability;
      return `Нажаль, помешкання (з ${numberRooms} кімнат(и)) в обрані дати: з ${dateFrom} по ${dateTo} для ${numberAdults} - дорослих та ${numberChildren} - дітей не доступне для замовлення!`;
    }
  },
  mounted() {
    this.clearAvailability(); // Викликайте мутацію під час завантаження компонента
  },
  methods: {
    ...mapMutations('apartment', ['clearAvailability']),
    getPhotoLabel(count) {
      if (count === 1) {
        return 'фотографія';
      } else if (count >= 2 && count <= 4) {
        return 'фотографії';
      } else {
        return 'фотографій';
      }
    },
    getImageNameFromUrl(url) {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1].split('?')[0];
    },
    openModalWithImages(imageUrl) {
      const imageName = this.getImageNameFromUrl(imageUrl);
      this.selectedImageName = imageName;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async handleApartmentsBooking() {
      const bookingInfo = {
        apartmentId: this.$store.state.apartment.availability.apartmentId,
        guestId: this.$store.state.auth.user.id,
        guestEmail: this.$store.state.auth.user.email,
        guestName: this.$store.state.auth.user.username,
        dateFrom: this.$store.state.apartment.availability.dateFrom,
        dateTo: this.$store.state.apartment.availability.dateTo,
        numberRooms: this.$store.state.apartment.availability.numberRooms,
        numberAdults: this.$store.state.apartment.availability.numberAdults,
        numberChildren: this.$store.state.apartment.availability.numberChildren,
      };
      try {
        this.$store.dispatch('technicial/startLoading');
        await this.$store.dispatch('order/createOrder', bookingInfo);
      } catch (error) {
        this.$notify({
          type: 'error',
          title: 'Відбулася помилка',
          text: error.message,
        });
      }
      finally {
        this.$store.dispatch('technicial/stopLoading');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.apartment-main-info {
  &__heading {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  &__title-price {
    display: flex;
    flex-direction: row;
    gap: 20px;
  }

  &__price {
    margin-top: 2px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }

  &__address {
    margin-top: -10px;
    margin-bottom: 20px;
  }

  &__description {
    line-height: 1.3;
    margin-top: 30px;
  }

  &__btn {
    margin-top: 40px;
    text-align: center;
  }

  &__photoContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__photoContainerMain {
    width: 842px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 20px;
  }

  &__photoOtherRight {
    width: 266px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__photoOtherBottom {
    position: relative;
    width: 842px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
  }

  &__photoMain {
    width: 555px;
    height: 395px;
    cursor: pointer;
  }
  
  &__photoRight {
    width: 266px;
    height: 188px;
    cursor: pointer;
  }

  &__photoText {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 5px 10px;
    font-size: 16px;
    border-radius: 5px;
  }

  &__icon {
    width: 40px;
    height: 40px;
  }

  &__alertTextWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }

  &__textWrapper {
    display: flex;
    flex-direction: column;
    gap: 20px
  }
}

.services-grid {
  margin-top: 10px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(212px, 1fr));
  gap: 10px 85px;
  grid-auto-rows: minmax(40px, auto);
}
</style>
