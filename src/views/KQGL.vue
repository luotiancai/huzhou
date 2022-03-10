<template>
    <div id="mapContainer"></div>
    <button @click="test()" class="test">测试</button>
</template>

<script>
import L from 'leaflet'
import { onMounted } from 'vue'
export default {
  setup () {
    let map
    let cktkLayer
    const cktk1 = require('@/assets/cktk1.json')
    const cktk2 = require('@/assets/cktk2.json')
    const cktkStyle = {
      radius: 18,
      color: '#A0AAB4',
      weight: 6,
      opacity: 1,
      fillColor: '#C7DBEF',
      fillOpacity: 1
    }
    const cktkChoose = 2
    // 做替换的方法
    const test = () => {
      map.removeLayer(cktkLayer)
      // 做判断
      switch (cktkChoose) {
        case 1:
          cktkLayer = L.geoJSON(cktk1, {
            pointToLayer: (feature, latlng) => {
              return L.circleMarker(latlng, cktkStyle).bindTooltip(`${feature.properties.ZR}`, {
                permanent: true,
                direction: 'center',
                className: 'cktkLabel'
              })
            },
            onEachFeature: (feature, layer) => {
              const popupstring = `
          <div><span id='cr'>&nbsp&nbsp&nbsp&nbsp</span>已出让: ${feature.properties.YCR}</div>
          <div><span id='wcr'>&nbsp&nbsp&nbsp&nbsp</span>未出让: ${feature.properties.WCR}</div>`
              layer.on('mouseover', () => {
                layer.bindPopup(popupstring, {
                  className: 'crcbPopup'
                }).openPopup()
              })
              layer.on('mouseout', () => {
                layer.closePopup()
              })
              // const position = feature.coordinates
              layer.on('click', () => {
                map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 10)
                console.log(feature)
              })
            }
          }).addTo(map)
          break

        case 2:
          cktkLayer = L.geoJSON(cktk2, {
            pointToLayer: (feature, latlng) => {
              return L.circleMarker(latlng, cktkStyle).bindTooltip(`${feature.properties.ZR}`, {
                permanent: true,
                direction: 'center',
                className: 'cktkLabel'
              })
            },
            onEachFeature: (feature, layer) => {
              const popupstring = `
          <div><span id='cr'>&nbsp&nbsp&nbsp&nbsp</span>已出让: ${feature.properties.YCR}</div>
          <div><span id='wcr'>&nbsp&nbsp&nbsp&nbsp</span>未出让: ${feature.properties.WCR}</div>`
              layer.on('mouseover', () => {
                layer.bindPopup(popupstring, {
                  className: 'crcbPopup'
                }).openPopup()
              })
              layer.on('mouseout', () => {
                layer.closePopup()
              })
              // const position = feature.coordinates
              layer.on('click', () => {
                map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 10)
                console.log(feature)
              })
            }
          }).addTo(map)
          break
      }
    }
    window.wtf = () => {
      console.log('lty')
    }
    onMounted(() => {
      const xzbj = require('@/assets/xzbj.json')
      const cktk = require('@/assets/cktk.json')
      const ckq = require('@/assets/ckq.json')
      const ks = require('@/assets/ks.json')
      const xzbjStyle = {
        color: '#000000',
        weight: 1,
        opacity: 1,
        fillColor: '#C7DBEF',
        fillOpacity: 1
      }

      // 采矿
      const diffStyleFunc = (feature) => {
        if (feature.properties.stopyear < 2022) {
          return L.icon({
            iconUrl: require('@/assets/blackicon.png'),
            iconSize: [6, 9]
          })
        } else if (feature.properties.stopyear >= 2022 && feature.properties.stopyear < 2027) {
          return L.icon({
            iconUrl: require('@/assets/redicon.png'),
            iconSize: [6, 9]
          })
        } else {
          return L.icon({
            iconUrl: require('@/assets/yellowicon.png'),
            iconSize: [6, 9]
          })
        }
      }
      map = L.map('mapContainer', { crs: L.CRS.EPSG4326 }).setView([30.741, 119.917], 8)
      // 第一层-行政边界
      const xzbjLayer = L.geoJSON(xzbj, {
        style: xzbjStyle,
        onEachFeature: (feature, layer) => {
          layer.bindTooltip(feature.properties.COUNTY, {
            permanent: true,
            direction: 'center',
            className: 'countyLabel'
          })
        }
      }).addTo(map)
      // 第一层-数量
      cktkLayer = L.geoJSON(cktk, {
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, cktkStyle).bindTooltip(`${feature.properties.ZR}`, {
            permanent: true,
            direction: 'center',
            className: 'cktkLabel'
          })
        },
        onEachFeature: (feature, layer) => {
          const popupstring = `
          <div><span id='cr'>&nbsp&nbsp&nbsp&nbsp</span>已出让: ${feature.properties.YCR}</div>
          <div><span id='wcr'>&nbsp&nbsp&nbsp&nbsp</span>未出让: ${feature.properties.WCR}</div>`
          layer.on('mouseover', () => {
            layer.bindPopup(popupstring, {
              className: 'crcbPopup'
            }).openPopup()
          })
          layer.on('mouseout', () => {
            layer.closePopup()
          })
          // const position = feature.coordinates
          layer.on('click', () => {
            map.setView([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], 10)
            console.log(feature)
          })
        }
      }).addTo(map)
      console.log(xzbjLayer, cktkLayer)
      // 第二、三层-底图
      const dt = L.tileLayer('http://t0.tianditu.com/img_c/wmts?layer=img&style=default&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=tiles&TileMatrix={z}&TileCol={x}&TileRow={y}&tk=e022c817216dc927a53968b849762f6d',
        {
          maxZoom: 20,
          tileSize: 256,
          zoomOffset: 1
        })
      // // 第二层-采矿权点
      const ckqLayer = L.geoJSON(ckq, {
        pointToLayer: (feature, latlng) => {
          return L.marker(latlng, {
            icon: diffStyleFunc(feature)
          })
        },
        onEachFeature: (feature, layer) => {
          layer.bindPopup('<button onclick=\'wtf()\'>更多</button>', {
            className: 'gisModel'
          })
          layer.on('click', () => {
            // 点击进入详细页面
            console.log('aaa')
            layer.openPopup()
          })
        }
      })
      // // 第三层
      const ksLayer = L.geoJSON(ks, {
        onEachFeature: (feature, layer) => {
          const popupstring = feature.properties['矿山名']
          layer.on('click', () => {
            layer.bindPopup(popupstring).openPopup()
          })
          // layer.on('mouseout', () => {
          //   layer.closePopup()
          // })
        }
      })
      // 监听层级控制图层显隐
      map.on('zoomend', e => {
        if (e.target.getZoom() <= 8) {
          map.removeLayer(dt).addLayer(xzbjLayer).addLayer(cktkLayer).removeLayer(ckqLayer).removeLayer(ksLayer)
        } else if (e.target.getZoom() > 8 && e.target.getZoom() <= 14) {
          map.addLayer(dt).removeLayer(xzbjLayer).removeLayer(cktkLayer).addLayer(ckqLayer).removeLayer(ksLayer)
        } else {
          map.addLayer(dt).removeLayer(xzbjLayer).removeLayer(cktkLayer).removeLayer(ckqLayer).addLayer(ksLayer)
        }
      })
    })
    return {
      test
    }
  }
}
</script>

