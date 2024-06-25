<template>
    <div class="wrapper-input">
        <input :value="modelValue" @input="updateValue" @blur="blurHandler" v-bind="$attrs" class="custom-input"
            :placeholder="placeholder" :class="!isValid && 'custom-input--error'" :style="{ width: width }"
        />
        <span v-if=" !isValid" class="custom-input__error">{{ error }}</span>
    </div>
</template>

<script>
export default {
    name: 'CustomInput',
    data() {
        return {
            isValid: true,
            error: '',
        };
    },
    props: {
        modelValue: String,
        placeholder: {
            type: String,
            default: '',
        },
        errorMessage: {
            type: String,
            default: '',
        },
        rules: {
            type: Array,
            default: () => [],
        },
        width: {
            type: String,
            default: '220px',
        },
    },
    inheritAttrs: false,
    // warch використовуємо коли хочемо слідкувати за кожною зміною value, але ми використовуємо
    // @blur="blurHandler" в Input тобто валідацію введених даних робимо тільки при blur
    // watch: {  
    //     modelValue(value) {
    //         this.validate(value)
    //     }
    // },
    methods: {
        updateValue(event) {
            this.$emit('update:modelValue', event.target.value);
        },
        validate(value) {
            this.isValid = this.rules.every((rule) => {
                const { hasPassed, message } = rule(value)
                if (!hasPassed) {
                    this.error = message || this.errorMessage;
                }
                return hasPassed;
            });
        },
        blurHandler() {
            this.validate(this.modelValue);
        },
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.wrapper-input {
    position: relative;
    display: inline-flex;
}
.custom-input {
    width: 100%;
    border: 2px solid $main-color;
    font-size: 18px;
    outline: none;
    font-family: Montserrat, sans-serif;
    line-height: inherit;
    padding: 8px 15px;

    &::placeholder {
        color: inherit;
    }

    &--error {
        background-color: $main-color;
    }

    &__error {
        position: absolute;
        top: 100%;
        right: 0;
        width: 100%;
        font-size: 12px;
        color: red;
        line-height: 1.3;
    }
}

.custom-input--error::placeholder {
    color: white;
}
</style>