<template>
  <section id="customDropdown" :style="{ width }" :class="[rootClass]">
    <span class="dropdown-caret"></span>
    <select class="border p-3" v-bind="$attrs">
      <option value=""
      disabled="disabled"
      v-if="placeholder"
      :selected="!selected">{{ placeholder }}</option>

      <option v-for="option in options"
      :key="option.value"
      :value="option.value"
      :selected="option.value === selected">
      {{ option.text }}
      </option>
    </select>
  </section>
</template>

<script>
export default {
  name: 'Dropdowm',
  inheritAttrs: false,
  props: {
    width: {
      type: String,
      default: '300px',
    },
    placeholder: {
      type: String,
      default: 'Select',
    },
    selected: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => ([]),
    },
    rootClass: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
#customDropdown {
  position: relative;

  select {
    width: 100%;
    font-size: 0.9rem;
    color: var(--primary);
    border-color: var(--primary);
    appearance: none;
    background-color: transparent;
    position: relative;
    z-index: 1;
  }

  span.dropdown-caret {
    display: inline-block;
    position: absolute;
    top: 3px;
    right: 10px;
    width: 24px;
    height: 24px;
    transform: translateY(50%);
    content: "";
    background-image: url("../assets/expand_more_black_24dp.svg");
    z-index: 0;
  }
}
</style>
