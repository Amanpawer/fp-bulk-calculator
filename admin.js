const adminPassword = "aman@2004";

let skuData = JSON.parse(localStorage.getItem("skuData")) || [];

let lineSkuMap = JSON.parse(localStorage.getItem("lineSkuMap")) || {};

const allLines = [

  "Pouch01",
  "Pouch02",
  "Pouch03",

  "Ronchi Filler",
  "Sachet01",
  "Sachet02",
  "Sachet03",

  "Pouch04",
  "Pouch05",
  "Pouch06"

];

function login(){

  let pass = document.getElementById("password").value;

  if(pass == adminPassword){

    document.getElementById("loginBox").style.display = "none";

    document.getElementById("adminPanel").style.display = "block";

    showSKU();

  }

  else{

    alert("Wrong Password");

  }

}

function addSKU(){

  let name = document.getElementById("skuName").value;

  let value = document.getElementById("skuValue").value;

  if(name == "" || value == ""){
    alert("Fill All Fields");
    return;
  }

  skuData.push({
    name:name,
    value:value
  });

  saveData();

  showSKU();

}

function showSKU(){

  let html = "";

  skuData.forEach(function(item,index){

    html += `

      <tr>

        <td>${item.name}</td>

        <td>${item.value}</td>

        <td>

          <button onclick="manageLineSKU(${index})">

          Manage Lines

          </button>

        </td>

        <td>

          <button onclick="deleteSKU(${index})">

          Delete

          </button>

        </td>

      </tr>

    `;

  });

  document.getElementById("skuTable").innerHTML = html;

}

function deleteSKU(index){

  skuData.splice(index,1);

  saveData();

  showSKU();

}

function manageLineSKU(index){

  let sku = skuData[index];

  let selected = prompt(
    "Enter allowed lines separated by comma\n\nExample:\nPouch01,Pouch02",
    ""
  );

  if(selected == null){
    return;
  }

  let lineArray = selected.split(",");

  lineArray.forEach(function(line){

    line = line.trim();

    if(!lineSkuMap[line]){
      lineSkuMap[line] = [];
    }

    lineSkuMap[line].push(sku);

  });

  localStorage.setItem("lineSkuMap",JSON.stringify(lineSkuMap));

  alert("Line Mapping Saved");

}

function saveData(){

  localStorage.setItem("skuData",JSON.stringify(skuData));

}
function manageLineSKU(index){

  let sku = skuData[index];

  let currentLines = [];

  for(let line in lineSkuMap){

    lineSkuMap[line].forEach(function(item){

      if(item.name == sku.name){

        currentLines.push(line);

      }

    });

  }

  let html = "Select Allowed Lines:\n\n";

  allLines.forEach(function(line){

    let checked = currentLines.includes(line) ? "✅" : "❌";

    html += checked + " " + line + "\n";

  });

  let selected = prompt(
    html + "\n\nType lines separated by comma\nExample:\nPouch01,Pouch02"
  );

  if(selected == null){
    return;
  }

  // Remove old mapping

  for(let line in lineSkuMap){

    lineSkuMap[line] = lineSkuMap[line].filter(function(item){

      return item.name != sku.name;

    });

  }

  // Add new mapping

  let lineArray = selected.split(",");

  lineArray.forEach(function(line){

    line = line.trim();

    if(!lineSkuMap[line]){
      lineSkuMap[line] = [];
    }

    lineSkuMap[line].push(sku);

  });

  localStorage.setItem("lineSkuMap",JSON.stringify(lineSkuMap));

  alert("Line Mapping Updated");

}
