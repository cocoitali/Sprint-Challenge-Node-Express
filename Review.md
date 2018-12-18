# Review Questions

## What is Node.js?
A runtime environment that allows you to write javascript outside of the browser and works for both servers and desktop apps. For servers, Node.js uses a single-threaded loop to handle connections. Each connection allows a callback functions to handle requests, which requires less memory to handle more.
## What is Express?
Express is to backend as React is to frontend. Itom the docs, Ex a framework (and essentially a Node.js module) that adds extra functionality to Node.js. Code more succint, lighter and flexible. "An Express application is essentially a series of middleware function calls." Straight from the docs.  
## Mention two parts of Express that you learned about this week.
When you're writing Express, you're basically writing middleware and the rest is happening under the hood. Route handlers are middleware.

Express allows you to break a single function into smaller function that handles one thing at a time, allowing for more control, like React!
## What is Middleware?
Functions that get a request and response objects and can either choose to execute or call the next middleware. 
## What is a Resource?
A resource is an object, and everything is a resource and an object. The difference with objects in RESTful APIs is that a handful of methods are defined (CRUD), as opposed to regular objects that have many more methods built in. 
## What can the API return to help clients know if a request was successful? 
An HTTP status code.
## How can we partition our application into sub-applications? 
...By using Express Routers. Each router behaves like a mini application with the ability to have its own routers and middleware, but it needs to be housed inside an existing Express Application, making Routers sub-apps.

## What is express.json() and why do we need it?
express.json() is a method that comes out of the box with express that recognizes incoming request objects as strings or arrays.
You don't need express.json for GET or DELETE requests, but you do need it for POST and PUT requests, because you are sending data objects to the server and asking it to store the data that's in the body of those requests.