<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
html, body, #app, #cesiumContainer{
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  color:white;
}
</style>
