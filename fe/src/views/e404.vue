<template>
  <v-container>
    <v-alert type="warning" :value="true">
      {{$route.path}} Page Not Found
    </v-alert>
  </v-container>
</template>
