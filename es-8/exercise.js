function multiplyByTwo(value) {
  let number = 2;

  function Inner (){
  return number * value;
  }
  return Inner;
}
console.log(multiplyByTwo(4)());
