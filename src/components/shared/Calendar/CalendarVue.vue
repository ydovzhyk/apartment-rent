<template>
    <div class="box">
        <section>
            <date-picker v-model:value="value1" type="date" range placeholder="Select date range"
                @update-dates:value="emitSelectedDates"></date-picker>
        </section>
    </div>
</template>

<script>
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import 'vue-datepicker-next/locale/uk';
import moment from 'moment';
export default {
    name: 'CalendarVue',
    components: { DatePicker },
    data() {
        return {
            value1: [moment().toDate(), moment().add(10, 'days').toDate()],
            value2: [],
        };
    },
    methods: {
        emitSelectedDates() {
            this.$emit('update-dates', this.value1);
        }
    },
    watch: {
        value1() {
            this.emitSelectedDates();
        }
    }
};
</script>

<style lang="scss" src="./datepicker.scss"></style>

