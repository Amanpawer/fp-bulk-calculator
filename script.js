const lineData = {

  fp01:["Pouch01","Pouch02","Pouch03"],

  fp02:["Ronchi Filler","Sachet01","Sachet02","Sachet03"],

  fp03:["Pouch04","Pouch05","Pouch06"]

};

let defaultSkuData = [

  {name:"0.05kg (55)",value:165},
  {name:"0.05kg (100)",value:300},

  {name:"0.5kg (130)",value:3900},

  {name:"0.85kg (130)",value:6630},

  {name:"1kg (40)",value:2400},
  {name:"1kg (130)",value:7800},

  {name:"2kg (31)",value:3720},

  {name:"2.5kg (55)",value:8250},

  {name:"3kg (25)",value:4500},

  {name:"3.2kg (25)",value:4800},

  {name:"4kg (21)",value:5040}

];

let skuData = JSON.parse(localStorage.getItem("skuData")) || defaultSkuData;

let lineSkuMap = JSON.parse(localStorage.getItem("lineSkuMap")) || {};

let selectedLines = [];

let operator = "";

function login(){

  operator = document.getElementById("operatorName").value;

  if(operator == ""){
    alert("Enter Operator Name");
    return;
  }

  document.getElementById("loginBox").style.display = "none";

  document.getElementById("step1").style.display = "block";

}

function goToLines(){

  let tank = document.getElementById("tank").value;

  if(tank == ""){
    alert("Select Tank");
    return;
  }

  document.getElementById("step2").style.display = "block";

  let html = "";

  lineData[tank].forEach(function(line){

    html += `
      <label>
        <input type="checkbox" value="${line}">
        ${line}
      </label>
    `;

  });

  document.getElementById("lineContainer").innerHTML = html;

}

function goToSKU(){

  selectedLines = [];

  let checkboxes = document.querySelectorAll("#lineContainer input[type='checkbox']:checked");

  if(checkboxes.length == 0){
    alert("Select At Least One Line");
    return;
  }

  checkboxes.forEach(function(cb){

    selectedLines.push(cb.value);

  });

  let html = "";

  selectedLines.forEach(function(line){

    let allowedSku = lineSkuMap[line] || skuData;

    let options = `<option value="0">Select SKU</option>`;

    allowedSku.forEach(function(item){

      options += `
        <option value="${item.value}">
          ${item.name}
        </option>
      `;

    });

    html += `
      <label>${line}</label>

      <select class="skuSelect">

        ${options}

      </select>
    `;

  });

  document.getElementById("step3").style.display = "block";

  document.getElementById("skuContainer").innerHTML = html;

}

function goToHours(){

  let valid = true;

  document.querySelectorAll(".skuSelect").forEach(function(drop){

    if(drop.value == "0"){
      valid = false;
    }

  });

  if(!valid){
    alert("Select SKU For All Lines");
    return;
  }

  document.getElementById("step4").style.display = "block";

}

function calculateBulk(){

  let hours = Number(document.getElementById("hours").value);

  if(hours <= 0){
    alert("Enter Valid Hours");
    return;
  }

  let total = 0;

  let summary = "";

  let allSku = document.querySelectorAll(".skuSelect");

  allSku.forEach(function(drop,index){

    total += Number(drop.value);

    let skuName = drop.options[drop.selectedIndex].text;

    summary += `
      ${selectedLines[index]} → ${skuName}<br>
    `;

  });

  total = total * hours;

  let mt = (total / 1000).toFixed(2);

  let tank = document.getElementById("tank").value.toUpperCase();

  document.getElementById("step5").style.display = "block";

  document.getElementById("result").innerHTML = `

    Operator : ${operator}<br><br>

    Tank : ${tank}<br><br>

    ${summary}<br>

    Running Hours : ${hours}<br><br>

    Total Bulk :
    ${total.toLocaleString()} KG<br><br>

    Total Bulk :
    ${mt} MT

  `;

}

function backTo1(){
  document.getElementById("step2").style.display = "none";
}

function backTo2(){
  document.getElementById("step3").style.display = "none";
}

function backTo3(){
  document.getElementById("step4").style.display = "none";
}

function resetAll(){
  location.reload();
}
