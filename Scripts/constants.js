const numberOfQuestions = 52;
let numberOfQuestionsChecked = 0;
let numberOfQuestionsTrue = 0;
let numberOfQuestionsFalse = 0;
const countsStr = document.querySelector("header>p")

const questionBodies = [
    {
        qNumber: 1,
        header: "What's the output?",
        question:
`function sayHi() {
  console.log(name);
  console.log(age);
  var name = "Lydia";
  let age = 21;
}
            
sayHi();`,
        variants:
            {A: "A: Lydia and undefined",
             B: "B: Lydia and ReferenceError",
             C: "C: ReferenceError and 21",
             D: "D: undefined and ReferenceError"
            },
        answer: "D",
        explanation: "accessing let or const variables before their declaration within their block scope causes ReferenceError. Declarations using var are 'hoisted' to the top of their respective scope and var variable can be accessed before its declaration in the code. Due to access before declaration the variable 'name' will be 'undefined'.",
    },
    {
        qNumber: 2,
        header: "What's the output?",
        question: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1);
}
`,
        variants:
            {
                A: "A: 0 1 2 and 0 1 2",
                B: "B: 0 1 2 and 3 3 3",
                C: "C: 3 3 3 and 0 1 2"
            },
        answer: "C",
        explanation: "'var' variables have function scope, 'let' variables have block scope. So when callback functions from first loop will be executed after delay, they will have the same value of variable 'i' witch it gets after executing the loop – 3. Callback functions from second loop will have new value of variable 'i' for each iteration of the loop due to 'let' declaration. 'Logs' from first loop will be executed first because they will be moved to the task queue before 'logs' from second loop.",
    },
    {
        qNumber: 3,
        header: "What's the output?",
        question: `+true;
!"Lydia";`,
        variants:
            {
                A: "A: 1 and false",
                B: "B: false and NaN",
                C: "C: false and false"
            },
        answer: "A",
        explanation: "unary operator + converts operand to number, so 'true' will be converted to 1. Non empty strings turn into 'true', !true is false.",
    },
    {
        qNumber: 4,
        header: "What's the output?",
        question: `const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius
};

console.log(shape.diameter());
console.log(shape.perimeter());`,
        variants:
            {
                A:"A: 20 and 62.83185307179586",
                B:"B: 20 and NaN",
                C:"C: 20 and 63",
                D:"D: NaN and 63"
            },
        answer: "B",
        explanation: "function 'diameter' has context because it belongs to object. Function 'perimeter' is arrow function. Arrow functions lose context because they don't have their own 'this' value, they inherit the 'this' value from the enclosing lexical scope where they are defined. In that case arrow function will get 'this' outside of 'shape' where field 'radius' doesn't exist and attempt of access to non-existent field will return 'undefined'. When 'undefined' is used in an arithmetic operation, it is implicitly converted to the 'NaN'.",
    },
    {
        qNumber: 5,
        header: "Which one is true?",
        question: `const bird = {
  size: "small"
};

const mouse = {
  name: "Mickey",
  small: true
};`,
        variants:
            {
                A: "A: mouse.bird.size is not valid",
                B: "B: mouse[bird.size] is not valid",
                C: "C: mouse[bird['size']] is not valid",
                D: "D: All of them are valid"
            },
        answer: "A",
        explanation: "bird.size = bird[\"size\"] = \"small\",  mouse[\"small\"] is valid access to the object property. The object 'mouse' doesn't have field 'bird', so 'mouse.bird' will be 'undefined'. 'undefined' is not an object, so attempt to read property of 'undefined' will cause an error.",
    },
    {
        qNumber: 6,
        header: "What's the output?",
        question: `let c = { greeting: "Hey!" };
let d;
d = c;
c.greeting = "Hello";

