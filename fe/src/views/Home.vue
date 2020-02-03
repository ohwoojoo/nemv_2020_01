<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <v-btn color="error" @click="delAll">데이터베이스 전체 삭제</v-btn>
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
    // test () {
    //   this.$store.state.token = 444
    // },
    delAll () {
      this.$axios.delete(`${this.$apiRootPath}test.delAll`, { headers: { Authorization: localStorage.getItem('token') } })
        .then(r => {
          this.msg = r.data.msg
        })
        .catch(e => {
          this.msg = e.message
        })
    }
  }
}
</script>
