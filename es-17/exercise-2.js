class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
class Developer extends Person{
  constructor(firstName, lastName, Role){
    super(firstName, lastName)
    this.Role = Role;
  }
}

const Developer1 = new Developer("Mario", "Rossi", "Front-end");
console.log(
  Developer1.firstName + " " + Developer1.lastName + " " + Developer1.Role
);