console.log(d.greeting);`,
        variants:
            {
                A: "A: Hello",
                B: "B: Hey!",
                C: "C: undefined",
                D: "D: ReferenceError",
                E: "E: TypeError"
            },
        answer: "A",
        explanation: "object is the reference data type. So variable 'd' contains not object but link to the object, same as variable 'c'. Changes of field in variable 'c' affects on field of variable 'd' because they linked to the same object.",
    },
    {
        qNumber: 7,
        header: "What's the output?",
        question: `let a = 3;
let b = new Number(3);
let c = 3;

console.log(a == b);
console.log(a === b);
console.log(b === c);`,
        variants:
            {
                A: "A: true false true",
                B: "B: false false true",
                C: "C: true false false",
                D: "D: false true true"
            },
        answer: "C",
        explanation: "the 'Number' constructor (with operator 'new') returns number object, which is not a primitive. Strict equality operator (===) always returns 'false' if types of operands are different, unless of equality operator (==) that can compare operands of different types. So a===b and b===c are 'false' because they have different types, and a==b is 'true' because they have the same value.",
    },
    {
        qNumber: 8,
        header: "What happens when we do this?",
        question: `function bark() {
  console.log("Woof!");
}

bark.animal = "dog";`,
        variants:
            {
                A: "A: Nothing, this is totally fine!",
                B: "B: SyntaxError. You cannot add properties to a function this way.",
                C: "C: 'Woof' gets logged.",
                D: "D: ReferenceError"
            },
        answer: "A",
        explanation: "function name 'bark' is variable. bark.animal = \"dog\" will reinitialize variable 'bark', creating an object 'bark' with field 'animal' that has value 'dog'.",
    },
    {
        qNumber: 9,
        header: "What's the output?",
        question: `function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const lydia = new Person("Lydia", "Hallie");
const sarah = Person("Sarah", "Smith");

console.log(lydia);
console.log(sarah);`,
        variants:
            {
                A: `A: Person {firstName: 'Lydia', lastName: 'Hallie'} and undefined`,
                B: `B: Person {firstName: 'Lydia', lastName: 'Hallie'} and Person {firstName: 'Sarah', lastName: 'Smith'}`,
                C: `C: Person {firstName: 'Lydia', lastName: 'Hallie'} and {}`,
                D: `D: Person {firstName: 'Lydia', lastName: 'Hallie'} and ReferenceError`,
            },
        answer: "A",
        explanation: "when the object is created with operator 'new', 'this' inside the constructor function refers to the newly created object instance. If 'new' isn't used object function-constructor inherits the 'this' value from the enclosing lexical scope where the function is defined and as a result function will lose context.",
    },
    {
        qNumber: 10,
        header: "What's the output?",
        question: `function sum(a, b) {
  return a + b;
}

sum(1, "2");`,
        variants:
            {
                A: "A: NaN",
                B: "B: TypeError",
                C: "C: '12'",
                D: "D: 3"
            },
        answer: "C",
        explanation: "string has higher priority than number, so operator '+' is concatenation operation of strings and number 1 will be converted to string '1'.",
    },
    {
        qNumber: 11,
        header: "What's the output?",
        question: `let number = 0;

