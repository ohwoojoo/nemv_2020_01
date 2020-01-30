<template>
  <v-container>
    <!-- <v-btn @click="headerSend">임의 헤더 전송</v-btn>
    <v-btn @click="headerSend2">Auth 헤더 전송</v-btn>
    <v-btn @click="lsWrite">로컬스토리지 저장</v-btn>
    <v-btn @click="lsRead">로컬스토리지 읽기</v-btn>
    <v-btn @click="lsRemove">로컬스토리지 지우기</v-btn>
    <v-btn @click="lsClear">로컬스토리지 전체삭제</v-btn> -->
    <v-btn @click="apiWithToken">토큰과 함께 전송</v-btn>
    <v-btn @click="apiWithAlphabet">알파벳과 함께 전송</v-btn>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
//   mounted () {
//     if (!window.localStorage) pop('지원하지 않음')
//     // console.log(window.localStorage)
//     // console.log(localStorage)
//   },
  methods: {
    headerSend () {
      axios.get(`${this.$apiRootPath}test`, { headers: { abc: 1234 } })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    },
    headerSend2 () {
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: 'fake token!' } })
        .then(r => console.log(r))
        .catch(e => console.log(e))
    },
    lsWrite () {
      localStorage.setItem('token', 123) // local storage의 token에 '123' 저장
      localStorage.setItem('token123', 12345) // local storage의 token에 '123' 저장
    },
    lsRead () {
      console.log(localStorage.getItem('token')) // local storage의 token 읽기
    },
    lsRemove () {
      localStorage.removeItem('token') // local storage의 token 삭제
    },
    lsClear () {
      localStorage.clear() // local storage의 모든 키 삭제
    },
    apiWithToken () {
      const token = localStorage.getItem('token')
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: token } })
        .then(r => console.log(r.data))
        .catch(e => console.log(e.message))
    },
    apiWithAlphabet () {
      axios.get(`${this.$apiRootPath}test`, { headers: { Authorization: 'abcdefg' } })
        .then(r => console.log(r.data))
        .catch(e => console.error(e.message))
    }
  }
}
</script>
