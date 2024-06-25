<template>
    <select :value="modelValue" @change="updateValue" :class="[styleType]" :style="{ width: width }">
        <option v-for="item in formatedItems" :key="item.value" :value="item.value">
            {{ item.label }}
        </option>
    </select>
</template>

<script>
export default {
    name: 'CustomSelect',
    props: {
        modelValue: {
            type: String,
            default: ''
        },
        items: {
            type: Array,
            required: true
        },
        styleType: {
            type: String,
            default: 'custom-select'
        },
        width: {
            type: String,
            default: '220px',
        },
    },
    computed: {
        formatedItems() {
            return this.items.map(item => {
                return typeof item === 'object'
                    ? item
                    : { value: item, label: item }
            })
        }
    },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.custom-select {
    height: 40px;
    border: 2px solid $main-color;
    font-size: 18px;
    padding: 0 10px;
}
</style>