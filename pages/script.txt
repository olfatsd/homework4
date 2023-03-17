const signUp = () => {
    document.getElementById('firstName').innerHTML = "";
    document.getElementById('lastName').innerHTML = "";
    document.getElementById('email').innerHTML = "";
    document.getElementById('password1').innerHTML = "";
    document.getElementById('password2').innerHTML = "";
    let firstName = document.forms['signUpForm']['firstName'].value;
    let lastName = document.forms['signUpForm']['lastName'].value;
    let email = document.forms['signUpForm']['email'].value;
    let password1 = document.forms['signUpForm']['password1'].value;
    let password2 = document.forms['signUpForm']['password2'].value;
    if (firstName.length != 0 && (firstName.length < 2 || firstName.length > 20)) {
        document.getElementById('firstName').innerHTML = "First name has to be 2-20 characters";
        return false;
    }
    else if (lastName.length != 0 && (lastName.length < 2 || lastName.length > 20)) {
        document.getElementById('lastName').innerHTML = "Last name has to be 2-20 characters";
        return false;
    }
    else if (!email.includes('@gmail') && !email.includes('@yahoo')) {
        document.getElementById('email').innerHTML = "We only support gmail or yahoo";
        return false;
    }
    else if (!containsSpecialChars(password1) || (password1.length < 2 || password1.length > 10)) {
        document.getElementById('password1').innerHTML = "Password has to be 2-10 characters and inclued special character";
        return false;
    }
    else if (password1 != password2) {
        document.getElementById('password2').innerHTML = "Passwords don't match";
        return false;
    }

    return true;
}

function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
}


const sendDataToMyServer = () => {
    let firstName = document.forms['signUpForm']['firstName'].value;
    let lastName = document.forms['signUpForm']['lastName'].value;
    let email = document.forms['signUpForm']['email'].value;
    let password = document.forms['signUpForm']['password1'].value;

    fetch('/registeration', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })
    })
        .then(res => res.json())
        .then(data => {

        })
        .catch(err => {
            if (err) throw err
        })
}

const signIn = () => {
    document.getElementById('email').innerHTML = "";
    document.getElementById('password').innerHTML = "";
    let email = document.getElementById('inptEmail').value;
    let password = document.getElementById('inptPassword').value;

    fetch('/signIn', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            email: email
        })
    })
        .then(res => res.json())
        .then(data => {
            if (data == null) {
                document.getElementById('email').innerHTML = "Email is incorrect";
            }
            else if (data.password != password) {
                document.getElementById('password').innerHTML = "Password is incorrect";
            }
            else {
                localStorage.setItem('firstName', data.firstName)
                localStorage.setItem('lastName', data.lastName)
                window.location.href = '/menu.html';
            }
        })
        .catch(err => {
            if (err) throw err
        })
}

const wellcome = () => {
document.getElementById('wellcome').innerHTML=`wellcome ${localStorage.firstName} ${localStorage.lastName}`
}
