<template>
    <div class="input" ref="input">
        <button class="input__btn" @click="toggleMenu">
            <div class="input__btnWrapper">
                <svg class="input__icon" width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8 0C5.38286 0 3.25391 2.12896 3.25391 4.74609C3.25391 7.36323 5.38286 9.49219 8 9.49219C10.6171 9.49219 12.7461 7.36323 12.7461 4.74609C12.7461 2.12896 10.6171 0 8 0Z" />
                    <path
                        d="M15.8216 14.0161C14.4028 11.8877 12.0282 10.6172 9.4708 10.6172H6.5292C3.9718 10.6172 1.5972 11.8877 0.178438 14.0161L0.0898438 14.1489V18H15.9102H15.9102V14.1489L15.8216 14.0161Z" />
                </svg>
                <span>{{ label }}</span>
            </div>
        </button>

        <div v-if="menuVisible" class="menu">
            <div class="menu__item">
                <span>Дорослі:</span>
                <div class="menu__countPart">
                    <button class="menu__btn" @click="changeCount('adults', -1)">-</button>
                    {{ numberAdults }}
                    <button class="menu__btn" @click="changeCount('adults', 1)">+</button>
                </div>
            </div>
            <div class="menu__item">
                <span>Діти:</span>
                <div class="menu__countPart">
                    <button class="menu__btn" @click="changeCount('children', -1)">-</button>
                    {{ numberChildren }}
                    <button class="menu__btn" @click="changeCount('children', 1)">+</button>
                </div>
            </div>
            <div class="menu__item">
                <span>Кімнати:</span>
                <div class="menu__countPart">
                    <button class="menu__btn" @click="changeCount('rooms', -1)">-</button>
                    {{ numberRooms }}
                    <button class="menu__btn" @click="changeCount('rooms', 1)">+</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "InputWithModal",
    props: {
        initialLabel: {
            type: String,
            default: "Custom Input"
        },
        initialAdults: {
            type: Number,
            default: 1
        },
        initialChildren: {
            type: Number,
            default: 0
        },
        initialRooms: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            menuVisible: false,
            label: this.initialLabel,
            numberAdults: this.initialAdults,
            numberChildren: this.initialChildren,
            numberRooms: this.initialRooms
        };
    },
    methods: {
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
        },
        changeCount(type, amount) {
            if (type === 'adults') {
                this.numberAdults += amount;
                if (this.numberAdults < 0) {
                    this.numberAdults = 0;
                }
            } else if (type === 'children') {
                this.numberChildren += amount;
                if (this.numberChildren < 0) {
                    this.numberChildren = 0;
                }
            } else if (type === 'rooms') {
                this.numberRooms += amount;
                if (this.numberRooms < 1) {
                    this.numberRooms = 1;
                }
            }
            this.updateLabel();
            this.emitUpdate();
        },
        updateLabel() {
            this.label = `Дорослі - ${this.numberAdults}, Діти - ${this.numberChildren}, Кімнат - ${this.numberRooms}`;
        },
        emitUpdate() {
            this.$emit('update-count', {
                numberAdults: this.numberAdults,
                numberChildren: this.numberChildren,
                numberRooms: this.numberRooms
            });
        },
        handleClickOutside(event) {
            if (this.$refs.input && !this.$refs.input.contains(event.target)) {
                this.menuVisible = false;
            }
        }
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    created() {
        this.updateLabel();
    }
};
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables.scss';

.input {
    position: relative;
    display: inline-block;

    &__btn {
        width: 320px;
        height: 40px;
        font-size: 14px;
        color: #555;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
    }

    &__btnWrapper {
        margin-left: 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
    }

    &__icon {
        fill: #ccc;
    }
}

.menu {
    position: absolute;
    top: -142px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 320px;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);

    &__item {
        padding: 0px 15px;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color: #555;
    }

    &__countPart {
        width: 100px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    &__btn {
        width: 30px;
        height: 30px;
    }
}
</style>