function repeatHello(callback){
    const interval1 = setInterval(() => {
        callback()
    }, 1000);
    setTimeout(() => {
        clearInterval(interval1)
    }, 5000);
}
const printHello = () =>{
    console.log("Hello!")
}
repeatHello(printHello);
