class AsncRequestQueue {
   constructor() {
      this.maxTask = 3;
      this.taskCount = 0;
      this.queue = [];
   }
   //Enqueue tasks if it is below 3 and increase taskCount. If taskCount greater than 3 then push the task into the queue.
   enqueue(promiseFactory) {
      if (this.taskCount < this.maxTask) {
         this.taskCount++;
         this.executeTask(promiseFactory);
      } else {
         // this.queue.push(this.executeTask(promiseFactory)); -> This one is a good silly mistake. Calling function instead of push the reference into the queue causing call everyone of them at once.
         this.queue.push(() => this.executeTask(promiseFactory));
      }
   }
   //Executes tasks and after a task finishes its job decrease the taskCount. Since taskCount decreased we can get one more task from the queue calling handleNewRequests()
   executeTask = async (promiseFactory) => {
      try {
         await promiseFactory();
      } finally {
         this.taskCount--;
         this.handleNewRequests();
      }
   };

   //Put a task on the track with shifting array so FIFO works.
   handleNewRequests() {
      if (this.queue.length === 0 || this.taskCount >= this.maxTask) {
         return;
      }

      const newTaskFromArray = this.queue.shift();
      newTaskFromArray();
   }
}

function generateRandomSeconds(max, min) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

const queue = new AsncRequestQueue();

function promiseFactory(index) {
   return async () => {
      const seconds = generateRandomSeconds(1000, 5000);
      console.log(
         `Running task ${index} - Waiting for ${seconds / 1000} seconds`
      );
      await new Promise((r) => {
         setTimeout(r, seconds);
      });
      console.log(`Finished task ${index}`);
   };
}

queue.enqueue(promiseFactory(1));
queue.enqueue(promiseFactory(2));
queue.enqueue(promiseFactory(3));
queue.enqueue(promiseFactory(4));
queue.enqueue(promiseFactory(5));
queue.enqueue(promiseFactory(6));
queue.enqueue(promiseFactory(7));
