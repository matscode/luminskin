<template>
  <div id="app">
    <div class="text-center trial-notice">
      <a href="#" class="get-free-trial-link">
        Get Your Free Trial Today
      </a>
    </div>

    <Navigation></Navigation>

    <Cart v-if="$store.getters.showCart"></Cart>

    <router-view />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';
import Cart from '@/components/Cart.vue';
import { mapState } from 'vuex';

export default {
  name: 'LuminApp',
  components: { Navigation, Cart },
  watch: {
    showCart(newValue) {
      const documentBody = document.querySelector('body');

      if (newValue === true) {
        // disable <body> scroll ability
        documentBody.style.overflow = 'hidden';
      } else {
        // enable <body> scroll ability
        documentBody.style.overflow = 'auto';
      }
    },
  },
  computed: mapState([
    'showCart',
  ]),
};
</script>

<style lang="scss">
:root {
  --primary: #3d5b57;
  --primary-saturated: #2B2E2B;
  --black: #000000;
  --secondary: #E2E6E3;
  --white: #ffffff;
  --button-color: #4B5548;
  --body-color: #0B0C0D;
  --card-background-color: #f2f2ef;
}

#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  color: var(--body-color);
}

h1, h2, h3, h4 {
  font-family: 'Playfair Display', serif;
}

.material-icons {
  color: #000;
}

.trial-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  background-color: var(--primary-saturated);
}

.get-free-trial-link {
  font-size: 0.7rem;
  color: var(--secondary);
  margin: 0;

  &:hover {
    text-decoration: none;
    color: var(--primary);
  }
}

.products-banner{
  padding: {
    top: 70px;
    bottom: 70px;
  }
}

.products-listing {
  padding: {
    top: 30px;
    bottom: 30px;
  }
  background-color: var(--secondary);

  .product {
    text-align: center;
    margin: {
      top: 50px;
      bottom: 50px;
    }

    .product-image-wrapper {
      width: 130px;
      height: 130px;
      padding: 30px;
      margin-bottom: 30px;

      display: inline-flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 100%;
      }
    }

    h5.product-title {
      font-size: 0.9em;
      color: var(--primary);
    }

    p.product-price {
      font-size: 1.1rem;
    }
  }
}

button.add-to-cart-btn,
button.cart-cta-btns {
  border-radius: 0;
  font-size: 0.8rem;
  padding: {
    top: 12px;
    bottom: 12px;
  }
}

button.add-to-cart-btn, button.checkout-page-btn {
  background-color: var(--button-color);
  color: var(--white);

  &:hover {
    background-color: var(--primary-saturated);
    color: var(--white);
  }
}

button.add-to-cart-btn {
  width: 70%;
}

button.checkout-page-btn,
button.subscription-btn {
  display: block;
  width: 100%;

  margin: {
    top: 20px;
    bottom: 20px;
  }

  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 2px;
}

button.subscription-btn {
  background-color: var(--white);
  color: var(--primary-saturated);
  border-color: var(--primary-saturated);
}
</style>
