//-------------- Admin Page --------------
//Check if the sessionStorage key exists, or the login page will be opened. 
window.onload = function () {
    if (sessionStorage.getItem('unameKey')) {
        //Show the localStorage value (unameKey) on the page 
        document.getElementById('welcomeMsg').textContent = "Welcome " +
            localStorage.getItem('unameKey');
    }
    else {
        location.href = "./loginPage.html"
    }
}

//----------------------------------------------------------
var submit = document.getElementById("submit");
var itemCodeInput = document.getElementById("itemCode")
var itemNameInput = document.getElementById("itemName")
var ItemDetailsInput = document.getElementById("ItemDetails")
var priceInput = document.getElementById("price")
var ItemTypeInput = document.getElementById("ItemType")
var emptyFields = document.getElementById("emptyFields");
var noSelect = document.getElementById("noSelect");

// addItem() function to add item to local storage by the admin
function addItem() {
    let StoredFoodData = JSON.parse(localStorage.getItem("itemInStorage"));
    //Use trim to remove spaces from the text
    var itemCode = itemCodeInput.value.trim()
    var itemName = itemNameInput.value.trim()
    var ItemDetails = ItemDetailsInput.value.trim()
    var price = priceInput.value.trim()
    var ItemType = ItemTypeInput.value;
    //Creating an object for the five variables.
    var FoodData = {
        itemCode: itemCode,
        itemName: itemName,
        ItemDetails: ItemDetails,
        price: price,
        ItemType: ItemType
    }
    // Validate if all the values are entered
    if (!itemCode || !itemName || !ItemDetails || !price) {
        emptyFields.style.display = "block";
        noSelect.style.display = "none";
    }
    else if (!ItemType) {
        noSelect.style.display = "block";
        emptyFields.style.display = "none";
    }
    else {
        // Validate if localStorage key (StoredFoodData) exists
        if (StoredFoodData != null) {
            //To store more than one array
            if (StoredFoodData[FoodData.itemCode] == undefined) {
                StoredFoodData = {
                    //use ... 3 dots to insert new item array to StoredFoodData.
                    ...StoredFoodData,
                    [FoodData.itemCode]: FoodData
                }
            }
            else{
                alert("The item code is already in the Storage.") 
            }
        }
        //If there is no localStorage key, create it by adding the first array.
        else {

            StoredFoodData = {
                [FoodData.itemCode]: FoodData
            }
        }
        //use setItem method to save the values inside the localStorage
        //JSON.stringify to convert the JS object to a string 
        localStorage.setItem("itemInStorage", JSON.stringify(StoredFoodData));
        //Clear the inputs after submitting 
        itemCodeInput.value = "";
        itemNameInput.value = "";
        ItemDetailsInput.value = "";
        priceInput.value = "";
        ItemTypeInput.selectedIndex = 0;
        emptyFields.style.display = "none";
        noSelect.style.display = "none";

        //call the function 
        ShowItemsIntheAdminPage();
    }
}

//-------------------------------------------------------

// Get the items from the localStorage and show them in AdminPage.
function ShowItemsIntheAdminPage() {
    //use getItem method to retrive the values from localStorage
    //JSON.parse to convert the string to JS object
    let StoredFoodData = localStorage.getItem("itemInStorage");
    StoredFoodData = JSON.parse(StoredFoodData);
    let AdminItemsDiv = document.querySelector(".AdminItems");

    //check if the localStorage key (StoredFoodData) exists 
    if (StoredFoodData) {
        AdminItemsDiv.innerHTML = '';
        //Use Object.values() to return an array of values
        //Use map() to create a new array that helps to get each array element and show them in HTML content.
        Object.values(StoredFoodData).map(item => {
            AdminItemsDiv.innerHTML += `
              <div class="col">
              <div class="card shadow-sm">
               <span style="display:none">${item.itemCode}</span>
                <div class="card-body">
                  <span class="card-text">${item.itemName}</span>
                  <p class="text-muted">${item.ItemDetails}</p>
                  <div class="d-flex justify-content-between align-items-center">

                    <div class="btn-group">
                      <button type="button" class="btn btn-sm btn-outline-secondary btnRemove">Remove</button>
                    </div>
                    <label class="price" >$${item.price}</label>
                  </div>
                </div>
              </div>
            </div>
            `
        });

    }
    //call the function
    RemoveButtons();
}

// RemoveButtons() function to remove the selected item from the localStorage.
function RemoveButtons() {
    let RemoveButtons = document.querySelectorAll('.btnRemove');
    let itemCode;
    let cartItems = localStorage.getItem('itemInStorage');
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < RemoveButtons.length; i++) {
        RemoveButtons[i].addEventListener('click', () => {
            //Use multiple parentElement to get the specific itemCode value
            itemCode = RemoveButtons[i].parentElement.parentElement.parentElement.parentElement.querySelector('span').textContent;
            //Remove the specific value
            delete cartItems[itemCode];
            //store the new value (saving the changes)
            localStorage.setItem('itemInStorage', JSON.stringify(cartItems));

            ShowItemsIntheAdminPage();
        });
    }
}
//call the function when the page is loaded
ShowItemsIntheAdminPage();
