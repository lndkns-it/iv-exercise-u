let data;

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function loadContent() {

    let bg = document.getElementById("background");
    let bgv = document.getElementById("backgroundVideo");
    
    setTimeout(() =>{
        bg.classList.remove("hide");
        bg.classList.add("flex");
        bg.classList.add("fadeIn");
        bgv.classList.remove("flex");
        bgv.classList.add("hide");
    }, 7000);


    setTimeout(() =>{
        let fm = document.getElementById("frame");

        fm.classList.remove("hide");
        fm.classList.add("fadeInLeft");
        fm.classList.add("flex");
        showIndex();

        readTextFile("data/data.json", function(text){
            data = JSON.parse(text);
            data = data.sort(function(a, b) {
                var dateA = new Date(a.datetime), dateB = new Date(b.datetime);
                return dateA - dateB;
            });

            let car = document.getElementById("carousel");
            let html = "";
            for (i = 0; i < data.length; i++) {
                html = html + `<li>
                    <div class="card" onclick="loadDetail(${data[i].id});">
                        <img src="img/thumbnail (${i + 1}).jpg" class="thumbnail">
                        <div class="description">
                            <div class="dtitle">${data[i].title}</div>
                            <div class="dtext">${data[i].content}</div>
                        </div>
                    </div>
                </li>`;
                car.innerHTML = html;
            }

            const root = document.documentElement;
            const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
            const marqueeContent = document.querySelector("ul#carousel.marquee-content");
            
            root.style.setProperty("--marquee-elements", marqueeContent.children.length);

            for(let i=0; i<marqueeElementsDisplayed; i++) {
                marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
            }
        });
    }, 6000);
}

function showIndex(){

    let ct = document.getElementById("content");
    let ttl = document.getElementById("title-container");
    let btn = document.getElementById("button");
    
    ct.classList.remove("hide");
    ct.classList.add("flex");
    ct.classList.add("fadeInBottom");
    ttl.classList.remove("hide");
    ttl.classList.add("fadeIn");
    ttl.classList.add("flex");
    btn.classList.remove("hide");
    btn.classList.add("fadeIn");
    btn.classList.add("flex");
}

function hideIndex(){

    let ct = document.getElementById("content");
    let ttl = document.getElementById("title-container");
    let btn = document.getElementById("button");

    ct.classList.remove("flex");
    ct.classList.add("hide");
    ct.classList.add("fadeOut");
    ttl.classList.remove("flex");
    ttl.classList.add("fadeOut");
    ttl.classList.add("hide");
    btn.classList.remove("flex");
    btn.classList.add("fadeOut");
    btn.classList.add("hide");

    ct.classList.remove("fadeOut");
    ttl.classList.remove("fadeOut");
    btn.classList.remove("fadeOut");
    
}

function loadDetail(id) {
    hideIndex();
    let dt = document.getElementById("detail");
    let dtt = document.getElementById("title-detail");
    let dtc = document.getElementById("content-detail");
    let vid = document.getElementById("videoDetail");

    dt.classList.remove("hide");
    dt.classList.add("fadeInBottom");
    dtt.classList.remove("hide");
    dtt.classList.add("fadeInBottom");
    dtc.classList.remove("hide");
    dtc.classList.add("fadeInBottom");

    let info = data.find(d => {
        return d.id === id;
    });
    setTimeout(() => {
        vid.classList.add("fadeIn");
        vid.setAttribute("src", `${info.video}?autoplay=1`);
    }, 2000);
    
    dtt.innerText = info.title;
    dtc.innerText = info.content;
}

function hideDetail() {
    let dt = document.getElementById("detail");
    let dtt = document.getElementById("title-detail");
    let dtc = document.getElementById("content-detail");
    let vid = document.getElementById("videoDetail");

    dt.classList.remove("fadeInBottom");
    dt.classList.add("fadeOut");
    dt.classList.add("hide");
    dtt.classList.remove("fadeInBottom");
    dtt.classList.add("fadeOut");
    dtt.classList.add("hide");
    dtc.classList.remove("fadeInBottom");
    dtc.classList.add("fadeOut");
    dtc.classList.add("hide");
    showIndex();

    dt.classList.remove("fadeOut");
    dtt.classList.remove("fadeOut");
    dtc.classList.remove("fadeOut");
    vid.removeAttribute("src");
}
