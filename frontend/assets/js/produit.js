var chosenProduct={};
var currentProductInCart=JSON.parse(localStorage.getItem('cart'));


/* 
cette fonction me permets de vérifier si le produit actuel est déjà dans le panier
*/ 
function checkCurrentProductInCart(){
  // cette variable sert au retour de valeur, si le produit n'est pas dans le panier
  var productInCart=false;
  // fonction pour vérifier si le panier n'est pas vide
  if (currentProductInCart != null && currentProductInCart.length > 0){
    // pour vérifier si le produit choisi est dans le panier
    for(let index in currentProductInCart){
      if (currentProductInCart[index]._id == chosenProduct._id){
        productInCart=true;
      }
    } 
  }
  // retourner le résultat vérifié
  return (productInCart);
}


/* 
cette fonction me permets de créer les details sur un produit
*/ 
//function createProductPage(chosenProduct) {
function createProductPage() {
  //creation de container de la page de produit   
  const productPage=document.getElementById("product-page");

  //création de l'élément div qui englobe les détails du produit
  const productBlock=document.createElement("div");
  productBlock.classList.add('row', 'container__product-details', 'rounded', 'shadow', 'm-5', 'p-3');

  // creation de l'enfants de elements div  id - product page
  productPage.appendChild(productBlock);

  // creation du block image
  const imageBlock=document.createElement("div");
  imageBlock.classList.add("col-5");

  // creation de l'enfants de elements div productBlock
  productBlock.appendChild(imageBlock);

  // creation de l'image de produit
  const productImage=document.createElement("img");
  productImage.classList.add('product-image', 'product-image-chair');
  productImage.src=chosenProduct.imageUrl;
  productImage.alt=chosenProduct.name;

  //creation de l'enfants de element imageBlock
  imageBlock.appendChild(productImage);

  //creation de element div productDescriptionBlock
  const productDescriptionBlock=document.createElement("div");
  productDescriptionBlock.classList.add("col-7");

  //creation de l'enfants de element div productBlock
  productBlock.appendChild(productDescriptionBlock);

  //creation de element div productNameBlock
  const productNameBlock=document.createElement("div");
  productNameBlock.classList.add('row', 'product-name');

  //creation de l'enfants de element div productDescriptionBlock
  productDescriptionBlock.appendChild(productNameBlock);

  //creation de element h5 productName
  const productName=document.createElement("h5");
  productName.classList.add('p-3', 'product-name-width');
  productName.innerText=chosenProduct.name;

  //creation de l'enfants de element div productNameBlock
  productNameBlock.appendChild(productName);

  //creation de element span productPrice
  const productPrice=document.createElement("span");
  productPrice.classList.add('p-3', 'product-price', 'product-name-width');
  productPrice.innerText=chosenProduct.price + "  \u20AC";

  //creation de l'enfants de element div productNameBlock
  productNameBlock.appendChild(productPrice);

  // creation de element div productNameBlockQuantity, deuxième ligne pour choisir la quantité et afficher le prix total
  const productNameBlockQuantity=document.createElement("div");
  productNameBlockQuantity.classList.add('row', 'product-name');  
  productDescriptionBlock.appendChild(productNameBlockQuantity);

  //creation de element span productQuantityRow, qui contient l'élément pour choisir la quantité
  const productQuantityRow=document.createElement("span");
  productQuantityRow.classList.add('p-3', 'product-name-width', 'font-weight-bold');
  productQuantityRow.innerText="Qté : ";
  productNameBlockQuantity.appendChild(productQuantityRow);

  //creation de element select productQuantitySelect, qui crée un menu pour choisir la quantité de produit
  const productQuantitySelect=document.createElement("select");
  productQuantitySelect.classList.add('form-control', 'mx-2', 'form-control-width');
  productQuantityRow.appendChild(productQuantitySelect);

  //creation des elements option productQuantitySelectOption, en utilisant la boucle pour créer jusqu'à 4 options pour la quantité
  for (let i = 1; i < 5; i++){
    const productQuantitySelectOption=document.createElement("option");
    productQuantitySelectOption.innerText=i.toString();
    productQuantitySelect.appendChild(productQuantitySelectOption);
  };
  // 
  productQuantitySelect.selectedIndex=chosenProduct.quantity - 1;
  //
  productQuantitySelect.addEventListener('change', function(e){
      chosenProduct.quantity=productQuantitySelect.selectedIndex + 1;
      chosenProduct.totalPrice=chosenProduct.price * chosenProduct.quantity;
      productQuantityTotalPrice.innerText="Prix total : " + chosenProduct.totalPrice + "  \u20AC";
  });

  // creation de element span productQuantityTotalPrice
  const productQuantityTotalPrice=document.createElement("span");
  productQuantityTotalPrice.classList.add('p-3', 'product-name-width', 'font-weight-bold');
  // compter le prix total
  productQuantityTotalPrice.innerText="Prix total : " + chosenProduct.totalPrice + "  \u20AC";
  productNameBlockQuantity.appendChild(productQuantityTotalPrice); 


  //creation de element div productDescriptionBox
  const productDescriptionBox=document.createElement("div");
  productDescriptionBox.classList.add('product-description', 'pt-4', 'pb-3');

  //creation de l'enfants de element div productDescriptionBlock
  productDescriptionBlock.appendChild(productDescriptionBox);

  //creation de element p productDescriptionText 
  const productDescriptionText=document.createElement("p");
  productDescriptionText.innerText=chosenProduct.description;

  //creation de l'enfants de element div productDescriptionBox
  productDescriptionBox.appendChild(productDescriptionText);
  
  // cet div contient de statut de produit et catégorie
  const productStatusAndCategory=document.createElement("div");
  productStatusAndCategory.classList.add('row');
  productDescriptionBlock.appendChild(productStatusAndCategory);


  //creation de element select customizationMenuBlock pour personnalisation de produit, menu déroulant
  const customizationMenuBlock=document.createElement("select");
  customizationMenuBlock.classList.add('form-select', 'form-select-sm', 'col-6', 'col-sm-6');

  //creation de l'enfants de element div productDescriptionBlock
  productStatusAndCategory.appendChild(customizationMenuBlock);

  //creation de element option customizationMenuOptionText
  const customizationMenuOptionText=document.createElement("option");
  customizationMenuOptionText.setAttribute("selected", "true");
  customizationMenuOptionText.innerText="Sélectionnez le type de vernis...";
  customizationMenuBlock.appendChild(customizationMenuOptionText);

  //une boucle pour obtenir une liste des éléments du menu déroulant (vernis) pour la personnalisation du produit choisi
  for (index in chosenProduct.varnish){
    //creation de element option dropdownMenuElement
    const dropdownMenuElement=document.createElement("option");
    dropdownMenuElement.classList.add("pl-2");
    dropdownMenuElement.setAttribute("value", chosenProduct.varnish[index]);
    dropdownMenuElement.innerText=chosenProduct.varnish[index];

    customizationMenuBlock.appendChild(dropdownMenuElement);
  }


  //creation de élément div statusProductCart pour afficher le statut de produit dans le panier
  const statusProductCart=document.createElement("div");
  statusProductCart.classList.add('col-6', 'col-sm-6', 'text-danger', 'pt-2');
  //
  if(checkCurrentProductInCart()){
    statusProductCart.innerText="Produit déjà dans le panier";
  }else{
    statusProductCart.innerText="";
  }
  productStatusAndCategory.appendChild(statusProductCart);

  //creation de élément div block, productButtonsBlock, qui contient les boutons "Retourner" et "Ajouter au panier"
  const productButtonsBlock=document.createElement("div");
  productButtonsBlock.classList.add('row', 'mt-4');
  //creation de l'enfants de element div productDescriptionBlock
  productDescriptionBlock.appendChild(productButtonsBlock);

  //creation de élément div productButtonsColumn, qui contient le bouton "Retourner"
  const productButtonsColumn=document.createElement("div");
  productButtonsColumn.classList.add("col");
  //creation de l'enfants de element div productButtonsBlock
  productButtonsBlock.appendChild(productButtonsColumn);

  //creation de élément a productButtonReturn
  const productButtonReturn=document.createElement("a");
  productButtonReturn.href="../index.html";
  productButtonReturn.classList.add('btn', 'btn-outline-secondary', 'btn-width');
  productButtonReturn.role="button";
  productButtonReturn.innerText="Retourner";
  //creation de l'enfants de element div productButtonsColumn
  productButtonsColumn.appendChild(productButtonReturn);

  //creation de élément div productButtonsColumnAjouter, qui contient le bouton "Ajouter au panier"
  const productButtonsColumnAjouter=document.createElement("div");
  productButtonsColumnAjouter.classList.add("col");
  //creation de l'enfants de element div productButtonsBlock
  productButtonsBlock.appendChild(productButtonsColumnAjouter);

  //creation de élément button productButtonAjouter
  const productButtonAjouter=document.createElement("button");
  productButtonAjouter.classList.add('btn', 'btn-outline-primary', 'btn-width');
  productButtonAjouter.innerText="Ajouter au panier";
  productButtonAjouter.disabled=checkCurrentProductInCart();
  //
  productButtonAjouter.addEventListener('click', function(e){
    addProductToCart(chosenProduct);
    location.reload();
    e.preventDefault();
   });

  //creation de l'enfants de element div productButtonsColumnAjouter
  productButtonsColumnAjouter.appendChild(productButtonAjouter);
}

