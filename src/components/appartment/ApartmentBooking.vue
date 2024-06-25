<template>
    <div class="booking">
        <MainTitle :level="2">Перевірте наявність місць:</MainTitle>
        <form class="booking__form" @submit.prevent="handleSubmit">
            <div class="booking__partForm">
                <div class="booking__part">
                    <label class="booking__label" for="dateFrom">Оберіть дати:</label>
                    <CalendarVue @update-dates="handleDatesUpdate" :key="calendarKey" />
                </div>
                <div class="booking__part">
                    <label class="booking__label" for="dateFrom">Вкажіть кількість людей:</label>
                    <InputWithModal
                        :initialLabel="`Дорослі - ${this.formData.numberAdults}, Діти - ${this.formData.numberChildren}, Кімнат - ${this.formData.numberRooms}`"
                        :initialAdults="this.formData.numberAdults" :initialChildren="this.formData.numberChildren"
                        :initialRooms="this.formData.numberRooms" @update-count="handleUpdateCount" :key="inputKey" />
                </div>
            </div>
                       
            <div class="booking__btnWrapper">
                <ButtonVue type="submit" class="btn-dark" label="Перевірити наявність" @click="handleClick">
                </ButtonVue>
            </div>
        </form>
    </div>
</template>

<script>
import MainTitle from '../shared/MainTitle.vue';
import CalendarVue from '../shared/Calendar/CalendarVue.vue';
import InputWithModal from '../shared/InputWithModal.vue';
import ButtonVue from '../shared/ButtonVue.vue';
import moment from 'moment';

export default {
    name: 'ApartmentBooking',
    components: {
        MainTitle,
        CalendarVue,
        InputWithModal,
        ButtonVue,
    },
    props: {
        apartmentId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            inputKey: 0,
            calendarKey: 0,
            formData: {
                dateFrom: moment().format('DD.MM.YYYY'),
                dateTo: moment().add(10, 'days').format('DD.MM.YYYY'),
                numberRooms: 1,
                numberAdults: 1,
                numberChildren: 0,
                apartmentId: this.apartmentId,
            },
        };
    },
    methods: {
        handleUpdateCount(newValues) {
            this.formData.numberAdults = newValues.numberAdults;
            this.formData.numberChildren = newValues.numberChildren;
            this.formData.numberRooms = newValues.numberRooms;
        },
        handleDatesUpdate(dates) {
            if (dates.length === 2) {
                this.formData.dateFrom = moment(dates[0]).format('DD.MM.YYYY');
                this.formData.dateTo = moment(dates[1]).format('DD.MM.YYYY');
            }
        },
        async handleClick() {
            try {
                this.$store.dispatch('technicial/startLoading');
                await this.$store.dispatch('apartment/checkAvailability', this.formData);
                this.resetForm();
                } catch (error) {
                    this.$notify({
                        type: 'error',
                        title: 'Помилка',
                        text: error.message,
                    });
                } finally {
                    this.$store.dispatch('technicial/stopLoading');
            }
        },
        resetForm() {
            this.formData = {
                dateFrom: moment().format('DD.MM.YYYY'),
                dateTo: moment().add(10, 'days').format('DD.MM.YYYY'),
                numberRooms: 1,
                numberAdults: 1,
                numberChildren: 0,
                apartmentId: this.apartmentId,
            };
            this.inputKey++;
            this.calendarKey++;
        },
    },
};
</script>

<style lang="scss" scoped>

.booking {
    &__partForm {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    &__part {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    &__btnWrapper {
        margin-top: 40px;
        margin-bottom: 40px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        
    }
}
</style>