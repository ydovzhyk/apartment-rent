<template>
  <div class="circle-loader">
    <span class="circle-loader__content">
      <svg
        class="preloader-icon"
        viewBox="0 0 100 100"
        :width="width"
        :height="height"
        :style="style"
      >
      <circle cx="50" cy="50" r="40" stroke-width="5" fill="none"></circle>
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  name: 'CircleLoader',
  props: {
    width: {
      type: [Number, String],
      default: 50,
    },
    height: {
      type: [Number, String],
      default: 50,
    },
    color: {
      type: String,
      default: '#fff',
    },
  },
  computed: {
    style() {
      return `stroke: ${this.color};`;
    },
  },
};
</script>

<style lang="scss" scoped>

.circle-loader {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: calc(100vh / 2 - 45px);
  left: calc(100vw / 2 - 45px);
  width: 90px;
  height: 90px;
}
.preloader-icon {
  stroke-dasharray: 0 250;
  animation: preloader 4s infinite;
}

@keyframes preloader {
  0% {
    stroke-dasharray: 0 250;
    transform: rotate(0);
  }

  50% {
    stroke-dasharray: 255 250;
    transform: rotate(650deg);
  }

  100% {
    stroke-dasharray: 0 250;
    transform: rotate(0);
  }
}
</style>
