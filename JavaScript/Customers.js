//-------------- Home Page --------------

//Search function
function searchAboutItems() {
    var input = document.getElementById("Search");
    //filter the input by disabling the case-sensitive.
    var filter = input.value.toLowerCase();
    var specificItem = document.getElementsByClassName('specificItem');

    for (i = 0; i < specificItem.length; i++) {
        if (specificItem[i].innerText.toLowerCase().includes(filter)) {
            specificItem[i].style.display = "block";
        } else {
            specificItem[i].style.display = "none";
        }
    }
}
//----------------------------------------------

// Get the items from the local storage and show them in HomePage. 
function ShowItemsIntheHomePage() {
    let StoredFoodData = localStorage.getItem("itemInStorage");
    StoredFoodData = JSON.parse(StoredFoodData);
    //select each button with class "itemTypeBtn"
    var itemTypeBtn = document.querySelectorAll(".itemTypeBtn");
    let itemTypeDiv = document.querySelector(".itemTypeDiv");
    //check if the HomePage is currently used, not other
    if (StoredFoodData && itemTypeDiv) {
        //Creating a loop for each button
        for (let i = 0; i < itemTypeBtn.length; i++) {
            itemTypeBtn[i].addEventListener('click', () => {
                itemTypeDiv.innerHTML = '';
                Object.values(StoredFoodData).map(item => {
                    if (item.ItemType == itemTypeBtn[i].textContent) {

                        itemTypeDiv.innerHTML += `
                      <div class="col specificItem">
              <div class="card shadow-sm">
              <span style="display:none">${item.itemCode}</span>
                <div class="card-body">
                  <span class="card-text">${item.itemName}</span>
                  <p class="text-muted">${item.ItemDetails}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    
                    <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary btnAddtoCart">Add to Cart</button>
                    </div>
                    <label class="price" >$${item.price}</label>
                  </div>
                </div>
              </div>
            </div>
                    `
                    }

                });

                AddCartButtons();
            })
        }
    }
}
//---------------------------------------------------
// AddCartButtons() to add Items from the Html content to the local storage (cartItems) 
//which belongs to customer cart.
function AddCartButtons() {
    let AddButtons = document.querySelectorAll('.btnAddtoCart');

    for (let i = 0; i < AddButtons.length; i++) {
        AddButtons[i].addEventListener('click', () => {
            //Get the specific items' values from text content by using multiple parentElement 
            //and select the html element
            let itemCode = AddButtons[i].parentElement.parentElement.parentElement.parentElement.querySelector('span').textContent;
            let itemName = AddButtons[i].parentElement.parentElement.parentElement.querySelector('span').textContent;
            let price = AddButtons[i].parentElement.parentElement.querySelector('label').textContent.trim().replace('$', '');;
            price = parseInt(price);

            let ItemDetails = AddButtons[i].parentElement.parentElement.parentElement.querySelector('p').textContent;
            //Create an object to deal with several inputs
            var cartItems = {
                itemCode: itemCode,
                itemName: itemName,
                price: price,
                ItemDetails: ItemDetails,
                ItemQuantity: 1
            }

            let CartFoodData = localStorage.getItem("cartItems");
            CartFoodData = JSON.parse(CartFoodData);

            if (CartFoodData != null) {

                if (CartFoodData[cartItems.itemCode] == undefined) {
                    CartFoodData = {
                        //use ... 3 dots to insert new item array to CartFoodData.
                        ...CartFoodData,
                        [cartItems.itemCode]: cartItems
                    }
                    let totalPrice = localStorage.getItem("totalPrice");
                    //calculate the total price
                    if (totalPrice != null) {
                        totalPrice = parseInt(totalPrice);
                        localStorage.setItem("totalPrice", totalPrice + price);
                    }

                    //count the cart numbers
                    let cartNumbers = localStorage.getItem("cartNumbers");
                    cartNumbers = parseInt(cartNumbers);
                    //if cartNumbers exists, increment the value 
                    //and show them in span element by using textContent
                    if (cartNumbers) {
                        localStorage.setItem('cartNumbers', cartNumbers + 1);
                        document.querySelector('.cartNums span').textContent = cartNumbers + 1;
                    }

                }
                else {
                    alert("The item is already in the cart.")
                }
            }
            else {

                CartFoodData = {
                    [cartItems.itemCode]: cartItems
                }
                //store the new value (saving the changes)
                localStorage.setItem("totalPrice", cartItems.price);
                localStorage.setItem('cartNumbers', 1);
                document.querySelector('.cartNums span').textContent = 1;

            }
            localStorage.setItem("cartItems", JSON.stringify(CartFoodData));
            //call the function
            onLoadingCartCounter();
        });
    }
}
//----------------------------------

//to show the cart counter when the page is loaded
function onLoadingCartCounter() {
    let cartNumbers = localStorage.getItem("cartNumbers");
    if (cartNumbers) {
        document.querySelector('.cartNums span').textContent = cartNumbers;
    }
}


//call the functions when the page is loaded
ShowItemsIntheHomePage();
onLoadingCartCounter();

