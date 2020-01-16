/* eslint-disable */
<template>
<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
        <v-flex xs12 sm3>
            <v-card>
                <v-card-title>
                    <div>
                        <h3 class="pb-0">get</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-textarea v-model="getModel"/>
                </v-card-text>
                <v-card-actions>
                <v-btn color="orange" text @click="getReq">submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex xs12 sm3>
            <v-card>
                <v-card-title>
                    <div>
                        <h3 class="pb-0">post</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-textarea v-model="postModel"/>
                </v-card-text>
                <v-card-actions>
                <v-btn color="orange" text @click="postReq">submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex xs12 sm3>
            <v-card>
                <v-card-title>
                    <div>
                        <h3 class="pb-0">put</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-textarea v-model="putModel"/>
                </v-card-text>
                <v-card-actions>
                <v-btn color="orange" text @click="putReq">submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex xs12 sm3>
            <v-card>
                <v-card-title>
                    <div>
                        <h3 class="pb-0">delete</h3>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-textarea v-model="deleteModel"/>
                </v-card-text>
                <v-card-actions>
                <v-btn color="orange" text @click="deleteReq">submit</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      getModel: '',
      postModel: '',
      putModel: '',
      deleteModel: ''
    }
  },
  mounted () {
  },
  methods: {
    getReq () {
      axios.get('http://localhost:3000/api/user', {
        user: 'getMan'
      })
        .then((r) => {
          this.getModel = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    postReq () {
      axios.post('http://localhost:3000/api/user', {
        // user: 'postMan'
        name: '가정',
        age: '333'
      })
        .then((r) => {
          this.postModel = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    putReq () {
      axios.put('http://localhost:3000/api/user/', {
        user: 'putMan'
      })
        .then((r) => {
          this.putModel = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    deleteReq () {
      axios.delete('http://localhost:3000/api/user')
        .then((r) => {
          this.deleteModel = JSON.stringify(r.data)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    mdUp () {
      this.userName = ''
      this.userAge = ''
      this.dialog = true
    },
    postUser () {
      // console.log(this.userName, this.userAge)
      this.dialog = false
      axios.post('/api/user', {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.pop('사용자 등록 완료')
          this.getUsers()
        })
        .catch((e) => {
          // console.error(e.message)
          this.pop(e.message)
        })
    },
    getUsers () {
      axios.get('/api/user')
        .then((r) => {
          // console.log(r.data)
          this.users = r.data.users
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    putDialog (user) {
      this.putId = user._id
      this.userName = user.name
      this.userAge = user.age
      this.dialog = true
    },
    putUser () {
      this.dialog = false
      axios.put(`/api/user/${this.putId}`, {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.pop('사용자 수정 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    delUser (id) {
      axios.delete(`/api/user/${id}`)
        .then((r) => {
          this.pop('사용자 삭제 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.pop(e.message)
        })
    },
    pop (msg) {
      this.snackbar = true
      this.sbMsg = msg
    }
  }
}
</script>
