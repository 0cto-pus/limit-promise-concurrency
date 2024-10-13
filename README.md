# Interview Question 
This repo implements an asynchronous request queue with a limit on concurrent tasks. The queue uses promise factories to handle tasks and ensures that no more than three tasks run simultaneously.

## TODO

- **Enqueue a Task**: Add a task to the queue using a promise factory.
- **Concurrency Limit**: Ensure only 3 tasks run simultaneously.
- **Queue Management**: Automatically check the queue and start tasks when the limit allows.

## How It Works

- `Enqueue a Task`: You can add tasks to the queue using the enqueue method, which takes a promise factory as input.
- `Task Execution`: When the number of currently running tasks is below the limit (3), the task is executed immediately. Otherwise, it gets pushed into the queue to wait.
- `Queue Management`: As soon as a running task completes, the queue is checked, and the next task is executed if the limit allows.

## Result

![result](https://github.com/user-attachments/assets/2de15aad-286f-4fad-b302-0178049429b6)
