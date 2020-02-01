<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <v-btn @click="test">CHANGE</v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    test () {
      this.$store.state.token = 444
    }
  }
}
</script>
