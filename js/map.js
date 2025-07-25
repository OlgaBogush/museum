export default function map() {

  mapboxgl.accessToken =
    "pk.eyJ1IjoiaXJpbmEyMjIiLCJhIjoiY2syOWljZjk0MDkzeTNvbWp3NnhlZm9ubCJ9.u-TAYkBs4q_st7exHmlCNg"
  
    const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v11",
    center: [2.3364, 48.86091],
    zoom: 15,
    attributionControl: false,
  })

  const marker1 = new mapboxgl.Marker({ color: "#333333" })
    .setLngLat([2.3364, 48.86091])
    .addTo(map)
  const marker2 = new mapboxgl.Marker({ color: "#999999" })
    .setLngLat([2.3333, 48.8602])
    .addTo(map)
  const marker3 = new mapboxgl.Marker({ color: "#999999" })
    .setLngLat([2.3397, 48.8607])
    .addTo(map)
  const marker4 = new mapboxgl.Marker({ color: "#999999" })
    .setLngLat([2.3330, 48.8619])
    .addTo(map)
  const marker5 = new mapboxgl.Marker({ color: "#999999" })
    .setLngLat([2.3365, 48.8625])
    .addTo(map)

  map.addControl(new mapboxgl.NavigationControl())
}
