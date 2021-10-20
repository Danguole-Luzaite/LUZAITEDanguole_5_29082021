var listProductsInCart=JSON.parse(localStorage.getItem('cart'));
  console.log("voici le list de mes produits dans le panier ", listProductsInCart);


/*
Cette fonction crée une ligne pour un produit ajouté dans le tableau du panier avec ses informations 
et ses éléments pour modifier la quantité et bouton pour retirer le produit de la table
*/
function createCartTableRow(rowLineNumberString, chosenProduct){

   // création de l'élément tbody, shoppingCartTableBody, qui contient des rangées de produits ajoutés au panier
  const shoppingCartTableBody=document.getElementById("shopping-card-tablebody");

  // création de l'élément tr, ligne qui contient le contenu du produit dans le panier
  const productCartTableRow=document.createElement("tr");
  shoppingCartTableBody.appendChild(productCartTableRow);

  // création de l'élément th productCartRowNumber, qui affiche le numéro de ligne par ordre des produits dans le tableau
  const productCartRowNumber=document.createElement("th");
  productCartRowNumber.scope="row";
  productCartRowNumber.innerText=rowLineNumberString;
  productCartTableRow.appendChild(productCartRowNumber);

  // création de l'élément td cartTableImageColumn qui contient l'image du produit
  const cartTableImageColumn=document.createElement("td");
  productCartTableRow.appendChild(cartTableImageColumn);

  // création de l'élément img cartTableProductImage qui affiche l'image du produit
  const cartTableProductImage=document.createElement("img");
  cartTableProductImage.classList.add('img-thumbnail', 'img-fluid');
  cartTableProductImage.src=chosenProduct.imageUrl;
  cartTableProductImage.alt=chosenProduct.name;
  cartTableImageColumn.appendChild(cartTableProductImage);

  // création de l'élément td cartTableColumnNameId 
  const cartTableColumnNameId=document.createElement("td");
  productCartTableRow.appendChild(cartTableColumnNameId);

  // création de l'élément h5 cartTableProductName
  const cartTableProductName=document.createElement("h5");
  cartTableProductName.innerText=chosenProduct.name;
  cartTableColumnNameId.appendChild(cartTableProductName);

  // création de l'élément small cartTableProductId
  const cartTableProductId=document.createElement("small");
  cartTableProductId.classList.add("text-muted");
  cartTableProductId.innerText="Id : " + chosenProduct._id;
  cartTableColumnNameId.appendChild(cartTableProductId);

  // création de l'élément td cartTableColumnQuantity, qui contient le menu pour sélectionner la quantité pour le produit 
  const cartTableColumnQuantity=document.createElement("td");
  productCartTableRow.appendChild(cartTableColumnQuantity);

  // création de function qui ajoute select productQuantitySelect, qui crée un menu pour choisir la quantité de produit
  const productQuantitySelect=document.createElement("select");
  productQuantitySelect.classList.add('form-control', 'mx-2');
  cartTableColumnQuantity.appendChild(productQuantitySelect);

  //creation des elements option productQuantitySelectOption, en utilisant la boucle pour créer jusqu'à 4 options pour la quantité
  for (let i = 1; i < 5; i++){
    const productQuantitySelectOption=document.createElement("option");
    productQuantitySelectOption.innerText=i.toString();
    productQuantitySelect.appendChild(productQuantitySelectOption);
  };

  // pour faire que la valeur affichée dans productQuantitySelect corresponde à la valeur de chooseProduct.quantity
  productQuantitySelect.selectedIndex=chosenProduct.quantity - 1;

  // réaction à une valeur modifiée dans productQuantitySelect, lorsque l'utilisateur choisit la quantité
  productQuantitySelect.addEventListener('change', function(e){
      //modifier la quantité, quantity, actuelle de produits et les valeurs totales des prix, totalPrice
      chosenProduct.quantity=productQuantitySelect.selectedIndex + 1;
      chosenProduct.totalPrice=chosenProduct.price * chosenProduct.quantity;
      // compter le numéro d'index du produit actuelle tiré de productCartRowNumber, à partir de la liste de ProductsInCart 
      const currentProductIndex=parseInt(productCartRowNumber.innerText) - 1;
      // afficher les valeurs recalculées dans un tableau listProductsInCart
      listProductsInCart[currentProductIndex].quantity=chosenProduct.quantity;
      listProductsInCart[currentProductIndex].totalPrice=chosenProduct.totalPrice;
      // pour renouveler la valeur stockée dans localStorage
      localStorage.setItem('cart', JSON.stringify(listProductsInCart));
//      cartTableProductTotalPrice.innerText=chosenProduct.totalPrice + "  \u20AC";
      location.reload();
  });

  // création de l'élément td cartTableColumnProductTotalPrice 
  const cartTableColumnProductTotalPrice=document.createElement("td");
  productCartTableRow.appendChild(cartTableColumnProductTotalPrice);

  // création de l'élément div cartTableProductTotalPrice, qui compte le prix total d'un produit choisi 
  const cartTableProductTotalPrice=document.createElement("div");
  cartTableProductTotalPrice.innerText=chosenProduct.totalPrice + "  \u20AC";
  cartTableColumnProductTotalPrice.appendChild(cartTableProductTotalPrice);

  // création de l'élément td cartTableColumnButtonErase, qui contient le bouton "supprimer"
  const cartTableColumnButtonErase=document.createElement("td");
  productCartTableRow.appendChild(cartTableColumnButtonErase);

  // création de l'élément button cartTableProductButtonErase, pour supprimer le produit choisi dans le panier
  const cartTableProductButtonErase=document.createElement("button");
  cartTableProductButtonErase.classList.add('btn', 'btn-outline-danger');
  cartTableProductButtonErase.type="button";
  cartTableProductButtonErase.innerText="x Supprimer";
  cartTableProductButtonErase.addEventListener('click', function(e){
    // compter le numéro d'index du produit actuelle tiré de productCartRowNumber, à partir de la liste de ProductsInCart 
    const currentProductIndex=parseInt(productCartRowNumber.innerText) - 1;
    // effacer la ligne de produit actuelle
    listProductsInCart.splice(currentProductIndex, 1);
    // pour renouveler la valeur stockée dans localStorage
    localStorage.setItem('cart', JSON.stringify(listProductsInCart));
//    createCartTableBody();
    location.reload();
  });
  cartTableColumnButtonErase.appendChild(cartTableProductButtonErase);

};


