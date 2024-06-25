<template>
  <div class="pagination">
    <button class="pagination__btnLeft pageBox" @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
      &lt;
    </button>
    <div class="pagination__pages">
      <button v-for="page in getPageNumbers()" :key="page" @click="changePage(page)"
        :class="currentPage === page ? 'active' : 'pageBox'">
        {{ page }}
      </button>
    </div>
    <button class="pagination__btnRight pageBox" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
      &gt;
    </button>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getPageNumbers() {
      const pageNumbers = [];
      const displayRange = 2;

      let startPage = Math.max(1, this.currentPage - displayRange);
      let endPage = Math.min(this.totalPages, this.currentPage + displayRange);

      if (this.currentPage <= displayRange) {
        endPage = Math.min(displayRange * 2 + 1, this.totalPages);
      }

      if (this.currentPage >= this.totalPages - displayRange) {
        startPage = Math.max(this.totalPages - displayRange * 2, 1);
      }

      for (let page = startPage; page <= endPage; page++) {
        pageNumbers.push(page);
      }

      return pageNumbers;
    },
    changePage(page) {
      if (page !== this.currentPage) {
        this.$emit('pageChange', page);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/variables.scss';
.pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;

    &__btnLeft {
        margin-right: 10px;
    }

    &__btnRight {
        margin-left: 10px;
    }

    &__pages {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
}

.pageBox {
    width: 30px;
    height: 25px;
    border: 1px solid $icons-color;
    color: $icons-color;
    background-color: $bg-footer-header;
    margin-right: 7px;
    cursor: pointer;
}

.pageBox:hover {
    background-color: $background-btn-second-color;
    border-color: $btn-border-color;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
}

.pageBox:last-child {
    margin-right: 0px;
}

.active {
    width: 30px;
    height: 25px;
    margin-right: 7px;
    border: 1px solid $icons-color;
    background-color: $main-color;
    color: white;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
}

.active:last-child {
    margin-right: 0px;
}
</style>