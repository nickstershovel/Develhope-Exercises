// const add = require("./math");

// const result = add(8, 6);

// console.log(result);

// import add from "./math.mjs";
// const result = add(8, 6);
// console.log(result);

const figlet = require("figlet");

figlet("Hello World!", (err, data )=> {
    if (err) {
        console.log("Something went wrong.")
        console.dir(err);
        return;
}
console.log(data);
});

