const inner_raw = document.querySelector(".inner_raw")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
const page_count = document.querySelector(".page_count")
async function getPhoto(page){
   //console.log(numInc)
    const res = await fetch(`https://api.unsplash.com/photos/?client_id=vBpW6itM7zOyFCsTyc0jtLu16LqZhMxIUajQTB8NNi0&per_page=12&page=${page}&query=nas
    `)
    const photos = await res.json()
    return photos
}
function showGallery(photoArr){
    photoArr.forEach(photoObj => {
    const {urls:{small},user:{name,bio}}= photoObj
        let bioShort = bio!=null?bio.slice(1,30)+"....":bio
        let nameShort = name!=null?name.slice(1,15):name
        console.log(bioShort)
        inner_raw.insertAdjacentHTML("afterbegin",`<div class="col-md-2 col-12">
               <div class="img-div">
                    <img src="${small}" alt="" class="expand">
               </div>
               <h3>${nameShort}</h3>
               <p>${bioShort}</p>
               </div>
        `)
    });
}
async function run(page) {
        //get photos array from api
   
        const photos = await getPhoto(page)
        //extracting photo into pure objcet
      const allPhotos =  showGallery(photos)
      // console.log(allPhotos)
        
}
run(1)

let page = 1
page_count.textContent = page
function incNum() {
    inner_raw.innerHTML = ""
    page++
    page_count.textContent= page
    run(page)
}
next.addEventListener("click",incNum)
if (page==1) {
   prev.textContent
}
function decNum() {
    if (page===1) {
       return
    }
    inner_raw.innerHTML = ""
    page--
    page_count.textContent= page
    run(page)
    
}
prev.addEventListener("click",decNum)
//removing lightbox class
function rmvClass(e) {
   console.log(e.target.parentElement.children[1].classList.remove("show"))
   e.target.remove() 
}
//lightbox
function addClass(e){
    if(e.target.tagName =="IMG"){
        let img = e.target
        img.classList.add("show")
        img.insertAdjacentHTML("beforebegin",`<i class="fa-solid fa-xmark"></i>`)
        const cross = document.querySelector(".fa-xmark")
        img.parentElement.parentElement.parentElement.style.opcity="0.2"
        cross.addEventListener("click",rmvClass)

    }
}
inner_raw.addEventListener("click",addClass)