console.log(number++);
console.log(++number);
console.log(number);
`,
        variants:
            {
                A: "A: 1 1 2",
                B: "B: 1 2 2",
                C: "C: 0 2 2",
                D: "D: 0 1 2"
            },
        answer: "C",
        explanation: "postfix operator (x++) increments the value after action. Prefix operator (++x) increments the value before action.",
    },
    {
        qNumber: 12,
        header: "What's the output?",
        question: `function checkAge(data) {
  if (data === { age: 18 }) {
    console.log("You are an adult!");
  } else if (data == { age: 18 }) {
    console.log("You are still an adult.");
  } else {
    console.log(\`Hmm.. You don't have an age I guess\`);
  }
}

checkAge({ age: 18 });`,
        variants:
            {
                A: "A: You are an adult!",
                B: "B: You are still an adult.",
                C: "C: Hmm.. You don't have an age I guess"
            },
        answer: "C",
        explanation: "object is the reference data type.{ age: 18 } inside the definition of function checkAge and inside the call of this function link on different objects. So result of compare will be 'false' in both cases.",
    },
    {
        qNumber: 13,
        header: "What's the output?",
        question: `function getAge() {
  "use strict";
  age = 21;
  console.log(age);
}

getAge();`,
        variants:
            {
                A: "A: 21",
                B: "B: undefined",
                C: "C: ReferenceError",
                D: "D: TypeError"
            },
        answer: "C",
        explanation: "variable 'age' is not defined and causes an error ReferenceError. String inside the quotes (\"use strict\") doesn't count as variable, so it doesn't cause error.",
    },
    {
        qNumber: 14,
        header: "What's value of sum?",
        question: `const sum = eval("10*10+5");`,
        variants:
            {
                A: "A: 105", //
                B: "B: '105'",
                C: "C: TypeError",
                D: "D: '10*10+5'"
            },
        answer: "A",
        explanation: "if argument of eval-function is string it returns completion value of evaluating of the given code. Arguments in expression '10*10+5' are numbers, so result will be a number.",
    },
    {
        qNumber: 15,
        header: "What's the output?",
        question: `var num = 8;
var num = 10;

console.log(num);`,
        variants:
            {
                A: "A: 8",
                B: "B: 10",
                C: "C: SyntaxError",
                D: "D: ReferenceError"
            },
        answer: "B",
        explanation: "variables that were declared with operator \"var\" are re-declarable",
    },
    {
        qNumber: 16,
        header: "What's the output?",
        question: `const obj = { a: "one", b: "two", a: "three" };
console.log(obj);`,
        variants:
            {
                A: "A: { a: 'one', b: 'two' }",
                B: "B: { b: 'two', a: 'three' }",
                C: "C: { a: 'three', b: 'two' }",
                D: "D: SyntaxError"
            },
        answer: "C",
        explanation: "objects cannot have duplicate keys. If an object literal with the same key multiple times is defined, only the last assignment for that key will be retained.",
    },
    {
        qNumber: 17,
        header: "What's the output?",
        question: `const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"));
const baz = () => console.log("Third");

bar();
foo();
baz();`,
        variants:
            {
                A: "A: First Second Third",
                B: "B: First Third Second",
                C: "C: Second First Third",
                D: "D: Second Third First"
            },
        answer: "B",
        explanation: "setTimeout is asynchronous function. At first setTimeout ('bar()') delays execution of callback function and doesn't interrupt execution of functions in functional stack. Then synchronous functions 'foo()' and 'baz()' are executed. Finally delayed callback function is executed.",
    },
    {
        qNumber: 18,
        header: "What's the output?",
        question: `!!null;
!!"";
!!1;`,
        variants:
            {
                A: "A: false true false",
                B: "B: false false true",
                C: "C: false true true",
                D: "D: true true false"
            },
        answer: "B",
        explanation: "an unary operator !! converts value to boolean. 'null' and empty string turn into 'false', non-zero numbers turn into 'true'.",
    },
    {
        qNumber: 19,
        header: "What does this return?",
        question: `[..."Lydia"]; `,
        variants:
            {
                A:'A: ["L", "y", "d", "i", "a"]',
                B:'B: ["Lydia"]',
                C: 'C: [[], "Lydia"]',
                D: 'D: [["L", "y", "d", "i", "a"]]'
            },
        answer: "A",
        explanation: "operator '…' expands an array into its individual elements. When used with strings, '…' allows a string to be expanded into individual characters. '[ ]' allows to collect this characters inside the array.",
    },
    {
        qNumber: 20,
        header: "What's the output?",
        question: `let person = { name: "Lydia" };
const members = [person];
person = null;

console.log(members);`,
        variants:
            {
                A: "A: null",
                B: "B: [null]",
                C: "C: [{}]",
                D: 'D: [{ name: "Lydia" }]'
            },
        answer: "D",
        explanation: "object is stored in the Heap as long as there is at least one reference to the object. After operation 'const members = [person];' in first element of array is stored link to the same object as person. There two links to object therefore after 'person = null' an object is still exists and it can be accessed by a link stored in members[0].",
    },
    {
        qNumber: 21,
        header: "What's the output?",
        question: `const person = {
  name: "Lydia",
  age: 21
};

for (const item in person) { 
  console.log(item);
}`,
        variants:
            {
                A: "A: { name: 'Lydia' }, { age: 21 }",
                B: "B: 'name', 'age'",
                C: "C: 'Lydia', 21",
                D: "D: ['name', 'Lydia'], ['age', 21]",
            },
        answer: "B",
        explanation: "the 'for...in' loop iterates over all enumerable string-keyed properties of an object. It provides the property names (keys) during each iteration. ",
    },
    {
        qNumber: 22,
        header: "What's the output?",
        question: `console.log(3 + 4 + "5");`,
        variants:
            {
                A: "A: '345'",
                B: "B: '75'",
                C: "C: 12",
                D: "D: '12'",
            },
        answer: "B",
        explanation: "addition operations evaluated from left to right, so 3+4=7. String has higher priority than number, so in that case '+' is the concatenation and the number 7 will be converted to string.",
    },
    {
        qNumber: 23,
        header: "What's the output?",
        question: `const a = {};
const b = { key: "b" };
const c = { key: "c" };
a[b] = 123;
a[c] = 456;

console.log(a[b]);`,
        variants:
            {
                A: "A: 123",
                B: "B: 456",
                C: "C: undefined",
                D: "D: ReferenceError"
            },
        answer: "B",
        explanation: "bracket notation allows accessing object properties with names that are not valid JavaScript identifiers. If property name is not string the text representation of it will be used. By default the string representation of any object is a string '[object Object]'. So objects 'b' and 'c' in object bracket notation will have the same string representation '[object Object]'. Therefore 'a[b]' and 'a[c]' access to the same property and the last value will be logged.",
    },
    {
        qNumber: 24,
        header: "What's the output?",
        question: `const numbers = [1, 2, 3];
numbers[10] = 11;

console.log(numbers.length);
`,
        variants:
            {
                A: "A: 11",
                B: "B: 4",
                C: "C: Error"
            },
        answer: "A",
        explanation: "arrays in JS are zero-based. When index of setting element of array is outside the current bounds of the array, the array length will be updated.",
    },
    {
        qNumber: 25,
        header: "What's the value of num?",
        question: `const num = parseInt("7*6");`,
        variants:
            {
                A: "A: 42",
                B: "B: '42'",
                C: "C: 7",
                D: "D: NaN"
            },
        answer: "C",
        explanation: "parseInt() parses the string from left to right, looking for valid numerical characters. It stops parsing when it encounters a character that is not a valid numeral and returns the integer value parsed up to that point. Symbol '*' is not numerical.",
    },
    {
        qNumber: 26,
        header: "What's the output?",
        question: `function getInfo(member, year) {
  member.name = "Lydia";
  year = "1998";
}

const person = { name: "Sarah" };
const birthYear = "1997";

getInfo(person, birthYear);

console.log(person, birthYear);`,
        variants:
            {
                A: "A: { name: 'Lydia' }, '1997'",
                B: "B: { name: 'Sarah' }, '1998'",
                C: "C: { name: 'Lydia' }, '1998'",
                D: "D: { name: 'Sarah' }, '1997'"
            },
        answer: "A",
        explanation: "when a primitive value (like a number, string, or boolean) is passed as an argument to a function, a copy of that value is created and assigned to the function's parameter, so the parameter inside the function is a separate variable. It can be reinitialized, but this doesn't affect the original variable. Object is a reference type, variable consists link to the object. It can't be change in function by itself, but the fields of the object can be reassigned.",
    },
    {
        qNumber: 27,
        header: "What's the output?",
        question: `function greeting() {
  throw "Hello world!";
}

function sayHi() {
  try {
    const data = greeting();
    console.log("It worked!", data);
  } catch (e) {
    console.log("Oh no an error:", e);
  }
}

sayHi();`,
        variants:
            {
                A: "A: It worked! Hello world!",
                B: "B: Oh no an error: undefined",
                C: "C: SyntaxError: can only throw Error objects",
                D: "D: Oh no an error: Hello world!"
            },
        answer: "D",
        explanation: "during execution of 'const data = greeting();' function 'greeting' throw exception with message \"Hello world!\". After that execution of block 'try' is stopped and control moves to the block 'catch' inside which 'e' is a exception message.",
    },
    {
        qNumber: 28,
        header: "What's the output?",
        question: `const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
`,
        variants:
            {
                A: "A: [[1, 2, 3, 4, 5]]",
                B: "B: [1, 2, 3, 4, 5]",
                C: "C: 1",
                D: "D: [1]"
            },
        answer: "C",
        explanation: "the destructuring syntax makes possible to unpack values from arrays into distinct variables. It performs the reverse operation of an array declaration, by declaring each element in the collection as a separate variable. In this case the first element of array declared as variable 'y'.",
    },
    {
        qNumber: 29,
        header: "What's the output?",
        question: `const user = { name: "Lydia", age: 21 };
const admin = { admin: true, ...user };

console.log(admin);`,
        variants:
            {
                A: "A: { admin: true, user: { name: 'Lydia', age: 21 } }",
                B: "B: { admin: true, name: 'Lydia', age: 21 }",
                C: "C: { admin: true, user: ['Lydia', 21] }",
                D: "D: { admin: true }"
            },
        answer: "B",
        explanation: "spread operator '…' performs copying fields from existing object into another object.",
    },
    {
        qNumber: 30,
        header: "What's the output?",
        question: `const settings = {
  username: "lydiahallie",
  level: 19,
  health: 90
};

const data = JSON.stringify(settings, ["level", "health"]);
console.log(data);`,
        variants:
            {
                A: 'A: ""{"level":19, "health":90}"',
                B: 'B: "{"username": "lydiahallie"}"',
                C: 'C: "["level", "health"]"',
                D: 'D: "{"username": "lydiahallie", "level":19, "health":90}"'
            },
        answer: "A",
        explanation: "the JSON.stringify() static method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified. In this case  replacer array is specified.",
    },
    {
        qNumber: 31,
        header: "What's the output?",
        question: `let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);`,
        variants:
            {
                A: "A: 10, 10",
                B: "B: 10, 11",
                C: "C: 11, 11",
                D: "D: 11, 12"
            },
        answer: "A",
        explanation: "due to postfix incrementing inside a function 'increaseNumber' the original value of variable 'num' will be returned and only after that 'num' will be incremented. So 'num1' = 10. The same story inside function 'increasePassedNumber' – it gets the value of variable 'num1', returns it's original value and only after that increments the copy of variable 'num1'. So 'num2' = 'num1' = 10.",
    },
    {
        qNumber: 32,
        header: "What's the output?",
        question: `[1, 2, 3, 4].reduce((x, y) => console.log(x, y));`,
        variants:
            {
                A: "A: 1 2 and 3 3 and 6 4",
                B: "B: 1 2 and 2 3 and 3 4",
                C: "C: 1 undefined and 2 undefined and 3 undefined and 4 undefined",
                D: "D: 1 2 and undefined 3 and undefined 4"
            },
        answer: "D",
        explanation: "in 'reduce' method 'x' – accumulator, 'y' – value of current element. If initial value is not specified, accumulator is initialized to the first value in the array, and iterating starts with the second value in the array as current value. So the first step result – '1 2'. On the next two steps current value will be equal value of array element (3 and 4), accumulator will be 'undefined' because on each step call back function doesn't return new accumulator value.",
    },
    {
        qNumber: 33,
        header: "What's the output?",
        question: `function addToList(item, list) {
  return list.push(item);
}

const result = addToList("apple", ["banana"]);

console.log(result);`,
        variants:
            {
                A: "A: ['apple', 'banana']",
                B: "B: 2",
                C: "C: true",
                D: "D: undefined"
            },
        answer: "B",
        explanation: "the push() method of Array instances adds the specified elements to the end of an array and returns the new length of the array.",
    },
    {
        qNumber: 34,
        header: "What is the output?",
        question: `const list = [1 + 2, 1 * 2, 1 / 2]

console.log(list)`,
        variants:
            {
                A: 'A: ["1 + 2", "1 * 2", "1 / 2"]',
                B: 'B: ["12", 2, 0.5]',
                C: 'C: [3, 2, 0.5]',
                D: 'D: [1, 1, 1]'
            },
        answer: "C",
        explanation: "the result of arithmetic operations with arguments of type 'number' has type 'number'.",
    },
    {
        qNumber: 35,
        header: "What is the output?",
        question: `function sayHi(name) {
  return \`Hi there, \${name}\`
}

console.log(sayHi())`,
        variants:
            {
                A: "A: Hi there,",
                B: "B: Hi there, undefined",
                C: "C: Hi there, null",
                D: "D: ReferenceError"
            },
        answer: "B",
        explanation: "in the call of function 'sayHi' there are no arguments, so the array of arguments will be empty. Inside function 'sayHi' the variable 'name' will be searched above bounds of argument array and therefore will get value 'undefined'.",
    },
    {
        qNumber: 36,
        header: "What's the output?",
        question: `console.log("I want pizza"[0])`,
        variants:
            {
                A: 'A: """',
                B: 'B: "I"',
                C: 'C: SyntaxError',
                D: 'D: undefined'
            },
        answer: "B",
        explanation: "string is an array-like object. The first symbol of given string - 'I'.",
    },
    {
        qNumber: 37,
        header: "What's the output?",
        question: `function checkAge(age) {
  if (age < 18) {
    const message = "Sorry, you're too young."
  } else {
    const message = "Yay! You're old enough!"
  }
  return message
}

console.log(checkAge(21))`,
        variants:
            {
                A: `A: "Sorry, you're too young."`,
                B: `B: "Yay! You're old enough!"`,
                C: `C: ReferenceError`,
                D: `D: undefined`
            },
        answer: "C",
        explanation: "variable 'message' declaration is scoped to block if-else and doesn't visible outside of this block. Therefore attempt to access this variable outside of if-else will cause ReferenceError.",
    },
    {
        qNumber: 38,
        header: "What's the output?",
        question: `function sum(num1, num2 = num1) {
  console.log(num1 + num2)
}

sum(10)`,
        variants:
            {
                A: "A: NaN",
                B: "B: 20",
                C: "C: ReferenceError",
                D: "D: undefined"
            },
        answer: "B",
        explanation: "default function parameters allow named parameters to be initialized with default values if no value or 'undefined' is passed. In this case the parameter 'num2' has default value equal value of parameter 'num1'. Parameter 'num1' located to the left from parameter 'num2' in parameter list therefore there is no error. In calling function 'sum' there is only one parameter therefore inside the function 'num1' = 10, 'num2' = 10.",
    },
    {
        qNumber: 39,
        header: "What's the output?",
        question: `let = [1, 2, 3].push(4)

console.log(newList.push(5))`,
        variants:
            {
                A: "A: [1, 2, 3, 4, 5]",
                B: "B: [1, 2, 3, 5]",
                C: "C: [1, 2, 3, 4]",
                D: "D: Error"
            },
        answer: "D",
        explanation: "method 'push' returns new length of array after adding elements, therefore 'newList' is a number, not an array. Object number doesn't have method 'push' and attempt to call this method will cause an error.",
    },
    {
        qNumber: 40,
        header: "When you click the paragraph, what's the logged output?",
        question: `<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div>`,
        variants:
            {
                A: "A: p div",
                B: "B: div p",
                C: "C: p",
                D: "D: div"
            },
        answer: "A",
        explanation: "due to event bubbling an event, triggered on a specific DOM element, propagates upwards through its parent and ancestor elements in the DOM hierarchy. At each level of the hierarchy, if an event listener is attached to an ancestor element for the same event type, its handler function is also executed.",
    },
    {
        qNumber: 41,
        header: "What is the event.target when clicking the button?",
        question: `<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>`,
        variants:
            {
                A: "A: Outer div",
                B: "B: Inner div",
                C: "C: button",
                D: "D: An array of all nested elements."
            },
        answer: "C",
        explanation: "event.target  property reference to the object onto which the event was dispatched.",
    },
    {
        qNumber: 42,
        header: "What's the output?",
        question: `const person = { name: "Lydia" };

function sayHi(age) {
  return \`\${this.name} is \${age}\`;
}

console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));`,
        variants:
            {
                A: "A: undefined is 21 Lydia is 21",
                B: "B: function function",
                C: "C: Lydia is 21 Lydia is 21",
                D: "D: Lydia is 21 function"
            },
        answer: "D",
        explanation: "the call() method calls this function with a given 'this' value. The bind() method returns a copy of the given function with the specified 'this' value but doesn't call it.",
    },
    {
        qNumber: 43,
        header: "What's the output?",
        question: `function sayHi() {
  return (() => 0)();
}

console.log(typeof sayHi());`,
        variants:
            {
                A: 'A: "object"',
                B: 'B: "number"',
                C: 'C: "function"',
                D: 'D: "undefined"'
            },
        answer: "B",
        explanation: "function 'sayHi' returns the result of calling arrow function '() => 0', the result will be number 0.",
    },
    {
        qNumber: 44,
        header: "Which of these values are falsy?",
        question: `0;
new Number(0);
("");
(" ");
new Boolean(false);
undefined;`,
        variants:
            {
                A: "A: 0, '', undefined",
                B: "B: 0, new Number(0), '', new Boolean(false), undefined",
                C: "C: 0, '', new Boolean(false), undefined",
                D: "D: All of them are falsy"
            },
        answer: "A",
        explanation: "when Number() is called as a constructor (with 'new'), it returns a wrapping Number object, which is not a primitive, so new Number(0) is not falsy. The same story with 'new Boolean(false)', it's not falsy. '0', empty string and 'undefined' are turned into false, non empty string is turned into true.",
    },
    {
        qNumber: 45,
        header: "What's the output?",
        question: `(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();`,
        variants:
            {
                A: "A: 1 undefined 2",
                B: "B: undefined undefined undefined",
                C: "C: 1 1 2",
                D: "D: 1 undefined undefined"
            },
        answer: "A",
        explanation: "in block 'catch' variable 'x' is a local variable scoped inside this block, therefore changes of this variable doesn't affect variable 'x' in scope of arrow function. Therefore the second log will show 'undefined'.",
    },
    {
        qNumber: 46,
        header: "What's the output?",
        question: `[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },  [1, 2]);`,
        variants:
            {
                A: "A: [0, 1, 2, 3, 1, 2]",
                B: "B: [6, 1, 2]",
                C: "C: [1, 2, 0, 1, 2, 3]",
                D: "D: [1, 2, 6]"
            },
        answer: "C",
        explanation: "initial value of accumulator is [1, 2], after first reduce call accumulator will be [1, 2, 0, 1], after second reduce call accumulator will be [1, 2, 0, 1, 2, 3] and it will be result of reduce execution.",
    },
    {
        qNumber: 47,
        header: "What's the output?",
        question: `function getAge(...args) {
  console.log(typeof args);
}

getAge(21);`,
        variants:
            {
                A: 'A: "number"',
                B: 'B: "array"',
                C: 'C: "object"',
                D: 'D: "NaN"'
            },
        answer: "C",
        explanation: "args – array of arguments. For the arrays operator 'typeof' returns \"object\".",
    },
    {
        qNumber: 48,
        header: "What does this return?",
        question: `const firstPromise = new Promise((res, rej) => {
  setTimeout(res.bind(undefined, 'one'), 500);
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
`,
        variants:
            {
                A: 'A: "one"',
                B: 'B: "two"',
                C: 'C: "two" "one"',
                D: 'D: "one" "two"'
            },
        answer: "B",
        explanation: "The Promise.race() static method takes an iterable of promises as input and returns a single Promise. This returned promise settles with the eventual state of the first promise that settles. In this case second promise will win the race because it has fewer delay in setTimeout function then the first promise.",
    },
    {
        qNumber: 49,
        header: "What's the output?",
        question: `async function getData() {
  return await Promise.resolve('I made it!');
}

const data = getData();
console.log(data);`,
        variants:
            {
                A: 'A: "I made it!"',
                B: 'B: Promise {<resolved>: "I made it!"}',
                C: 'C: Promise {<pending>}',
                D: 'D: undefined'
            },
        answer: "C",
        explanation: "Promise.resolve() returns a Promise object that is resolved with a given value. In this case 'console.log(data);' will be executed before promise is resolved and this promise has state 'pending' and it will be shown in log.",
    },
    {
        qNumber: 50,
        header: "What's the value of output?",
        question: `const myPromise = () => Promise.resolve('I have resolved!');

function firstFunction() {
  myPromise().then(res => console.log(res));
  console.log('second');
}

async function secondFunction() {
  console.log(await myPromise());
  console.log('second');
}

firstFunction();
secondFunction();`,
        variants:
            {
                A: "A: I have resolved!, second and I have resolved!, second",
                B: "B: second, I have resolved! and second, I have resolved!",
                C: "C: I have resolved!, second and second, I have resolved!",
                D: "D: second, I have resolved! and I have resolved!, second"
            },
        answer: "D",
        explanation: "firstFunction() is a synchronous function, so at first 'console.log('second')' will be executed and after that promise will be resolved (second, I have resolved!). SecondFunction() is asynchronous function – it will wait until promise is not resolved and after that will execute 'console.log('second')' (I have resolved!, second).",
    },
    {
        qNumber: 51,
        header: "What's the output?",
        question: `const myPromise = Promise.resolve('Woah some cool data');

(async () => {
  try {
    console.log(await myPromise);
  } catch {
    throw new Error(\`Oops didn't work\`);
  } finally {
    console.log('Oh finally!');
  }
})();`,
        variants:
            {
                A: "A: Woah some cool data",
                B: "B: Oh finally!",
                C: "C: Woah some cool data Oh finally!",
                D: "D: Oops didn't work Oh finally!"
            },
        answer: "C",
        explanation: "Block try-catch is located inside asynchronous arrow function therefore arrow function will be wait until promise is not resolved, after that block 'finally' will be executed because exception doesn't thrown in block 'try'.",
    },
    {
        qNumber: 52,
        header: "What's the output?",
        question: `const promise1 = Promise.resolve('First')
const promise2 = Promise.resolve('Second')
const promise3 = Promise.reject('Third')
const promise4 = Promise.resolve('Fourth')
const runPromises = async () => {
	const res1 = await Promise.all([promise1, promise2])
	const res2  = await Promise.all([promise3, promise4])
	return [res1, res2]
}

runPromises()
	.then(res => console.log(res))
	.catch(err => console.log(err))`,
        variants:
            {
                A: "A: [['First', 'Second'], ['Fourth']]",
                B: "B: [['First', 'Second'], ['Third', 'Fourth']]",
                C: "C: [['First', 'Second']]",
                D: "D: 'Third'"
            },
        answer: "D",
        explanation: "promise3 has status 'rejected', so Promise.all([promise3, promise4]) will return promise which is rejected, therefore method 'catch' will be executed to handle rejection with the result 'Third'.",
    },
]

console.log(questionBodies)
const questionDisplay = document.querySelector(".display");