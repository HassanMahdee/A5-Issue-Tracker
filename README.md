1️⃣ What is the difference between var, let, and const?

ANS: All three are used to declare variables. However, var is hoisted before initialization and automatically sets to undefined. Let and const enter the Temporal Dead Zone (TDZ) until they are initialized. Const requires mandatory initialization. The key difference is that var can be accessed before initialization, while let and const cannot. Accessing let or const before they are initialized results in a ReferenceError. Var and let can be declared without initialization, but const must be initialized. Another difference is that var and let can be reassigned, while const cannot. Additionally, var is function-scoped, while let and const are block-scoped. Lastly, var can be redeclared, but let and const cannot.

2️⃣ What is the spread operator (...)?

ANS: The spread operator is used to get individual elements from an array or object and create a copy without changing the original. Without it, any copy will be passed by reference. This means that any changes to the copy will also affect the original. We can also use it to merge arrays and objects. However, the spread operator only works on the first level of nesting. This means that if we have an array of objects, the spread operator will only copy the object names, not the properties inside.

3️⃣ What is the difference between map(), filter(), and forEach()?

ANS: All three of them take arrays as parameters and run a callback function for each element in the array. However, map() returns a new array with the changes made by the callback function for every element in the array. filter() returns a new array with all the elements that meet the condition set by the callback function and discards the false values. forEach() runs the callback function and whatever's in that function once for each element in the array and returns undefined.

4️⃣ What is an arrow function?

ANS: An arrow function is a shorter way to write a function. It uses the => syntax instead of the function keyword and the parameters are written before the =>. They're not hoisted, so they can't be called before they're defined.

5️⃣ What are template literals?

ANS: Template literals are a way to create strings in JavaScript. They use backticks (`). They allow us to insert expressions inside the string using ${}. They also allow us to create multi-line strings. They are more readable and easier to use than concatenation. They are used inside innerHTML to create dynamic strings.
