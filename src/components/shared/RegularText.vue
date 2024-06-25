<template>
    <div>
        <component :is="tagName" :class="['regular-text', alignmentClass]">
            <span v-if="!isTextLong || showMore">
                <slot></slot>
            </span>
            <span v-else>
                {{ shortText }}
            </span>
        </component>
        <div class="btn-wrapper">
            <button v-if="isTextLong" @click="toggleText">
                {{ showMore ? 'Згорнути' : 'Читати ще...' }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RegularText',
    props: {
        tag: {
            type: String,
            default: 'p',
        },
        alignment: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'center'].includes(value);
            },
        },
    },
    data() {
        return {
            showMore: false,
        };
    },
    computed: {
        tagName() {
            return this.tag;
        },
        alignmentClass() {
            return this.alignment === 'center' ? 'text-center' : 'text-left';
        },
        isTextLong() {
            return this.fullText.length > 700;
        },
        shortText() {
            return this.fullText.slice(0, 700) + '...';
        },
        fullText() {
            const defaultSlot = this.$slots.default();
            return defaultSlot.map(node => node.children).join('');
        },
    },
    methods: {
        toggleText() {
            this.showMore = !this.showMore;
        },
    },
};
</script>

<style lang="scss" scoped>
.regular-text {
    margin: 0px 0px;
    font-size: 18px;
    font-weight: 400;
    line-height: 1.5;
    white-space: pre-wrap;
}

.text-left {
    text-align: left;
}

.text-center {
    text-align: center;
}

.btn-wrapper {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 400;
    color: #ff662d;
    margin-top: 10px;
    margin-right: 10px;
}
</style>