export default {
  methods: {
    openCart() {
      this.$store.commit('SHOW_CART', true);
    },

    closeCart() {
      this.$store.commit('SHOW_CART', false);
    },

    addProductToCart(product) {
      this.openCart();
      this.$store.commit('ADD_ITEM_TO_CART', product);
    },

    reduceItemInCart(productId) {
      this.$store.commit('REDUCE_ITEM_IN_CART', productId);
    },
  },
};
