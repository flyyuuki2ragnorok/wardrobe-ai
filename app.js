function getWardrobe(){

let data=localStorage.getItem("wardrobe")

return data?JSON.parse(data):[]

}

function saveWardrobe(data){

localStorage.setItem("wardrobe",JSON.stringify(data))

}

function firstSetup(){

let w=getWardrobe()

if(w.length>0) return

let setup=document.getElementById("setup")

setup.innerHTML=`

<h2>首次导入衣柜</h2>

<p>请按照模板填写你的衣服</p>

<textarea id="importBox">
T恤,白,Jil Sander
T恤,黑,
衬衫,白,
裤子,黑,
鞋子,白,
</textarea>

<br>

<button onclick="importWardrobe()">导入</button>

`

}

function importWardrobe(){

let text=document.getElementById("importBox").value

let lines=text.split("\n")

let wardrobe=[]

lines.forEach((line,i)=>{

let p=line.split(",")

if(p.length>=2){

wardrobe.push({

id:i+1,
type:p[0],
color:p[1],
brand:p[2]||"",
wearCount:0

})

}

})

saveWardrobe(wardrobe)

location.reload()

}

function renderWardrobe(){

let wardrobe=getWardrobe()

let container=document.getElementById("wardrobe")

container.innerHTML=""

let types=[...new Set(wardrobe.map(x=>x.type))]

types.forEach(type=>{

let items=wardrobe.filter(x=>x.type==type)

let ideal=idealWardrobe[type]||"-"

let title=document.createElement("h3")

title.innerText=type+" "+items.length+"/"+ideal

container.appendChild(title)

items
.sort((a,b)=>b.wearCount-a.wearCount)
.forEach(item=>{

let div=document.createElement("div")

div.className="card"

div.innerHTML=`
${item.color} ${item.brand}
<br>
穿过 ${item.wearCount} 次
<br>
<button onclick="wear(${item.id})">今天穿了</button>
<button onclick="edit(${item.id})">编辑</button>
<button onclick="removeItem(${item.id})">删除</button>
`

container.appendChild(div)

})

})

}

function wear(id){

let wardrobe=getWardrobe()

let item=wardrobe.find(x=>x.id==id)

item.wearCount++

saveWardrobe(wardrobe)

renderWardrobe()

}

function edit(id){

let wardrobe=getWardrobe()

let item=wardrobe.find(x=>x.id==id)

let brand=prompt("品牌",item.brand)

item.brand=brand||""

saveWardrobe(wardrobe)

renderWardrobe()

}

function removeItem(id){

let wardrobe=getWardrobe()

wardrobe=wardrobe.filter(x=>x.id!=id)

saveWardrobe(wardrobe)

renderWardrobe()

}

function recommend(){

let wardrobe=getWardrobe()

let tshirt=wardrobe.filter(x=>x.type=="T恤")
let pants=wardrobe.filter(x=>x.type=="裤子")
let shoes=wardrobe.filter(x=>x.type=="鞋子")

if(!tshirt.length||!pants.length||!shoes.length){

document.getElementById("recommendation").innerText="衣服不足"

return

}

let t=tshirt[Math.floor(Math.random()*tshirt.length)]
let p=pants[Math.floor(Math.random()*pants.length)]
let s=shoes[Math.floor(Math.random()*shoes.length)]

document.getElementById("recommendation").innerText=
`推荐：${t.color}T恤 + ${p.color}裤子 + ${s.color}鞋`

}

function changeCity(){

let city=prompt("输入城市",getCity())

if(city){

setCity(city)

document.getElementById("cityLabel").innerText=city

}

}

function init(){

document.getElementById("cityLabel").innerText=getCity()

firstSetup()

renderWardrobe()

}

init()