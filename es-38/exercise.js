const isLogged = true;
const loginCheck = new Promise((resolve, reject) => {
    if(isLogged == true){
        resolve(Math.random())
    }
    else{
        reject("User is not logged in.")
    }
})
const numberCheck = (number) =>{return new Promise((resolve, reject)=> {
    if(number > 0.5){
        let Data = {name: "John", age: 24};
        resolve(Data)
    }
    else{
        reject(("Error: Number is less than 0.5, data can't be accessed."))
    }
})}

loginCheck.then((solution) => {return numberCheck(solution)})
    .then((numberCheckResolution) => console.log(numberCheckResolution))
    .catch((err) => console.log(err));