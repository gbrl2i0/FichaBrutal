const ArqButton = document.getElementById("ArqButton")
const loadText = document.getElementById("loadText")
const saveText = document.getElementById("saveText")
const saveHab = document.getElementsByClassName("habilidade")
const saveArq = document.getElementsByClassName("arquetipo")
const saveCheck = document.getElementsByClassName("saveCheck")
const savedText = document.getElementsByClassName("saveText")
const fichaButton = document.getElementById("Fichas")
let cacheFichas = []

const Arquetypes = ["Atleta",
    "Cético",
    "Esbelto",
    "Herói",
    "Nerd",
    "Inocente",
    "Relaxado",
    "Valentona"
];
const Bonus = [
        [document.getElementById("Agi"),document.getElementById("For")],
        [document.getElementById("Ast"),document.getElementById("Vig")],
        [document.getElementById("Car"),document.getElementById("Vig")],
        [document.getElementById("Ast"),document.getElementById("For")],
        [document.getElementById("Ast"),document.getElementById("Agi")],
        [document.getElementById("Ast"),document.getElementById("Car")],
        [document.getElementById("Car"),document.getElementById("Agi")],
        [document.getElementById("For"),document.getElementById("Vig")],
]

let currentArquetype;

function arquetype(arg){
    currentArquetype = arg;
    ArqButton.textContent=Arquetypes[currentArquetype];
    for(let i=0; i<Bonus.length;i++){Bonus[i][0].checked=false;Bonus[i][1].checked=false;}
    Bonus[arg][0].checked=true
    Bonus[arg][1].checked=true
    
}

function save(){
    

    let a = ""
    for (let i = 0; i<(saveArq.length);i++ ){
        a+=`${saveArq[i].textContent} `
    }
    for (let i = 0; i<(saveHab.length);i++ ){
        a+=`${saveHab[i].checked} `

    }

    for (let i = 0; i<(saveCheck.length);i++ ){
        a+=`${saveCheck[i].checked} `
    }

    for (let i = 0; i<(savedText.length);i++ ){
        // a+= savedText[i].value?`${savedText[i].value} `:'vazio '
        let temp = "";
        if (savedText[i]){
        for (let j = 0; j<(savedText[i].value.length);j++ ){
            temp += savedText[i].value.charAt(j)===" "?"_":savedText[i].value.charAt(j)
        }}
        a+= `${temp} `
    }
    let b =window.prompt("digite 'new' para criar uma nova ficha ou o numero da ficha à editar").toLowerCase()
    loadText.value=`${a} #`  
    if(b==="new"){localStorage['save'] += `${a} #`;
    let newFicha = document.createElement('button')
    newFicha.className = 'Ficha';
    newFicha.onclick = function(){load(false,cacheFichas[newFicha.textContent])}
    newFicha.textContent = `${document.getElementsByClassName("Ficha").length}`;

    newFicha.textContent = `${document.getElementsByClassName("Ficha").length}`;
    fichaButton.appendChild(newFicha)
    return}
    cacheFichas[Number(b)] = `${a} #`;


}

async function load(skip=false,load=loadText.value){
    let a =!skip? window.prompt("digite 'load' para confirmar").toLowerCase():"load"
    if (a === "load"){
    let temp=[];
    let t="";
    for(let i = 0; i<load.length;i++){
        if (load.charAt(i)!==" "){
            t+=load.charAt(i)
        }
        else{
            temp.push(t);
            t=""
        }
    }

    if(temp.length>=64){
    
    for (let i = 0; i<(saveArq.length);i++ ){
        saveArq[i].textContent = temp[0];
    }
    temp.splice(0,1)
    for (let i = 0; i<(saveHab.length);i++ ){
        saveHab[i].checked = temp[i]==='true'?true:false
    }
    temp.splice(0,saveHab.length)

    for (let i = 0; i<(saveCheck.length);i++ ){
        saveCheck[i].checked = temp[i]==='true'?true:false
    }
    temp.splice(0,saveCheck.length)

    for (let i = 0; i<(savedText.length);i++ ){
        let tempText = "";
        if (savedText[i]){
        for (let j = 0; j<(temp[i].length);j++ ){
            tempText += temp[i].charAt(j)==="_"?" ":temp[i].charAt(j)
        }}
        savedText[i].value=tempText
    }}
}
        
}
if (localStorage['save'])
{
    
    let temp = ""
    for(let i = 0; i < localStorage['save'].length;i++ ){
        temp+=localStorage['save'].charAt(i)
        
        if (localStorage['save'].charAt(i)==="#"){
            cacheFichas.push(temp)
            let newFicha = document.createElement('button')
            newFicha.className = 'Ficha';
            newFicha.onclick = function(){load(false,cacheFichas[newFicha.textContent])}
            newFicha.textContent = `${document.getElementsByClassName("Ficha").length}`;
            temp = ""
            fichaButton.appendChild(newFicha)

        }

}
}
    
if (localStorage['save']){
    loadText.value=localStorage['save'];load(true)


}
