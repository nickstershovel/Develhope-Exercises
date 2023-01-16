const user = {
  id: 1,
  name: "John",
  age: 25,
};
localStorage.setItem(user.id, JSON.stringify(user))
console.log(localStorage.getItem(`1`))