//-------------- Cart Page --------------
function ShowItemsInCustomerCart() {
    let CartFoodData = localStorage.getItem("cartItems");
    CartFoodData = JSON.parse(CartFoodData);
    let itemDiv = document.querySelector(".Customeritems");
    let totalPrice = localStorage.getItem('totalPrice');
    //check if the CartPage is currently used, not other
    if (CartFoodData && itemDiv) {
        itemDiv.innerHTML = '';
        Object.values(CartFoodData).map(item => {
            itemDiv.innerHTML += `

            <div class="rowClass row mb-5 text-center">
            <div class="col-1 themed-grid-col text-muted">
             <span style="display:none">${item.itemCode}</span>
            <button type="button" class="remove"><img class="img-style" src="./images/x.png" /></button>
            </div>
             <div class="col-4 themed-grid-col text-muted"> <h6 class="my-0">${item.itemName}</h6>
             <small class="text-muted">${item.ItemDetails}</small>
             </div>
             <div class="col-2 themed-grid-col text-muted"><span class="text-muted price">$${item.price}</span></div>
             <div class="col-3 themed-grid-col text-muted">
             <button type="button" class="decrease"><img class="img-style" src="./images/minus.png" /></button>
                  <span class="text-muted Quantity">${item.ItemQuantity}</span>
                  <button type="button" class="increase"><img class="img-style" src="./images/plus.png" /></button>
             </div>
             <div class="col-2 themed-grid-col text-muted"><span class="text-muted Total">$${item.ItemQuantity * item.price}</span></div>
           </div>
            `
        });

        itemDiv.innerHTML += `
        <div class="rowClass row mb-2">
        <div class="col-10 themed-grid-col text-muted"><h6>Total Price</h6></div>
        <div class="col-2 themed-grid-col text-end"><strong>$${totalPrice}</strong></div>
      </div>
               
          `;
    }
    RemoveCartItem();
    manageQuantity();
}
//------------------------------------------

function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let cartItems = localStorage.getItem('cartItems');
    let currentQuantity = 0;
    let itemCode = "";
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalPrice');
    //parse to integer
    cartCost = parseInt(cartCost);
    //Creating a loop for each button
    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            //Get the specific items' values from text content by using multiple parentElement
            //or any appropriate node, then select the html element
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            itemCode = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.querySelector('span').textContent;
            //The decrease button will check that the quantity is greater than one
            // then start decreasing it.
            if (cartItems[itemCode].ItemQuantity > 1) {
                cartItems[itemCode].ItemQuantity -= 1;

                localStorage.setItem('totalPrice', cartCost - cartItems[itemCode].price);
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                ShowItemsInCustomerCart();
            }
        });
    }

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            itemCode = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.previousElementSibling.querySelector('span').textContent;
            //The increase button will increase the quantity.
            cartItems[itemCode].ItemQuantity += 1;
            localStorage.setItem('totalPrice', cartCost + cartItems[itemCode].price);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            ShowItemsInCustomerCart();

        })
    }
}

//----------------------------------
//Remove button from the customer cart
function RemoveCartItem() {
    let deleteButtons = document.querySelectorAll('.remove');
    let itemCode;
    let cartNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('cartItems');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalPrice');

    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            //Get the specific items' values from text content by using parentElement 
            //then select the html element
            itemCode = deleteButtons[i].parentElement.querySelector('span').textContent;
            //decrease the item quantity in the localStorage
            localStorage.setItem('cartNumbers', cartNumbers - 1);
            //decrease the item price from the total price in the localStorage
            localStorage.setItem('totalPrice', cartCost - (cartItems[itemCode].price * cartItems[itemCode].ItemQuantity));
            //Remove the specific item from the localStorage and store the changes.
            delete cartItems[itemCode];
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            //call the functions
            ShowItemsInCustomerCart();
            onLoadingCartCounter();
        });
    }
}


function payment() {
    let TheOrderItems = localStorage.getItem("cartItems");
    let PaidtotalPrice = localStorage.getItem("totalPrice");
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                else {
                    //copy the local storage
                    localStorage.setItem("TheOrderItems", TheOrderItems);
                    localStorage.setItem("PaidtotalPrice", PaidtotalPrice);

                    //clear the cart by remove cartItems
                    localStorage.removeItem("cartItems");
                    localStorage.removeItem("totalPrice");
                    localStorage.removeItem("cartNumbers");
                    location.href = './ConfirmationPage.html';
                }
                form.classList.add('was-validated')

            }, false)
        })
}
//call the function when the page is loaded
ShowItemsInCustomerCart();

//-------------- Confirmation Page --------------
function ShowOrder() {
    let TheOrderItems = localStorage.getItem("TheOrderItems");
    TheOrderItems = JSON.parse(TheOrderItems);
    let OrderDiv = document.querySelector(".OrderDiv");
    let PaidtotalPrice = localStorage.getItem('PaidtotalPrice');
    //check if the Confirmation Page is currently used, not other
    if (TheOrderItems && OrderDiv) {
        OrderDiv.innerHTML = '';
        Object.values(TheOrderItems).map(item => {
            OrderDiv.innerHTML += `
            <div class="rowClass row mb-5 text-center">
            <div class="col-1 themed-grid-col text-muted">
            </div>
             <div class="col-4 themed-grid-col text-muted"> <h6 class="my-0">${item.itemName}</h6>
             <small class="text-muted">${item.ItemDetails}</small>
             </div>
             <div class="col-2 themed-grid-col text-muted"><span class="text-muted price">$${item.price}</span></div>
             <div class="col-3 themed-grid-col text-muted">
                  <span class="text-muted Quantity">${item.ItemQuantity}</span>
             </div>
             <div class="col-2 themed-grid-col text-muted"><span class="text-muted Total">$${item.ItemQuantity * item.price}</span></div>
           </div>
            `
        });

        OrderDiv.innerHTML += `
        <div class="rowClass row mb-2">
        <div class="col-10 themed-grid-col text-muted text-start"><h6>Total Price</h6></div>
        <div class="col-2 themed-grid-col"><strong>  $${PaidtotalPrice}</strong></div>
        </div>    
          `;
    }
}
//call the function when the page is loaded
ShowOrder();