/*
Cette fonction fait une requête Fetch API pour envoyer les détails de produit choisi depuis le serveur par son id
*/
function getChosenProduct(productId) {
    fetch("http://localhost:3000/api/furniture/" + productId)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      console.log("produit choisi : ", value);
      chosenProduct=value;
      //Quantité et prix total du produit choisi à ajouter aux informations du serveur
      chosenProduct.quantity=1;
      chosenProduct.totalPrice=chosenProduct.price * chosenProduct.quantity;
      console.log("chosenProduct : ", chosenProduct);
//      createProductPage(value);
      createProductPage();
    })
    .catch(function(err) {
      // Une erreur est survenue
    });
}

/*
Cette fonction permet de récupérer l'id du paramètre de l'URL pour renvoyer l'élément avec l'id correspondant
*/
function getIdParameterFromUrl(){

    const paramId=localStorage.getItem('chosenProductID');

    if (paramId==null){
        console.log("Paramètre d'identification introuvable");
    }else{
        console.log("paramId : ", paramId);
        getChosenProduct(paramId);
    }
}


/*
Fonction pour ajouter le produit actuellement sélectionné au panier et enregistre dans localStorage
*/
function addProductToCart(productToAdd){

  //permet de recuperer les produits qui sont dans le panier
  currentProductInCart=JSON.parse(localStorage.getItem('cart'));
  if (currentProductInCart==null){
      currentProductInCart=[];
      currentProductInCart.push(productToAdd);
      localStorage.setItem('cart', JSON.stringify(currentProductInCart));
  }else{
      currentProductInCart.push(productToAdd);
      localStorage.setItem('cart', JSON.stringify(currentProductInCart));
  }
    
  console.log("le produit a afficher dans le panier est : ", productToAdd);
}


/* 
cette fonction est de compter le nombre de produits ajoutés dans le panier et ajouter la somme à localStorage
*/
function getProductsCount(){
  var productsInCart=JSON.parse(localStorage.getItem('cart'));
  var sumOfQuantities=0;
  // fonction pour vérifier si le panier n'est pas vide
  if (productsInCart != null && productsInCart.length > 0){
    // pour vérifier si le produit choisi est dans le panier
    for(let index in productsInCart){
      sumOfQuantities=sumOfQuantities + productsInCart[index].quantity;
    }
  }
  localStorage.setItem('productsCount', sumOfQuantities.toString());
}

/* 
Cette fonction est d'afficher sur la page du produit, combien de produits sont dans le panier
*/
function showProductsCount(){
  const productsNumber=localStorage.getItem('productsCount');
  var cartNumber=document.getElementById('number-cart2');
  cartNumber.innerHTML= "(" + productsNumber + ")";
}


getIdParameterFromUrl();
getProductsCount();
showProductsCount();