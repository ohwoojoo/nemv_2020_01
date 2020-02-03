<template>
  <v-app>
    <v-navigation-drawer
      persistent
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-item
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-item-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-if="!$store.state.token" @click="$router.push('/sign')">
              <v-list-item-title>로그인</v-list-item-title>
            </v-list-item>
            <v-list-item v-else @click="signOut">
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 2017 {{$store.state.token}}</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'lv0',
          to: {
            path: '/'
          }
        },
        {
          icon: 'mdi-home',
          title: 'lv1',
          to: {
            path: '/lv1'
          }
        },
        {
          icon: 'mdi-home',
          title: 'lv2',
          to: {
            path: '/lv2'
          }
        },
        {
          icon: 'mdi-home',
          title: 'lv3',
          to: {
            path: '/lv3'
          }
        },
        {
          icon: 'mdi-face',
          title: '사용자 관리',
          to: {
            path: '/user'
          }
        },
        {
          icon: 'mdi-face',
          title: '페이지 관리',
          to: {
            path: '/page'
          }
        }
      ],
      title: this.$apiRootPath
    }
  },
  mounted () {
  },
  methods: {
    signOut () {
      // localStorage.removeItem('token')
      this.$store.commit('deleteToken')
      this.$router.push('/')
        // eslint-disable-next-line handle-callback-err
        .catch(err => {})
    }
  }
}
</script>