/*
cette fonction compte et affiche le prix total de tous les produits dans le panier
*/
function getGrandTotalCost(){
  // crée une variable cumulative qui contient toute la somme des prix totaux
  var grandTotal=0;
  // Une boucle pour additionner tous les prix totaux des produits pour compter le prix total général
  for (let index in listProductsInCart){
    grandTotal=grandTotal + listProductsInCart[index].totalPrice;
  }
  // renvoie le coût total grand qui est converti en chaîne
  return(grandTotal.toString());
};


/*
cette fonction vérifie si les conditions pour passer une commande sont toutes remplies
*/
function checkOrderConditionsAreMet(){
  // cette variable contient le résultat total des conditions vérifiées
  var conditionsAreMet=true;
  
  conditionsAreMet=conditionsAreMet && (listProductsInCart != null);
  conditionsAreMet=conditionsAreMet && (listProductsInCart.length > 0);
  var inputElementValue=document.getElementById("surname").value;
  conditionsAreMet=conditionsAreMet && (inputElementValue != "" && inputElementValue != "Votre nom");
  inputElementValue=document.getElementById("city").value;
  conditionsAreMet=conditionsAreMet && (inputElementValue != "" && inputElementValue != "Votre ville");
  inputElementValue=document.getElementById("name").value;
  conditionsAreMet=conditionsAreMet && (inputElementValue != "" && inputElementValue != "Votre prénom");
  inputElementValue=document.getElementById("inputEmail").value;
  conditionsAreMet=conditionsAreMet && (inputElementValue != "" && inputElementValue != "Votre e-mail");
  // pour tester si l'email est écrit correctement en utilisant la méthode test()
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$");
  conditionsAreMet=conditionsAreMet && (emailPattern.test(inputElementValue));

  inputElementValue=document.getElementById("inputAddress").value;
  conditionsAreMet=conditionsAreMet && (inputElementValue != "" && inputElementValue != "Votre adresse");

  return(conditionsAreMet);
};


