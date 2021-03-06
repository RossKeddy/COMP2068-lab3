/**
 * Created by Ross on 9/22/2016.
 * Lab 3 - Node.JS Simple Calculator

 This lab is for you to practice working with Node and NPM.  To complete the lab:

 - Create a node application called lab3
 - Initialize npm and create package.json via the wizard
 - Install the connect module with npm
 - Modify package.json to use nodemon to start your app
 - Create server.js
 - Write a function that Accept 3 QueryString parameters: method, x, and y
 - Possible values for the method parameter are: "add", "subtract", "multiply", and "divide"
 - If the method value is anything else, show an error message
 - Determine which math operation to run based on the value of the method parameter
 - Perform this math operation on the other 2 values (x and y)
 - Display the full math operation and its result on the page in this format: x [method] y = [result]

 - Sample URL: http://localhost:3000/lab3?method=add&x=16&y=4
 - Sample Output: 16 + 4 = 20

 - Sample URL: http://localhost:3000/lab3?method=subtract&x=16&y=4
 - Sample Output: 16 - 4 = 12

 - Sample URL: http://localhost:3000/lab3?method=multiply&x=16&y=4
 - Sample Output: 16 * 4 = 64

 - Sample URL: http://localhost:3000/lab3?method=divide&x=16&y=4
 - Sample Output: 16 / 4 = 4

 - Install npm and use the wizard to create your package.json file
 - Install the nodemon module so your application automatically restarts any time a change is saved to your lab2.js file

 To submit your lab:

 - Create a repo on GitHub called comp2106-lab3
 - Push your files to your repo on GitHub
 - Submit the link to your repo on Blackboard
 */

var connect = require('connect');
var url = require('url');

var app = connect();

/*
* Function calculates the values
*/
var calculate = function(req, res, next) {
    res.write('<h1>Calculator</h1>');

    //parse url
    var qs = url.parse(req.url, true).query;

    //initialize variables
    var method = qs.method;
    var x = parseFloat(qs.x);
    var y = parseFloat(qs.y);

	/*
	* Validation and output formatting
	*/
    if (!isNaN(x) && !isNaN(y)) { //numeric validation
        switch (method) {
            case 'add':
                res.write(x + ' + ' + y + ' = ' + (x + y));
                break;
            case 'subtract':
                res.write(x + ' - ' + y + ' = ' + (x - y));
                break;
            case 'multiply':
                res.write(x + ' * ' + y + ' = ' + (x * y));
                break;
            case 'divide':
                res.write(x + ' / ' + y + ' = ' + (x / y));
                break;
            default : //send error if method is not add/subtract/multiply/divide
                res.write('<p>Not a valid method</p>');
                break;
        };
    } else { //send error
        res.write('<p>Values must be integers!</p>');
    }; //end of numeric validation
    res.end();
};//end of function

app.use(calculate);

app.listen(3000);
console.log("Connect - running on port 3000");