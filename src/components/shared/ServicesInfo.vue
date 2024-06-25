<template>
    <div class="service-item" @click="toggleSelection"
        :class="[{ 'selected': isSelected }, { 'selectable': selectable }]">
        <img :src="service.icon" alt="Іконка сервісу" class="service-item__image" />
        <span class="service-item__name">{{ service.name }}</span>
    </div>
</template>

<script>
export default {
    name: 'ServicesInfo',
    props: {
        service: {
            type: Object,
            required: true
        },
        selectable: {
            type: Boolean,
            default: true,
        }
    },
    data() {
        return {
            isSelected: false
        };
    },
    methods: {
        toggleSelection() {
            if (this.selectable) {
                this.isSelected = !this.isSelected;
                this.$emit('toggle-selection', this.service.name, this.isSelected);
            } else {
                return;
            }
            
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.service-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 200px;
    cursor: pointer;
    padding: 5px;
    border: 1px solid $main-color;
    border-radius: 10px;
    margin: 5px;
    transition: border-color 0.3s, color 0.3s;
}

.service-item__image {
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

.service-item__name {
    width: 120px;
    font-size: 15px;
    text-align: center;
}

.selected, .service-item:hover {
    border-color: #FD821F;
    color: #fd831fde;
    box-shadow: rgb(253, 130, 31, 0.35) 0px 5px 10px;
}

.service-item:not(.selectable):hover {
    border: 1px solid $main-color;
    color: initial;
    box-shadow: none;
    cursor: default;
}

</style>
