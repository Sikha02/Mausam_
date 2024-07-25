 
//     function mymap(){
       
        

//     L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

//     var myLayer = L.geoJSON(worldcountries,{
//         onEachFeature:function(feature,layer){
//             layer.bindPopup(feature.properties.ADMIN)
//             layer.on('click',function(e){
//                 fetch("http://api.weatherapi.com/v1/current.json?key=532e998330b74a29ba0172052232002&q="+feature.properties.ADMIN +"&aqi=no").then(res=>res.json()).then(data=>{
//                     var weather = "<div><p>Weather: <b>"+data.current.condition.text+ "</b><br>Temp:<b>"+data.current.temp_c+" </b> </p></div>";
//                     layer.bindPopup('<img src="https://flagcdn.com/80x60/'+feature.properties.ISO_A3+'.png" crossorigin="anonymous" width="35px" height="27px"/><h2 style="margin-top: 0.40em; margin-bottom: 0.4em;">'+feature.properties.ADMIN+'</h2>'+weather)
//                 }).catch(err=>console.log(err));
                
//             })
//         },style:{
//         fillColor:'yellow',
//         fillOpacity:0.2,
//         color: 'orange'
//     }}).addTo(map);

//     console.log(setView);
// }
//  mymap();
