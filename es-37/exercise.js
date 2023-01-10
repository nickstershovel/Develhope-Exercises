const number = 15;
const checkNumber = new Promise((resolve, reject) => {
    if(number>10){
        resolve(`Number ${number} is greater than 10!`)
    } else {
        reject(`Number ${number} is lower than 10!`)
    }
})
checkNumber.then((result) => {
    console.log(result)
}).catch((error) => {
    console.error(error)
});