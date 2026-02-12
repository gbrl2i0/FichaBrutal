const ArqButton = document.getElementById("ArqButton")
const loadText = document.getElementById("loadText")
const saveText = document.getElementById("saveText")
const saveHab = document.getElementsByClassName("habilidade")
const saveArq = document.getElementsByClassName("arquetipo")
const saveCheck = document.getElementsByClassName("saveCheck")
const savedText = document.getElementsByClassName("saveText")

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
        // console.log(saveArq[i].textContent);
        a+=`${saveArq[i].textContent} `
    }
    for (let i = 0; i<(saveHab.length);i++ ){
        // console.log(saveHab[i].checked);
        a+=`${saveHab[i].checked} `

    }

    for (let i = 0; i<(saveCheck.length);i++ ){
        // console.log(saveCheck[i].checked);
        a+=`${saveCheck[i].checked} `
    }

    for (let i = 0; i<(savedText.length);i++ ){
        // console.log(savedText[i].value);
        // a+= savedText[i].value?`${savedText[i].value} `:'vazio '
        let temp = "";
        if (savedText[i]){
        for (let j = 0; j<(savedText[i].value.length);j++ ){
            temp += savedText[i].value.charAt(j)===" "?"_":savedText[i].value.charAt(j)
            console.log(temp)
        }}
        a+= `${temp} `
    }
    loadText.value=`${a} #`  
}

function load(){
    let a = window.prompt("digite 'load' para confirmar").toLowerCase()
    if (a === "load"){
    let temp=[];
    let t="";
    for(let i = 0; i<loadText.value.length;i++){
        if (loadText.value.charAt(i)!==" "){
            t+=loadText.value.charAt(i)
        }
        else{
            temp.push(t);
            t=""
        }
    }

    if(temp.length>=64){
    
    for (let i = 0; i<(saveArq.length);i++ ){
        // console.log(saveArq[i].textContent);
        saveArq[i].textContent = temp[0];
    }
    temp.splice(0,1)
    for (let i = 0; i<(saveHab.length);i++ ){
        saveHab[i].checked = temp[i]==='true'?true:false
    }
    temp.splice(0,saveHab.length)

    for (let i = 0; i<(saveCheck.length);i++ ){
        // console.log(saveCheck[i].checked);
        saveCheck[i].checked = temp[i]==='true'?true:false
    }
    temp.splice(0,saveCheck.length)

    for (let i = 0; i<(savedText.length);i++ ){
        // console.log(savedText[i].value);
        let tempText = "";
        if (savedText[i]){
        for (let j = 0; j<(temp[i].length);j++ ){
            tempText += temp[i].charAt(j)==="_"?" ":temp[i].charAt(j)
            console.log(tempText)
        }}
        savedText[i].value=tempText
    }}
}
        
}