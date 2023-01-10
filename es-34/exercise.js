function printAsyncName (callback, name){
    setTimeout(() => {
    return callback()
    },1000)
    setTimeout(() => {
        console.log(name)
    },2000)
}
const printHello = () => console.log("Hello");
printAsyncName(printHello, "Marco")