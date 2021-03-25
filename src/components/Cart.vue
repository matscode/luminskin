<template>
  <div>
    <transition
    name="cart-card"
    enter-active-class="animate__animated animate__fadeIn"
    leave-active-class="animate__animated animate__fadeOut"
    >
      <div class="cart-overlay" @click="closeCart" v-if="showCart"></div>
    </transition>

    <transition
    name="cart-card"
    enter-active-class="animate__animated animate__slideInRight"
    leave-active-class="animate__animated animate__slideOutRight"
    >
      <div class="cart-card d-flex flex-column" v-if="showCart">
        <header class="m-4">
          <div class="clearfix mb-4 text-center">
            <a href="" class="close-button" @click.prevent="closeCart">
              <span class="material-icons">
                chevron_right
              </span>
            </a>

            <span class="cart-title">
              Your Cart
            </span>
          </div>

          <Dropdown
          root-class="white-bg-dropdown"
          :options="currencies.map((c) => ({value: c, text: c}))"
          :selected="$store.state.currency" width="100px"
          @change.native="handleCurrencyChange($event)"></Dropdown>
        </header>

        <main class="px-4 flex-grow-1">
          <section class="cart-items">
            <section
            class="cart-item bg-white mb-2 p-3"
            v-for="cartItem in $store.state.cartItems"
            :key="cartItem.product.id"
            >
              <div class="d-flex justify-content-between h-100">
                <div class="left-half d-flex flex-column justify-content-between flex-grow-1">
                  <h6 class="cart-item-title">
                    {{ cartItem.product.title }}
                  </h6>

                  <div class="d-flex align-items-center">
                    <div
                    class="cart-item-quantity-control p-2 d-flex justify-content-around"
                    >
                      <a
                      href=""
                      class="cart-item-quantity-btn cart-item-quantity-btn-minus"
                      @click.prevent="reduceItemInCart(cartItem.product.id)"
                      >-</a>
                      <span>
                        {{ cartItem.quantity }}
                      </span>
                      <a
                      href=""
                      class="cart-item-quantity-btn cart-item-quantity-btn-plus"
                      @click.prevent="addProductToCart(cartItem.product)"
                      >
                      +
                      </a>
                    </div>

                    <div class="cart-item-cost ml-auto">
                      {{
                        $helpers.formatMoney(
                          cartItem.product.price * cartItem.quantity,
                          $store.state.currency,
                        )
                      }}
                    </div>
                  </div>
                </div>

                <div class="right-half position-relative">
                  <img :src="cartItem.product.image_url"
                  alt="Image"
                  class="cart-product-image">

                  <a
                  class="cart-item-remove-button"
                  href="#"
                  @click.prevent="removeItemFromCart(cartItem.product.id)"
                  >
                  &times;
                  </a>
                </div>
              </div>
            </section>

            <section
            class="text-center mt-5"
            v-if="!$store.state.cartItems.length"
            >
              There are no items in your cart.
            </section>
          </section>
        </main>

        <footer class="cart-footer" v-if="$store.state.cartItems.length">
          <section class="m-4">
            <div class="d-flex align-items-center">
              <span class="small">
                Subtotal
              </span>

              <span class="cart-items-total-price ml-auto">
                {{
                  $helpers.formatMoney(
                    $store.state.cartItems.reduce(
                      (sum, cartItem) => sum + (cartItem.product.price * cartItem.quantity),
                      0
                      ),
                      $store.state.currency
                    )
                }}
              </span>
            </div>

            <button class="btn cart-cta-btns subscription-btn">
              Make this a subscription (Save 20%)
            </button>

            <button class="btn cart-cta-btns checkout-page-btn">
              Proceed to checkout
            </button>

          </section>
        </footer>
      </div>
    </transition>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';
import CartMixin from '@/mixins/CartMixin';
import gql from 'graphql-tag';

export default {
  name: 'Cart',
  mixins: [CartMixin],
  components: {
    Dropdown,
  },
  props: {
    showCart: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      currencies: [],
    };
  },
  apollo: {
    currencies: gql`query GetCurrencies {
            currencies: currency
          }`,
  },

  methods: {
    removeItemFromCart(productId) {
      this.$store.commit('REMOVE_ITEM_FROM_CART', productId);
    },

    reduceItemInCart(productId) {
      this.$store.commit('REDUCE_ITEM_IN_CART', productId);
    },

    handleCurrencyChange(selectEvent) {
      console.log(selectEvent.target.value);
      this.$store.commit('CHANGE_CURRENCY', selectEvent.target.value);
    },
  },
};
</script>

<style scoped lang="scss">
.cart-overlay,
.cart-card {
  position: fixed;
  top: 0;

  height: 100%;
}

.cart-overlay {
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  width: 100%;

  z-index: 1040;
}

.white-bg-dropdown {
  background-color: #fff;
}

.cart-card {
  right: 0;
  width: 500px;
  background-color: var(--white);

  text-align: left; // reset alignment
  z-index: 1050;

  background-color: var(--card-background-color);

  & > main {
    overflow: auto;
    height: 100%;
  }
}

@media (max-width: 575.98px) {
  .cart-card {
    width: 100%;
  }
}

.close-button {
  width: 30px;
  height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-style: solid;
  border-width: 1px;
  border-color:  var(--secondary);

  border-radius: 50%;
  float: left;

  &:hover {
    text-decoration: none;
  }
}

.cart-title {
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 2px;
  color: var(--primary);
}

.cart-item {
  height: 150px;

  .right-half {
    min-width: 125px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-title {
    font-size: 0.9rem;
    color: var(--primary-saturated);
  }

  &-quantity-control {
    border-style: solid;
    border-width: 1px;
    border-color: var(--secondary)
  }

  &-quantity-btn {
    color: var(--body-color);
    &:hover {
      text-decoration: none;
    }

    &-minus {
      margin-right: 20px;
    }

    &-plus {
      margin-left: 20px;
    }
  }
}

.cart-product-image {
  max-width: 50px;
  max-height: 60px;
}

.cart-item-remove-button {
  position: absolute;
  top: 0;
  right: 0;

  line-height: 100%;
  color: var(--body-color);
}

footer.cart-footer {
  box-shadow: 0 -2px 8px rgba(43,46,43, 0.3);
}
</style>
