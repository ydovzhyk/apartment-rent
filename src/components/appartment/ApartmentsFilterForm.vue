<template>
    <form class="form" @submit.prevent="handleSubmit">
        <CustomSelect :items="cities" v-model="city" class="custom-select"/>
        <CustomInput
            v-model="price"
            type="number"
            placeholder="Ціна, від"
            errorMessage="*Введіть коректне значення"
            :rules="rules"
        />
        <ButtonVue class="btn-dark" type="submit" label="Підібрати житло"></ButtonVue>
    </form>
</template>

<script>
import CustomInput from '../shared/CustomInput.vue';
import CustomSelect from '../shared/CustomSelect.vue';
import ButtonVue from '../shared/ButtonVue.vue';
import { isRequired, charLimit } from '../../utils/validationRules';

    export default {
        name: 'ApartmentsFilterForm',
        components: {
            CustomInput,
            CustomSelect,
            ButtonVue
        },
        data() {
            return {
                price: '',
                city: '',
            };
        },
        computed: {
            rules() {
                return [isRequired, charLimit(10)];
            },
            cities() {
                const citiesFromStore = this.$store.state.technicial.cities;
                return [{ value: "", label: "Всі міста", selected: false }, ...citiesFromStore];
            },
        },
        methods: {
            handleSubmit(event) {
                event.preventDefault();
                this.$emit('submit', {
                    city: this.city || 'Всі міста',
                    price: this.price || 0,
                });
            },
        }
    }
</script>

<style lang="scss" scoped>

.form {
    display: flex;
    margin-bottom: 40px;
}

.form .custom-select {
    margin-right: 30px;
}
.form .btn-dark{
    margin-left: auto;
}
</style>