/*
cette fonction vérifie les conditions pour le bouton de commande, sinon - le bouton "commander" reste désactivé jusqu'à ce que toutes les conditions soient remplies
*/
function checkOrderButtonState(){
  const button=document.getElementById("button-order"); 
  button.disabled=!checkOrderConditionsAreMet(); 
};


/*
cette fonction crée une ligne qui contient le coût total général de tous les coûts totaux calculés des produits et un bouton de commande
*/
function createCartTableGrandTotal(){
  // création de l'élément div, shoppingCartTableGrandTotal, qui contient la ligne créée et ses éléments
  const shoppingCartTableGrandTotal=document.getElementById("grand-total");

  //crée un élément div cartTableGrandTotalColumn, qui contient le prix du grand total et le bouton pour commander
  const  cartTableGrandTotalColumn=document.createElement("div");
  cartTableGrandTotalColumn.classList.add("col");
  shoppingCartTableGrandTotal.appendChild(cartTableGrandTotalColumn);

  //crée un élément span cartTableGrandTotalCost
  const  cartTableGrandTotalCost=document.createElement("div");
  cartTableGrandTotalCost.classList.add('mr-3', 'font-weight-bold');  
  cartTableGrandTotalCost.innerText="Somme totale : " + getGrandTotalCost() + " \u20AC";
  cartTableGrandTotalColumn.appendChild(cartTableGrandTotalCost);

  //crée un élément div dans le formulaire cartTableOrderButtonForm
  const cartTableOrderButtonForm=document.getElementById("order-submit-button");

  //crée un élément button cartTableOrderButton
  const cartTableOrderButton=document.createElement("button");
  cartTableOrderButton.setAttribute("id", "button-order");
  cartTableOrderButton.type="submit";
  cartTableOrderButton.classList.add('btn', 'btn-lg', 'px-5', 'float-right', 'btn-outline-primary');
  cartTableOrderButton.innerText="Commander";

  // appelle la fonction pour vérifier si toutes les conditions nécessaires seront remplie pour déverrouiller le bouton pour commander

  cartTableOrderButton.addEventListener('click', function(e){
    if(checkOrderConditionsAreMet()){
      // l’objet contact envoyé au serveur
      var orderRequestDetails={};
    
      orderRequestDetails.contact=createContactObject();
      orderRequestDetails.products=createProductsIdArray();

      console.log("orderRequestDetails", orderRequestDetails);

      // appelez la fonction pour envoyer l’objet contact
      processOrderRequest(orderRequestDetails);
    }else{
      alert("Pour finaliser votre commande, il doit y avoir au moins un article dans votre panier et toutes les coordonnées demandées doivent être saisies correctement dans le formulaire.");
//      e.preventDefault();
    }; 
  });
  cartTableOrderButtonForm.appendChild(cartTableOrderButton);

};

/* 
Cette fonction crée un objet pour le contact, les informations des utilisateurs, pour être utilisé ultérieurement pour l'envoyer au serveur
*/
function createContactObject(){
  var contactObject={};

  contactObject.firstName=document.getElementById("name").value;
  contactObject.lastName=document.getElementById("surname").value;
  contactObject.address=document.getElementById("inputAddress").value;
  contactObject.city=document.getElementById("city").value;
  contactObject.email=document.getElementById("inputEmail").value;

  console.log("contactObject", contactObject);
  return (contactObject);
};

