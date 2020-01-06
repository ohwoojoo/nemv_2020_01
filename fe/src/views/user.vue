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
        user: 'postMan'
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
    }
  }
}
</script>
