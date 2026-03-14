const idealWardrobe = {

T恤:8,
衬衫:5,
裤子:8,
外套:8,
鞋子:6,
袜子:8,
内裤:8

}

function getCity(){

return localStorage.getItem("city") || "Tokyo"

}

function setCity(city){

localStorage.setItem("city",city)

}