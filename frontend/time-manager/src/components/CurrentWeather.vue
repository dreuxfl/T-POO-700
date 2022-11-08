<template>
  <div>
    <select name="cities" id="city-select" v-model="selectedCity" >
      <option v-for="city in cities" :value="city.name" :key="city.name">
        {{city.name}}
      </option>
    </select>  
  </div>
  <button v-on:click=refresh()>Refresh</button>
  <div class="meteo">
    <h1 v-if="selectedCity != null">Météo actuelle à {{selectedCity}}</h1>
    <h1 v-else>Veuillez sélectionner une ville</h1>
    <p>Temperature : {{temperature}}°C</p>
    <p>Date : {{ new Date (Date.now())}}</p>
  </div>

</template>
  
<script>

export default {
  
  name: 'HelloWorld',
  data() {
    return {
      selectedCity: null,
      temperature: 0,
      cities: [{
        name: "Marseille"
      },{
        name: "Avignon"
      },{
        name: "Mornas"
      }]
    }
  },
  methods: {
    refresh(){
      if(this.selectedCity != null) this.temperature = Math.round(Math.random()*100) ;
    }
  },
  props: {
    city: String,
    date: Date
  }
}
</script>
  
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 40px 0 0;
}
select {
  width: 40%
}

</style>
