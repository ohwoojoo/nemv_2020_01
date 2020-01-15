/* eslint-disable */
<template>
<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
        <!-- <v-flex xs12 sm3>
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
        </v-flex> -->
        <v-flex xs12 sm6 md4 v-for="user in users" :key="user._id">
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-card-text class="text--primary">
              <div>{{user.name}}</div>
              <div>{{user.age}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text @click="putDialog(user)">수정</v-btn>
              <v-btn color="error" text @click="delUser(user._id)">삭제</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-btn
          absolute
          dark
          fab
          bottom
          right
          color="pink"
          @click="mdUp"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="userAges"
                  label="Age*"
                  required
                  v-model= "userAge"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="putUser">Update</v-btn>
          <v-btn color="blue darken-1" text @click="postUser">Save</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
    >
      {{ sbMsg }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
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
      deleteModel: '',
      dialog: false,
      userName: '',
      userAge: 0,
      userAges: [

      ],
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    this.getUsers()
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
        name: '가정', age: 333
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
      axios.post('http://localhost:3000/api/user', {
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
      axios.get('http://localhost:3000/api/user')
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
      axios.put(`http://localhost:3000/api/user/${this.putId}`, {
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
      axios.delete(`http://localhost:3000/api/user/${id}`)
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
