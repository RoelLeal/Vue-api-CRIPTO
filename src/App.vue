<template>
  <h1 class="container mt-3">Mis cripto | <strong>Shark11</strong></h1>
  <div class="container">
    <div class="row">
      <input type="text" 
       class="form-control bg-dark text-light rounded-0 border-0 mb-4 mt-1"
       placeholder="Buscar criptomoneda..."
       @keyup="buscarMoneda()"
       v-model="textSearch"/>
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr>
            <th v-for="title in titles" :key="title">
              {{title}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coin, index) in filteredCoins" :key="coin.id">
            <td class="text-muted">
              {{index + 1}}
            </td>
            <td>
              <img :src="coin.image" alt="Cripto" style="width: 2rem" class="me-1">
              <span>
                {{coin.name}}
              </span>
              <span class="ms-3 text-uppercase text-muted">
                {{coin.symbol}}
              </span>
              <img src="./assets/increase.png" alt="+" v-if="coin.price_change_24h > 0" style="width: 1.3rem" class="ms-3">
              <img src="./assets/decrease.png" alt="-" v-if="coin.price_change_24h < 0" style="width: 1.3rem" class="ms-3">
            </td>
            <td>
              $ {{coin.current_price}} USD
            </td>
            <td>
              <span v-if="coin.price_change_percentage_24h > 0" class="text-success">
                {{coin.price_change_percentage_24h}} %
              </span>
              <span v-if="coin.price_change_percentage_24h < 0" class="text-danger">
                {{coin.price_change_percentage_24h}} %
              </span>
            </td>
            <td>
              <span v-if="coin.price_change_24h > 0" class="text-success">
                {{coin.price_change_24h}}
              </span>
              <span v-if="coin.price_change_24h < 0" class="text-danger">
                {{coin.price_change_24h}}
              </span>
            </td>
            <td>
              {{coin.total_volume.toLocaleString()}} USD
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <h1 class="my-1 text-center">¿Cuánto ha crecido mi dinero? | <strong>Calculadora</strong></h1>
        <div class="col-md-6">
          <h5 class="my-2 text-center">Criptomoneda</h5>
          <input 
          name="seleCripto"
            type="text" 
            class="form-control mx-auto" 
            style="width: 70%;" 
            placeholder="Seleccionar criptomoneda..."
            v-model="textCripComp"
            @keyup="buscarMonedaComprada()">
          <h5 class="my-2 text-center">Precio de compra</h5>
          <input 
            type="text" 
            class="form-control mx-auto m-1" 
            style="width: 70%;"
            placeholder="Precio al comprar..."
            v-model="textPrecioCompra">
          <h5 class="my-2 text-center">Precio actual</h5>
          <input 
            type="text" 
            class="form-control mx-auto mb-5" 
            style="width: 70%;"
            placeholder="Precio al comprar..."
            v-model="textPrecioActual"
            @keyup="calcularGanancia()">

          <h4>{{calcularGanancia()}}</h4>    
          
        </div>
        <div class="col-md-6 mx-auto">
          <table class="table table-bordered my-2" >
            <thead class="table-dark">
              <tr>
                <th v-for="titles in titlesCalculadora" :key="titles">
                  {{titles}}
                </th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(coin, index) in filteredCompraCoin" :key="coin.id">
              <td class="text-muted">
                {{index + 1}}
              </td>
              <td>
                <img :src="coin.image" alt="Cripto" style="width: 2rem" class="me-1">
                <span>
                  {{coin.name}}
                </span>
                <span class="ms-3 text-uppercase text-muted">
                  {{coin.symbol}}
                </span>
                <img src="./assets/increase.png" alt="+" v-if="coin.price_change_24h > 0" style="width: 1.3rem" class="ms-3">
                <img src="./assets/decrease.png" alt="-" v-if="coin.price_change_24h < 0" style="width: 1.3rem" class="ms-3">
              </td>
              <td>
                $ {{coin.current_price}} USD
              </td>
            </tr>
          </tbody>
          </table>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',

  data(){
    return {
      coins: [],
      filteredCoins: [],
      filteredCompraCoin: [],
      titles: [
        '#',
        'Moneda',
        'Precio',
        'Porcentaje en 24h',
        'Cambio de precio en 24h',
        'Volumen 24h',
      ],
      titlesCalculadora: [
        '#',
        'Moneda',
        'Precio',
      ],
      textSearch: '',
      textCripComp: '',
      textPrecioCompra: '',
      textPrecioActual: '',
      total: ''
    }
  },
  async mounted(){
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    const data = await response.json()
    this.coins = data
    this.filteredCoins = data
    this.filteredCompraCoin = data
  },
  methods: {
    buscarMoneda(){
      this.filteredCoins = 
      this.coins.filter((coin) => 
      coin.name.toLowerCase().includes(this.textSearch.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.textSearch.toLowerCase()))
    },
    buscarMonedaComprada(){
      this.filteredCompraCoin = 
      this.coins.filter((coin) => 
      coin.name.toLowerCase().includes(this.textCripComp.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(this.textCripComp.toLowerCase()))
    },
    calcularGanancia: function(){
      return this.textPrecioCompra
    }
  }
}
</script>

<style>
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  }
</style>
