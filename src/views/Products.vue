<template>
  <div class="">
    <section class="container">
      <header class="products-banner">
        <section class="row align-items-end">
          <section class="left-content col-md-8">
            <h1 class="mb-4">
              All Products
            </h1>
            <p class="mb-0">
              A 360° look at Lumin
            </p>
          </section>

          <section class="right-content col-md-4 text-md-right">
            <Dropdown :options="[
            {value: 'all-products', text: 'All Products'},
            {value: 'new-products', text: 'New Products'},
            {value: 'sets', text: 'Sets'},
            {value: 'skin-care', text: 'Skin Care'},
            {value: 'hair-body-care', text: 'Hair & Body Care'},
            ]"
            placeholder="Filter by" root-class="w-100 mt-4"></Dropdown>
          </section>
        </section>
      </header>
    </section>

    <main class="products-listing">
      <section class="container">
        <div class="row">
          <div class="col-sm-6 col-md-4"
          v-for="product in products"
          :key="product.id">
            <section class="product">
              <section class="product-image-wrapper">
                <img :src="product.image_url" :alt="'...'">
              </section>
              <h5 class="product-title">
                {{ product.title }}
              </h5>
              <p class="product-price">
                From {{ $helpers.formatMoney(product.price, $store.state.currency) }}
              </p>

              <button class="btn add-to-cart-btn" @click="addProductToCart(product)">
                Add to Cart
              </button>

            </section>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';
import CartMixin from '@/mixins/CartMixin';
import { mapState } from 'vuex';

export default {
  name: 'Products',
  mixins: [CartMixin],
  components: { Dropdown },
  computed: mapState(['products']),
  mounted() {
    this.$store.dispatch('getProducts');
  },
};
</script>
