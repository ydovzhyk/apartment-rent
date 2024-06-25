<template>
  <section class="notFound">
    <div class="notFound__content">
      <div class="boo">
        <div class="face" id="face"></div>
      </div>
      <div class="shadow"></div>
      <h1 class="notFound__title">Page not found</h1>
      <router-link :to="{ name: 'homepage' } ">
        Return to the main page
      </router-link>
    </div>
    
  </section>
</template>

<script>

export default {
  name: 'NotFoundPage',
}
</script>

<style lang="scss" scoped>


@use 'sass:math';
@import '../assets/scss/variables.scss';

@keyframes floating {
  0% {
    transform: translate3d(0, 0, 0);
  }
  45% {
    transform: translate3d(0, -10%, 0);
  }
  55% {
    transform: translate3d(0, -10%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes floatingShadow {
  0% {
    transform: scale(1);
  }
  45% {
    transform: scale(0.85);
  }
  55% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}
.notFound {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 30px);
  &__title {
    font-size: 20px;
    text-align: center;
  }
  &__logo {
    position: absolute;
    border: 2px solid brown;
  }
}


.booWrapper {
  margin-top: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: $bg-footer-header;
  width: 300px;
  padding: 40px;
  border-radius: 30px;
  box-shadow: 10px 10px 30px rgba(82, 85, 95, 0.4);
  z-index: 1200;
}

.boo {
  width: 80px;
  height: 92px;
  margin-left: auto;
  margin-right: auto;
  border: 4px solid $text-color;
  border-bottom: 0;
  overflow: hidden;
  border-radius: 80px 80px 0 0;
  box-shadow: -16px 0 0 2px rgb(226 228 232 / 50%) inset;
  -webkit-animation: floating 3s ease-in-out infinite;
  animation: floating 3s ease-in-out infinite;

  .face {
    width: 7px;
    height: 7px;
    border-radius: 6px;
    background-color: $text-color;
    position: absolute;
    left: 50%;
    bottom: 28px;
    transform: translateX(-50%);
    &::before,
    &::after {
      content: '';
      display: block;
      width: round(math.div(math.div(16px, 1.3333), 4));
      height: round(math.div(math.div(16px, 1.3333), 4));
      background-color: $text-color;
      border-radius: 50%;
      position: absolute;
      bottom: 16px + round(math.div(math.div(16px, 1.3333), 3));
    }

    &::before {
      left: round(math.div(16px, 1.3333));
    }

    &::after {
      right: round(math.div(16px, 1.3333));
    }
  }
}
.boo:after {
  content: '';
  display: block;
  position: absolute;
  left: math.div(-16px, 1.7);
  bottom: math.div(-16px, 3.85);
  width: calc(100% + 16px);
  height: 16px;
  background-repeat: repeat-x;
  background-size: 16px 16px;
  background-position: left bottom;
  background-image: linear-gradient(
      -45deg,
      $main-color,
      math.div(16px, 2),
      transparent 0
    ),
    linear-gradient(45deg, $main-color, math.div(16px, 2), transparent 0),
    linear-gradient(
      -45deg,
      $icons-color,
      math.div(16px, 1.7),
      transparent 0
    ),
    linear-gradient(
      45deg,
      $icons-color,
      math.div(16px, 1.7),
      transparent 0
    );
}
.shadow {
  width: 90px;
  height: 15px;
  background-color: $text-color;
  margin-top: 30px;
  margin-right: auto;
  margin-left: auto;
  border-radius: 50%;
  -webkit-animation: floatingShadow 3s ease-in-out infinite;
  animation: floatingShadow 3s ease-in-out infinite;
}
</style>
