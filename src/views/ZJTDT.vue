<template>
  <div id="mapContainer"></div>
</template>

<script>
import L from 'leaflet'
import Custom from '_a/js/CustomWebSDK.min.js'
import { onMounted } from 'vue'
export default {
  setup () {
    onMounted(() => {
      const map = L.map('mapContainer', { crs: L.CRS.EPSG4326 }).setView([30.741, 119.917], 8)
      const dzzhNew022Label = new L.GWVTAnno({
        tileSize: 512,
        zoomOffset: 1
      })
      const dataSource = new Custom.URLDataSource()
      dataSource.url = 'https://ditu.zjzwfw.gov.cn/mapserver/label/dzzhNew022/getData?x={x}&y={y}&l={z}&styleId=dzzhNew022&token=8be7ec4a7bbc2ca9c80724af11e00f90 '
      dzzhNew022Label.addDataSource(dataSource)
      console.log(dzzhNew022Label)
      map.addLayer(dzzhNew022Label)
    })
  }
}
</script>

<style>

</style>
