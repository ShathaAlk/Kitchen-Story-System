//-------------- Login Page --------------
function login() {
    // Creating new variables that take the values from the input text
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    // Creating new variables that take the values from the localStorage
    var storedUsername = localStorage.getItem('unameKey');
    var storedPassword = localStorage.getItem('PasswordKey');
    var emptyFields = document.getElementById("emptyFields");
    var wrongFields = document.getElementById("wrongFields");
    //If the username or password is empty, the validation message will be shown
    if (username == "" || password == "") {
        emptyFields.style.display = "block";
        wrongFields.style.display = "none";
    }
    else {
        //Check if the browser support localStorage and sessionStorage
        if (localStorage && sessionStorage) {
            //Check if the localStorage key exists
            if (!localStorage.getItem('unameKey')) {
                if (username == "admin" && password == "admin") {
                    //Use setItem method to save the values to localStorage and sessionStorage for the first time
                    localStorage.setItem('unameKey', username);
                    localStorage.setItem('PasswordKey', password);
                    sessionStorage.setItem('unameKey', username);
                    sessionStorage.setItem('PasswordKey', password);
                    location.href = './AdminPage.html';
                }
                //If the username or password is wrong, the validation message will be shown
                else {
                    wrongFields.style.display = "block";
                    emptyFields.style.display = "none";
                }
            }
            //If there are already stored keys and values in both storages, 
            //it will use the other condition
            else {
                if (username == storedUsername && password == storedPassword) {
                    //Use setItem method to update the new values to localStorage and sessionStorage
                    sessionStorage.setItem('unameKey', username);
                    sessionStorage.setItem('PasswordKey', password);
                    location.href = './AdminPage.html';
                }
                else {
                    wrongFields.style.display = "block";
                    emptyFields.style.display = "none";
                }
            }
        }
        else {

            alert("localStorage is disabled");
        }
    }
}

//Change the password by getting the new value from the input text
function changePassword() {
    var NewPassword = document.getElementById("NewPassword").value;
    var lblPassChangeMsg = document.getElementById("passChangeMsg");
    var emptyFields = document.getElementById("emptyFields");
    var AdminPageLink = document.getElementById("AdminPageLink");

    if (NewPassword == "") {
        emptyFields.style.display = "block";
    }
    else {
        localStorage.setItem('PasswordKey', NewPassword);
        lblPassChangeMsg.style.display = "block";
        AdminPageLink.style.display = "block";
        emptyFields.style.display = "none";
    }
}

//Clear the sessionStorage and redirect the admin to the loginPage
function logOut() {
    sessionStorage.clear();
    location.href = "./loginPage.html"
}
