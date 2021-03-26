import Vue from 'vue';
import Vuex from 'vuex';
import gql from 'graphql-tag';
import { apolloClientFactory } from '../vue-apollo';

const { apolloClient } = apolloClientFactory({});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showCart: false,
    cartItems: [],
    currency: 'USD',
    products: [],
  },

  mutations: {
    CHANGE_CURRENCY(state, payload) {
      state.currency = payload;
    },

    UPDATE_PRODUCTS(state, payload) {
      state.products = payload;
    },

    REFRESH_CART(state) {
      state.cartItems = state.cartItems
        .map((cartItem) => ({
          ...cartItem,
          product: state.products
            .find((product) => product.id === cartItem.product.id),
        }));
    },

    SHOW_CART(state, payload) {
      state.showCart = payload;
    },

    ADD_ITEM_TO_CART(state, payload) {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.product.id === payload.id);

      // check if product is already in cart
      if (itemIndex > -1) {
        state.cartItems[itemIndex].quantity += 1;
      } else {
        state.cartItems.push({ quantity: 1, product: payload });
      }
    },

    REMOVE_ITEM_FROM_CART(state, payload) {
      // check if product is already in cart
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.product.id !== payload);
    },

    REDUCE_ITEM_IN_CART(state, payload) {
      const itemIndex = state.cartItems.findIndex((cartItem) => cartItem.product.id === payload);

      if (state.cartItems[itemIndex].quantity < 2) {
        // remove item from cart if quantity is less than 2
        state.cartItems = state.cartItems.filter((cartItem) => cartItem.product.id !== payload);
      } else {
        state.cartItems[itemIndex].quantity -= 1;
      }
    },
  },

  actions: {
    getProducts({ commit }, currency = 'USD') {
      apolloClient.query({
        query: gql`
          query GetProdutcs($currency: Currency! = USD) {
            products {
              id
              title
              image_url
              price(currency: $currency)
            }
          }
        `,
        variables: {
          currency,
        },
        fetchPolicy: 'no-cache',
      }).then((r) => {
        commit('UPDATE_PRODUCTS', r.data.products);
        commit('REFRESH_CART');
        commit('CHANGE_CURRENCY', currency);
      });
    },
  },

  getters: {
    showCart(state) {
      return state.showCart;
    },
  },
});
