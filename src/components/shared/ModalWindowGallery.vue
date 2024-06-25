<template>
    <div class="modal-window" ref="modalRef">
        <button type="button" class="modal-window__close-button" @click="handleCloseModal">
            <svg class="modal-window__icon" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256" width="100px" height="100px">
                <g stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"
                    stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none"
                    text-anchor="none" style="mix-blend-mode: normal">
                    <g transform="scale(5.12,5.12)">
                        <path
                            d="M25,2c-12.69047,0 -23,10.30953 -23,23c0,12.69047 10.30953,23 23,23c12.69047,0 23,-10.30953 23,-23c0,-12.69047 -10.30953,-23 -23,-23zM25,4c11.60953,0 21,9.39047 21,21c0,11.60953 -9.39047,21 -21,21c-11.60953,0 -21,-9.39047 -21,-21c0,-11.60953 9.39047,-21 21,-21zM32.99023,15.98633c-0.26377,0.00624 -0.51439,0.11645 -0.69727,0.30664l-7.29297,7.29297l-7.29297,-7.29297c-0.18827,-0.19353 -0.4468,-0.30272 -0.7168,-0.30274c-0.40692,0.00011 -0.77321,0.24676 -0.92633,0.62377c-0.15312,0.37701 -0.06255,0.80921 0.22907,1.09303l7.29297,7.29297l-7.29297,7.29297c-0.26124,0.25082 -0.36648,0.62327 -0.27512,0.97371c0.09136,0.35044 0.36503,0.62411 0.71547,0.71547c0.35044,0.09136 0.72289,-0.01388 0.97371,-0.27512l7.29297,-7.29297l7.29297,7.29297c0.25082,0.26124 0.62327,0.36648 0.97371,0.27512c0.35044,-0.09136 0.62411,-0.36503 0.71547,-0.71547c0.09136,-0.35044 -0.01388,-0.72289 -0.27512,-0.97371l-7.29297,-7.29297l7.29297,-7.29297c0.29724,-0.28583 0.38857,-0.7248 0.23,-1.10546c-0.15857,-0.38066 -0.53454,-0.62497 -0.94679,-0.61524z">
                        </path>
                    </g>
                </g>
            </svg>
        </button>
        <div class="modal-window__wrapper">
            <div class="modal-window__photo-container">
                <img :src="images[selectedImageIndex]" :alt="`Галерея фотографій ${selectedImageIndex}`"
                    class="image" />
            </div>
        </div>
        <div class="modal-window__button-container">
            <button type="button" class="modal-window__button" @click="handlePrevImage"
                :disabled="selectedImageIndex === 0">
                Назад
            </button>
            <button type="button" class="modal-window__button" @click="handleNextImage"
                :disabled="selectedImageIndex === lastImageIndex">
                Вперед
            </button>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
    name: 'ModalWindowGallery',
    props: {
        imageName: {
            type: String,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
        closeModal: {
            type: Function,
            required: true,
        },
    },
    setup(props) {
        const modalRef = ref(null);
        const selectedImageIndex = ref(0);

        watch(() => props.imageName, (newImageName) => {
            selectedImageIndex.value = props.images.findIndex(image => image.includes(newImageName));
        }, { immediate: true });

        const handleCloseModal = () => {
            props.closeModal();
        };

        const handlePrevImage = () => {
            if (selectedImageIndex.value > 0) {
                selectedImageIndex.value -= 1;
            }
        };

        const handleNextImage = () => {
            if (selectedImageIndex.value < props.images.length - 1) {
                selectedImageIndex.value += 1;
            }
        };

        return {
            modalRef,
            selectedImageIndex,
            handleCloseModal,
            handlePrevImage,
            handleNextImage,
            lastImageIndex: props.images.length - 1,
        };
    },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.modal-window {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(50, 53, 53, 0.8);
    backdrop-filter: blur(3px);
    z-index: 1200;

    &__close-button {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: 30px;
        right: 40px;
        width: 40px;
        height: 40px;
        background-color: transparent;
        border: 1px solid transparent;
        border-radius: 50%;
    }

    &__icon {
        width: 40px;
        height: 40px;
        fill: white;
        cursor: pointer;
        transition: fill 0.3s ease;
    }

    &__icon:hover {
     fill: rgb(192, 191, 191);
    }

    &__button-container {
        position: absolute;
        bottom: 40px;
        display: flex;
        flex-direction: row;
        gap: 50px;
    }

    &__button {
        background-color: transparent;
        width: 70px;
        font-weight: 400;
        font-size: 15px;
        line-height: 1.5;
        color: rgb(255, 255, 255);
        cursor: pointer;
        transition: color 0.3s ease;
    }

    &__button:hover {
        color: rgb(192, 191, 191);
    }

    &__button:disabled {
        color: rgb(192, 191, 191);
        opacity: 0.5;
    }
}

.image {
    width: 70vw;
    height: 80vh;
    object-fit: cover;
}
</style>