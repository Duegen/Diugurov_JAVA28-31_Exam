const numberOfQuestions = 52;
const questionHeaders = [];
for (let i = 0; i < numberOfQuestions; ++i) questionHeaders.push("Question №" + (i + 1));

// const questionBodies = [
//     `function sayHi() {
//    console.log(name);
//    console.log(age);
//    var name = "Lydia";
//    let age = 21;
// }
//
// sayHi();`,
// ]

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
        explanation: "setTimeout is asynchrony function. At first setTimeout ('bar()') delays execution of callback function and doesn't interrupt execution of functions in functional stack. Then synchrony functions 'foo()' and 'baz()' are executed. Finally delayed callback function is executed.",
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
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 22,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 23,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 24,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 25,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 26,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 27,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 28,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 29,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 30,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 31,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 32,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 33,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 34,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 35,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 36,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 37,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 38,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 39,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 40,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 41,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 42,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 43,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 44,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 45,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 46,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 47,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 48,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 49,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 50,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 51,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
    {
        qNumber: 52,
        header: "",
        question: ``,
        variants:
            {

            },
        answer: "",
        explanation: "",
    },
]

console.log(questionBodies)
const questionDisplay = document.querySelector(".display");