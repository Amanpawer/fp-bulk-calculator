const adminPassword = "aman123";

let skuData = JSON.parse(localStorage.getItem("skuData")) || [

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
    value:Number(value)

  });

  saveData();

  showSKU();

  document.getElementById("skuName").value = "";

  document.getElementById("skuValue").value = "";

}

function showSKU(){

  let html = "";

  skuData.forEach(function(item,index){

    html += `

      <div class="box">

        <h3>${item.name}</h3>

        <p>KG/Hour : ${item.value}</p>

    `;

    allLines.forEach(function(line){

      let checked = false;

      if(lineSkuMap[line]){

        checked = lineSkuMap[line].some(function(sku){

          return sku.name == item.name;

        });

      }

      html += `

        <label>

          <input
            type="checkbox"
            ${checked ? "checked" : ""}
            onchange="toggleLineSKU('${line}',${index},this)"
          >

          ${line}

        </label>

      `;

    });

    html += `

        <button onclick="deleteSKU(${index})">

        Delete SKU

        </button>

      </div>

    `;

  });

  document.getElementById("skuTable").innerHTML = html;

}

function toggleLineSKU(line,index,checkbox){

  let sku = skuData[index];

  if(!lineSkuMap[line]){
    lineSkuMap[line] = [];
  }

  if(checkbox.checked){

    let alreadyExists = lineSkuMap[line].some(function(item){

      return item.name == sku.name;

    });

    if(!alreadyExists){

      lineSkuMap[line].push(sku);

    }

  }

  else{

    lineSkuMap[line] = lineSkuMap[line].filter(function(item){

      return item.name != sku.name;

    });

  }

  localStorage.setItem(

    "lineSkuMap",

    JSON.stringify(lineSkuMap)

  );

}

function deleteSKU(index){

  let skuName = skuData[index].name;

  skuData.splice(index,1);

  for(let line in lineSkuMap){

    lineSkuMap[line] = lineSkuMap[line].filter(function(item){

      return item.name != skuName;

    });

  }

  saveData();

  localStorage.setItem(

    "lineSkuMap",

    JSON.stringify(lineSkuMap)

  );

  function showSKU(){

  let html = "";

  skuData.forEach(function(item,index){

    html += `

      <div class="box">

        <h3>${item.name}</h3>

        <p>KG/Hour : ${item.value}</p>

        <details>

          <summary
            style="
              background:#00b894;
              padding:10px;
              border-radius:8px;
              cursor:pointer;
              margin-bottom:10px;
            "
          >

            Select Lines

          </summary>

    `;

    allLines.forEach(function(line){

      let checked = false;

      if(lineSkuMap[line]){

        checked = lineSkuMap[line].some(function(sku){

          return sku.name == item.name;

        });

      }

      html += `

        <label
          style="
            display:block;
            margin:10px;
            text-align:left;
          "
        >

          <input
            type="checkbox"
            ${checked ? "checked" : ""}
            onchange="toggleLineSKU('${line}',${index},this)"
          >

          ${line}

        </label>

      `;

    });

    html += `

        </details>

        <button onclick="deleteSKU(${index})">

        Delete SKU

        </button>

      </div>

    `;

  });

  document.getElementById("skuTable").innerHTML = html;

}
