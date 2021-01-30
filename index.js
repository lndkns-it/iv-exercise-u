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
    let fm = document.getElementById("frame");
    let ct = document.getElementById("content");
    let ttl = document.getElementById("title-container");
    let btn = document.getElementById("button");
    setTimeout(() =>{
        bg.classList.remove("hide");
        bg.classList.add("flex");
        bg.classList.add("fadeIn");
        bgv.classList.remove("flex");
        bgv.classList.add("hide");
    }, 7000);


    setTimeout(() =>{
        fm.classList.remove("hide");
        fm.classList.add("fadeInLeft");
        fm.classList.add("flex");
        ct.classList.remove("hide");
        ct.classList.add("flex");
        ct.classList.add("fadeInBottom");
        ttl.classList.remove("hide");
        ttl.classList.add("fadeIn");
        btn.classList.remove("hide");
        btn.classList.add("fadeIn");

        let data;

        readTextFile("data/data.json", function(text){
            data = JSON.parse(text);
            data = data.sort(function(a, b) {
                var dateA = new Date(a.datetime), dateB = new Date(b.datetime);
                return dateA - dateB;
            });
            console.log(data);

            let car = document.getElementById("carousel");
            let html = "";
            for (i = 0; i < data.length; i++) {
                html = html + `<li>
                    <div class="card">
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

