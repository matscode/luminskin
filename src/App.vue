<template>
  <div id="app">
    <div class="bg-dark text-center text-light small py-1">
      <a href="#" class="get-free-trial-link text-light">
        Get Your Free Trial Today
      </a>
    </div>

    <Navigation></Navigation>

    <section class="container">
      <header class="products-banner">
        <section class="d-flex align-items-end">
          <section class="left-content">
            <h1 class="mb-4">
              All Products
            </h1>
            <p class="mb-0">
              A 360° look at Lumin
            </p>
          </section>
          <section class="right-content ml-auto">
            <section id="filterDropdown">
              <select name="filter" class="border p-3 bg-white">
                <option value="" disabled="disabled">Filter By</option>
                <option value="all-products">All Products</option>
                <option value="new-products">New Products</option>
                <option value="sets">Sets</option>
                <option value="skin-care">Skin Care</option>
                <option value="hari-body-care">Hair & Body Care</option>
              </select>
            </section>
          </section>
        </section>
      </header>
    </section>

    <main class="products-listing">
      <section class="container">
        <ApolloQuery
              :query="require('./graphql/GetProducts.gql')"
              :variables="{ currency: USD }"
            >
              <template slot-scope="{ result: { loading, error, data } }">
                <!-- Loading -->
                <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occured</div>

                <!-- Result -->
                <div v-else-if="data" class="result apollo">{{ data.products }}</div>

                <!-- No result -->
                <div v-else class="no-result apollo">No result :(</div>
              </template>
        </ApolloQuery>
      </section>
    </main>

    <!-- <router-view /> -->
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  name: 'LuminApp',
  components: { Navigation },
};
</script>

<style lang="scss">
:root {
  --primary: #3d5b57;
  --primary-saturated: #2B2E2B;
  --black: #000000;
  --secondary: #E2E6E3;
}

#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2, h3, h4 {
  font-family: 'Playfair Display', serif;
}

.material-icons {
  color: #000;
}

.get-free-trial-link {
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

#filterDropdown {
  position: relative;
    width: 300px;

  select {
    width: 100%;
    font-size: .9rem;
    color: var(--primary);
    border-color: var(--primary);
    appearance: none;

  }

  &::after {
    display: inline-block;
    position: absolute;
    top: 3px;
    right: 10px;
    width: 24px;
    height: 24px;
    transform: translateY(50%);
    content: '';
    background-image: url('assets/expand_more_black_24dp.svg');
  }
}

.products-listing {
  padding: {
    top: 70px;
    bottom: 70px;
  }
  background-color: var(--secondary);
}
</style>
