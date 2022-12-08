const person1 = {
  firstName: "John",
  lastName: "Doe",
  age: 25,
};

const person2 = person1;
person2.firstName="Simon"

// Modify the property `firstName` of the `person2` in "Simon".

console.log(person1);
console.log(person2);

//Both Objects' first names are Simon, because by doing const person2 = person1 we are not making a copy of the object, but a reference to the same object. Therefore by modifying the second, we are also modifying the first.