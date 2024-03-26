var url="http://172.16.16.148:5000/api/Animals/"
var xhr=new XMLHttpRequest();
var adatok

var oszlopok = [
    {key:"id", text:"Azonosító", type:"plain"},
    {key:"name", text:"Név", type:"text"},
    {key:"age", text:"Életkor", type:"number"},
    {key:"color", text:"Szín", type:"text"},
]

xhr.onreadystatechange = function(){
    if ((xhr.readyState==4) && (xhr.status==200)){       
        adatok=JSON.parse(xhr.responseText)
        console.log(adatok)
        render()
    }
}

function render(){
    tablazat=document.getElementsByClassName("adatok")[0]
    tablazat.innerHTML=""
    // Fejléc kirajzolása
    let sor= document.createElement("div")
    sor.className="row"
    for (const oszlop of oszlopok) {
        let cella = document.createElement("div")
        cella.className="col"
        cella.classList.add("font-weight-bold")
        cella.innerHTML=oszlop.text
        sor.appendChild(cella)
    }   
    let cella = document.createElement("div")
    cella.className="col"
    cella.classList.add("font-weight-bold")
    cella.innerHTML="Műveletek"
    sor.appendChild(cella)
    tablazat.appendChild(sor)

    // Új macska hozzáadása
    sor= document.createElement("div")
    sor.className="row"      

    for (const oszlop of oszlopok) {
        let cella = document.createElement("div")
        cella.className="col"
        if (oszlop.type=='plain')
                cella.innerHTML=""
        else {

            cella.innerHTML=`
            <input id="${oszlop.key}" value="" type="${oszlop.type}" class="form-control">
            `
        }
        sor.appendChild(cella)
    }
    cella = document.createElement("div")
    cella.className="col"
    cella.innerHTML=`
    <button type="button" class="btn btn-primary">Hozzáadás</button>   `
    sor.appendChild(cella)
    tablazat.appendChild(sor)
    // Macskák kilistázása
    for (const macska of adatok) {
        let sor= document.createElement("div")
        sor.className="row"      

        for (const oszlop of oszlopok) {
            let cella = document.createElement("div")
            cella.className="col"
            if (oszlop.type=='plain')
                    cella.innerHTML=macska[oszlop.key]
            else {

                cella.innerHTML=`
                <input value="${macska[oszlop.key]}" type="${oszlop.type}" class="form-control">
                `
            }
            sor.appendChild(cella)
        }       

        let cella = document.createElement("div")
        cella.className="col"
        cella.innerHTML=`
        <button type="button" class="btn btn-primary">Szerkesztés</button>
        <button type="button" class="btn btn-secondary">Törlés</button>
`
        sor.appendChild(cella)

        tablazat.appendChild(sor)
    }
}

xhr.open("get",url,true)
xhr.send()