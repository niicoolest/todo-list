# Todo List ✍️
#### Entry to TOP's todo list exercise
#### Live preview can be found <a href="https://niicoolest.github.io/todo-list/">here</a>

### About 👨‍🏫
The todo list have projects or separate lists of todos. When a user first opens the app, there is some sort of ‘default’ project called 'Home' to which all of the todos are put. Users can create new projects and choose which project their todos go into. **localStorage** is used to save user’s projects and todos between sessions.


### WIL/Thoughts 🤔
Tried revisiting and reading about SOLID principles to properly write a maintable code. 


📌 **Single Responsibility Principle** . Design classes/functions in a way that it is only doing ONE thing.

📌 **Open/Closed Principle** - For me , this is very difficult to apply. You really have to think carefully about each class design, its associations, relationships etc.

📌 **Liskov Substitution Principle** - It is like saying that a child can act as a proxy to the parent (my definition for simplicity 😆). I believe this is almost always enforced in OOP languages like Java.

📌  **Interface Segregation Principle** - In simple terms, interfaces should not force implementing classes to implement methods they do not need. That is why we have functional interfaces, interfaces with only one abstract method. This special type of interface enforces ISP.

📌 **Dependency Inversion Principle** - At first, I had trouble understanding what the second rule of this principle meant.
> High-level modules should not depend on low-level modules.  Both should depend on abstractions. 

This is achievable by using constructs such as interfaces to facilitate loose coupling between modules. 

> Abstractions should not depend upon details.  Details should depend upon abstractions.

I did not quite understand what it meant at first. After searching through the web, this 👇 is the best answer I found.

🥇 <em>It means that if the details change they should not affect the abstraction. The abstraction is the way clients view an object. Exactly what goes on inside the object is not important. Lets take a car for example, the pedals and steering wheel and gear lever are abstractions of what happens inside the engine. They do not depend on the details though because if someone changes my old engine for a new one I should still be able to drive the car without knowing that the engine changed.

The details on the other hand MUST conform to what the abstraction says. I would not want to implement an engine that suddenly causes the brakes to double the speed of the car. I can re-implement brakes any way I want as long as externally they behave the same way.</em>

