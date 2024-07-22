# motd
a gridlinks microservice that handles message of the day functionality

## microservice considerations

To be considered as a microservice, some basic NFR's should be met:

1. Single Responsibility -  Each microervice should have a single responsibility.
2. Independence - Each microservice should be independant of others.
3. Scalability - Each microservice should be scalable.
4. Agnosticism - This service is built with JavaScript (Node.js), but it doesn't imply
any dependency on the technology stack of other components of the larger system

## Patterns used

CQRS - Command Query Responsibility Segregation

CQRS is a design pattern that separates the operations of a system into two distinct parts:
commands and queries.

Here's a breakdown of its core concepts:

1. **Commands**: These are operations that modify state. Essentially, any function that performs an action that changes data or has a side effect is a command.
Commands may create, update, or delete data but typically do not return any data to the caller.

2. **Queries**: These are operations that retrieve state without changing it. Queries fetch data and return it but do not modify the data or have side effects.
The principle here is that you can ask a question about the state of the system without changing the system.

