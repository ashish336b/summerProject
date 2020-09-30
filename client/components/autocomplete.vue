<template>
  <div class="dropdown is-active">
    <div class="dropdown-tigger">
      <input
        autocomplete="off"
        type="text"
        class="input mr-sm-2 dropdown-toggle"
        :placeholder="placeholder ? placeholder : 'eg: Ecosprin 75mg'"
        aria-haspopup="true"
        aria-expanded="false"
        v-model="search"
        :id="id"
        @keydown.tab.prevent="next($event)"
        @keydown="navigate"
        @keydown.enter.prevent.stop="select()"
        @blur="blur"
      />
    </div>
    <!-- 
      ref="search"
    -->
    <div
      class="dropdown-menu"
      v-if="items.length > 0"
      id="dropdown"
      ref="dropdown"
    >
      <div class="dropdown-content">
        <a
          class="dropdown-item"
          href="#"
          v-for="(item, i) in items"
          :class="{ 'is-active': i == index }"
          :key="item._id"
          @mousedown.prevent="select(item)"
          @mouseenter="index = i"
          @mouseleave="index = -1"
        >
          {{ item[`${attr}`] }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["api", "attr", "id", "value", "text", "reset", "placeholder"],
  data() {
    return {
      timeout: null,
      search: "",
      items: [],
      index: -1,
    };
  },
  watch: {
    text(newVal, oldVal) {
      this.search = this.text;
    },
    reset() {
      this.search = "";
    },
    search(newVal, oldVal) {
      this.$emit("newVal", newVal);
      if (
        newVal.length > 0 &&
        (oldVal.length == newVal.length - 1 ||
          oldVal.length - 1 == newVal.length)
      ) {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.$axios.get(`${this.api}${this.search}`).then(({ data }) => {
            if (data.data) this.items = data.data;
            else this.items = data;
          });
        }, 100);
      } else {
        this.items = [];
        this.index = -1;
      }
    },
  },
  methods: {
    select(item) {
      // Click
      if (item) {
        this.search = item[`${this.value}`];
        this.$emit("selected", item);
      }
      // Enter
      else if (this.index > -1) {
        this.search = this.items[this.index][`${this.value}`];
        this.$emit("selected", this.items[this.index]);
      }
      this.$emit("tab");
      this.items = [];
      this.index = -1;
    },
    next(e) {
      if (e.code == "Tab") {
        this.items = [];
        this.$emit("tab");
      }
    },
    navigate(e) {
      if (e.code == "ArrowDown") {
        if (this.index < this.items.length - 1) this.index++;
      } else if (e.code == "ArrowUp") {
        if (this.index > 0) this.index--;
      }
    },
    blur() {
      setTimeout(() => {
        this.items = [];
        this.index = -1;
      }, 200);
    },
  },
};
</script>
<style lang="scss" scoped>
.dropdown-content {
  border: 1px solid black;
}
</style>