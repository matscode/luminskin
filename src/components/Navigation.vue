<template>
  <section class="fixed-top">
    <div class="text-center trial-notice" v-if="showTrialBar">
      <a href="#" class="get-free-trial-link">
        Get Your Free Trial Today
      </a>
    </div>

    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand d-none d-sm-inline-block" href="#">
          <img
            src="https://cdn.shopify.com/s/files/1/0044/1237/5107/files/logo-dark_ec479ecc-793e-4643-bd5b-bac40a841493.png?v=1598617182"
            alt="LUMIN"
            width="160"
          />
        </a>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="#">Shop</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Help</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Blog</a>
            </li>
          </ul>
        </div>

        <div class="ml-auto">
          <ul class="nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Account</a>
            </li>
            <li class="nav-item">
              <a class="nav-link cart-button" href="#" @click.prevent="openCart">
                <span class="material-icons">shopping_cart</span>
                <span class="cart-counter">
                  {{ $store.state.cartItems.length }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </section>
</template>

<script>
import CartMixin from '@/mixins/CartMixin';

export default {
  name: 'Navigation',
  mixins: [CartMixin],
  props: {
    showTrialBar: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
#navbarNav {
  margin-left: 30px;

  .navbar-nav {
    .nav-item {
      margin-left: 15px;
      margin-right: 15px;

      a {
        color: var(--body-color);
        &:hover {
          color: var(--primary);
        }
      }
    }
  }
}

.cart-button {
  position: relative;

  span.material-icons {
    transform: rotate(5deg);
  }

  .cart-counter {
    position: absolute;
    top: 0;
    right: 0.3rem;
    color: var(--black);
    font-weight: 300;
    font-size: 0.85rem;
  }
}
</style>