/* 
Cette fonction crée un tableau des produits ajoutés au panier, à utiliser ultérieurement pour l'envoyer au serveur
*/
function createProductsIdArray(){
  var productsIdArray=[];
  var productsArray=JSON.parse(localStorage.getItem("cart"));

  for (let index in productsArray){
    productsIdArray.push(productsArray[index]._id);
  };
  console.log("productsIdArray", productsIdArray);
  return (productsIdArray);
};


/*
Cette fonction fetch avec la méthode "POST" pour envoyer les détails de la demande de commande et recevoir une réponse du serveur
*/
function processOrderRequest(orderRequestDetails){
  fetch("http://localhost:3000/api/furniture/order", {
			method: "POST",
			headers: { 
		'Accept': 'application/json', 
		'Content-Type': 'application/json' 
		},
			body: JSON.stringify(orderRequestDetails)
		}).then(
			(resp) => {
        if (resp.ok){
          console.log("resp ok");
          return resp.json(); 
        }else{
          console.log("resp not ok");
        }
			}
		).then(
			(resp)=>{
        console.log("Order response : ", resp);
				// pour enregistrer la réponse du serveur dans le stockage local
        localStorage.setItem('orderResponse', JSON.stringify(resp));
				// appel la page de confirmation
        window.location.assign("../views/page_de_confirmation.html");
			}
		).catch(function(err){
      console.log("error", err);
    });		
};



/*
fonction créant une ligne vide lorsqu'il n'y a aucun produit ajouté au panier
*/
function createCartTableGrandTotalZero(){

  // création de l'élément div, shoppingCartTableGrandTotal, qui contient 
  const shoppingCartTableGrandTotal=document.getElementById("grand-total");

  //crée un élément div cartTableGrandTotalColumn, qui contient le prix du grand total et le bouton pour commander
  const  cartTableGrandTotalColumn=document.createElement("div");
  cartTableGrandTotalColumn.classList.add("col");
  shoppingCartTableGrandTotal.appendChild(cartTableGrandTotalColumn);

  //crée un élément span cartTableGrandTotalCost
  const  cartTableGrandTotalCost=document.createElement("div");
  cartTableGrandTotalCost.classList.add('mr-3', 'font-weight-bold');
  cartTableGrandTotalCost.innerText="Somme totale : 0  \u20AC";
  cartTableGrandTotalColumn.appendChild(cartTableGrandTotalCost);

  //crée un élément div dans le formulaire cartTableOrderButtonForm
  const cartTableOrderButtonForm=document.getElementById("order-submit-button");

  //crée un élément button cartTableOrderButton
  const cartTableOrderButton=document.createElement("button");
  cartTableOrderButton.type="submit";
  cartTableOrderButton.classList.add('btn', 'btn-lg', 'px-5', 'float-right', 'btn-outline-primary');
  cartTableOrderButton.innerText="Commander";
  cartTableOrderButton.disabled=true;
  cartTableOrderButtonForm.appendChild(cartTableOrderButton);
};


/* 
cette function me permets de créer le corps de la table du panier si le panier n'est pas vide et appelle la fonction createcartTableGrandTotal
*/ 
function createCartTableBody(){
  // pour vérifier si le panier a des produits ajoutés ou s'il est vide
  if (listProductsInCart==null || listProductsInCart.length == 0){
      // le panier vide, le contenu du produit n'est pas créé
      createCartTableGrandTotalZero();
  }else{
      // le panier n'est pas vide
      const rowCount=listProductsInCart.length;
      var rowLineNumber=1;
      for (let i=0; i<rowCount; i++){
        rowLineNumber=i + 1;
        createCartTableRow(rowLineNumber.toString(), listProductsInCart[i]);
      }
      createCartTableGrandTotal();
  }
};

createCartTableBody();
