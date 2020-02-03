/* eslint-disable */
<template>
<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
        <v-flex xs12 sm6 md4 v-for="user in users" :key="user._id">
          <v-card
            class="mx-auto"
            max-width="400"
          >
            <v-card-title primary-title>
                <div>
                <h3 class="headline mb-0">{{user.id}}</h3>
                </div>
            </v-card-title>
            <v-card-text class="text--primary">
              <div>이름 : {{user.name}}</div>
              <div>권한 : {{user.lv}}</div>
              <div>나이 : {{user.age}}</div>
              <div>로그인 횟수 : {{user.inCnt}}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="orange" text @click="putDialog(user)">수정</v-btn>
              <v-btn color="error" text @click="delUser(user._id)">삭제</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12 sm6 md4>
                    <v-text-field
                    label="이름"
                    hint="홍길동"
                    persistent-hint
                    required
                    v-model="userName"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    :items="userLvs"
                    label="권한"
                    required
                    v-model="userLv"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-select
                    :items="userAges"
                    label="나이"
                    required
                    v-model= "userAge"
                    ></v-select>
                </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="putUser">Update</v-btn>
          <v-btn color="blue darken-1" text @click.native="dialog = false">Close</v-btn>
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
export default {
  data () {
    return {
      users: [],
      dialog: false,
      userName: '',
      userAges: [],
      userLvs: [],
      userAge: 0,
      userLv: 0,
      snackbar: false,
      sbMsg: '',
      putId: ''
    }
  },
  mounted () {
    for (let i = 10; i < 40; i++) this.userAges.push(i)
    for (let i = 0; i < 4; i++) this.userLvs.push(i)
    this.getUsers()
  },
  methods: {
    getUsers () {
      this.$axios.get(`${this.$apiRootPath}manage/user`)
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
      this.userLv = user.lv
      this.userAge = user.age
      this.dialog = true
    },
    putUser () {
      this.dialog = false
      this.$axios.put(`${this.$apiRootPath}manage/user/${this.putId}`, {
        name: this.userName, lv: this.userLv, age: this.userAge
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
      this.$axios.delete(`${this.$apiRootPath}manage/user/${id}`)
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
