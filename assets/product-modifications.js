document.addEventListener('DOMContentLoaded', function () {
  let handBag;
  const prodSwatches = document.querySelector(".productSwatches");
  const prodSizeSelect = document.querySelector(".productSizeSelect");
  const swatchPrices = document.querySelector(".variantPrice");
  var selectedProduct = document.querySelector(".product__info-container");
  var getDataURL = selectedProduct.getAttribute("data-url");
  const getProductImage = document.querySelector(".product__media-wrapper");
  const buyBtns = document.querySelector(".buy-buttons");

  async function getProductData() {
    const response = await fetch(
      window.Shopify.routes.root + "products/black-leather-bag.js"
    );
    const handBag = await response.json();
    update(handBag);
  }

  if(getDataURL=="/products/black-leather-bag"){
    const variants = [
      {
        color: "Black",
        price: "20.00",
        img: "https://i.ibb.co/XCfcH8C/Black-Handbag.jpg",
      },
      {
        color: "Red",
        price: "9.99",
        img: "https://i.ibb.co/MfY35GX/Red-Handbag.jpg",
      },
      {
        color: "Tan",
        price: "1115.01",
        img: "https://i.ibb.co/Y7LCK45/Tan-Handbag.jpg",
      },
    ];

    let swatch;
    variants.forEach(element => {
      swatch = document.createElement("button")
      swatch.classList.add("swatch" + element.color, "swatch");
      // swatch.className = "swatch"
      swatch.innerHTML=`
        <img src="${element.img}" width="50px" height="50px">
      `
      prodSwatches.appendChild(swatch);
    });

    const swatches = document.querySelectorAll(".swatch")
    swatches.forEach(s => {
      s.addEventListener("click", () =>{
        swatches.forEach((btn) => {
          btn.style.backgroundColor = "";
        });
        // Set background color for the clicked button
        s.style.backgroundColor = "lightblue";
        if (s.classList.contains("swatchRed")) {
          swatchPrices.innerHTML = `$${variants[1].price} CAD`;
          getProductImage.innerHTML = `
            <img src="${variants[1].img}"/>
          `
        }
        else if (s.classList.contains("swatchTan")) {
          swatchPrices.innerHTML = `$${variants[2].price} CAD`;
          getProductImage.innerHTML = `
            <img src="${variants[2].img}"/>
          `;
        } else {
          swatchPrices.innerHTML = `$${variants[0].price} CAD`;
          getProductImage.innerHTML = `
            <img src="${variants[0].img}"/>
          `;
        } 
      })
    })

    let options;
    const sizeOptions = ["unselected", "small", "medium", "large"];
    let sizeSelector = document.createElement("select")
    sizeSelector.classList.add("sizeSelectOptions");
    
    sizeOptions.forEach(size =>{
      options = document.createElement("option")
      options.setAttribute("value", size);
      options.innerText = size;
      sizeSelector.appendChild(options);
    })
    prodSizeSelect.appendChild(sizeSelector);
    window.onload = () =>{
      buyBtns.disabled = true;
      sizeSelector.options[sizeSelector.selectedIndex].value == "unselected";
      sizeSelector.onchange = function(){
        if(sizeSelector.options[sizeSelector.selectedIndex].value == "unselected"){
          buyBtns.disabled = true;
        }
        else{
          buyBtns.disabled = false;
        }
      }
    }

    function update(object) {
      handBag = object;
      console.log(handBag);
    }
    //Calls the function that fetches the data
    getProductData()
  }
})