<style lang='scss'>
#mapContainer {
    height: 100%;
}
.countyLabel {
  font-size: 20px;
  font-weight: 800;
  background: rgba(255,255,255,0);
  border: 0;
  border-radius: 0;
  box-shadow: 0 0 0;
}
.cktkLabel {
  font-size: 15px;
  font-weight: 800;
  color: white;
  background: rgba(255,255,255,0);
  border: 0;
  border-radius: 0;
  box-shadow: 0 0 0;
}
.leaflet-popup-content-wrapper {
  background:rgba(100, 110, 120, 0.8);
  color: white;
  font-size: 14;
  width: 120px;
}
.leaflet-popup-tip {
  display: none;
}
.leaflet-popup-close-button {
  display: none;
}
#cr {
  margin-right: 10px;
  width: 1px;
  height: 1px;
  border: 0.01px solid rgb(95,144,238);
  border-radius: 50%;
  background-color: rgb(95,144,238);
}
#wcr {
  margin-right: 10px;
  width: 1px;
  height: 1px;
  border: 0.01px solid rgb(113,158,100);
  border-radius: 50%;
  background-color: rgb(113,158,100);
}
.test {
  position:absolute;
  z-index: 999;
  width: 5%;
  height: 5%;
}
.gisModel {
  .leaflet-popup-close-button {
    display: inline-block;
  }
}
</style>
