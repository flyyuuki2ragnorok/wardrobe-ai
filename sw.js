const CACHE_NAME="wardrobe-cache-v1"

self.addEventListener("install",event=>{

event.waitUntil(

caches.open(CACHE_NAME).then(cache=>{

return cache.addAll([

"/",
"index.html",
"style.css",
"app.js",
"config.js"

])

})

)

})