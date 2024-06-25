<template>
    <div class="box" @click="handleClick">
        <label :for="name" class="label">{{ label }}</label>
        <input type="file" :id="name" accept="image/png, image/jpeg" style="display: none" :multiple="multiple"
            @change="handleFileChange" @multipleChange="handleFileChange" />
    </div>
</template>

<script>
export default {
    name: 'FormInputFile',
    props: {
        name: {
            type: String,
            required: true
        },
        multiple: {
            type: Boolean,
            default: false
        },
        single: {
            type: Boolean,
            default: false
        },
        onChange: {
            type: Function
        },
        onMultipleChange: {
            type: Function
        },
        label: {
            type: String,
            required: true
        }
    },
    methods: {
        handleFileChange(event) {
            const files = event.target.files;
            if (this.multiple) {
                this.onMultipleChange(files);
            } else if (this.onChange) {
                this.onChange(files[0]);
            }
        },
    }
};
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables.scss';
.box {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 220px;
    min-height: 40px;
    background-color: $main-color;
    border: 1px solid $main-color;
    color: $card-bg;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 1.3;
    transition: background-color $transition-duration $timing-function,
        color $transition-duration $timing-function,
        border-color $transition-duration $timing-function,
        box-shadow $transition-duration $timing-function;

    &:hover {
            background-color: $background-btn-second-color;
            border-color: $btn-border-color;
            box-shadow: $hover-box-shadow;
            color: $hover-btn-text;
        }
}

.label {
    padding: 5px 5px;
    text-transform: capitalize;
    color: $background-btn-second-color;
    transition: color $transition-duration $timing-function;
    text-align: center;

    .box:hover & {
        cursor: pointer;
        color: $hover-btn-text;
    }
}
</style>
