import { LightningElement, track,wire } from 'lwc';
import getTasks from '@salesforce/apex/ToDoListController.getTasks';
//https://sentry.io/answers/remove-specific-item-from-array/#:~:text=Combining%20indexOf()%20and%20splice,element%20at%20the%20returned%20index.
export default class Todo extends LightningElement {
    newTask='';
    //myId=5;
    @track
    todoTasks = [];//Used for array 
    updateNewTask(event){
        this.newTask = event.target.value;
    }
    
    addNewTask(event){
     //   this.todoTasks.unshift(
        this.todoTasks.push(
            {
                id:this.todoTasks.length+1,
                name : this.newTask 
             } );
            
             this.newTask = '';
      // console.log(this.todoTasks.toString());
    }
    deleteTasks(event){
        let ifToDelete = event.target.value;
        let todoTask = this.todoTasks;
        let todoTasksIndex;
      //  Method 1 -This is normal method 
      /*
        for(let i = 0;i < todoTask.length;i++ ){
            if(ifToDelete === todoTask[i].id){
                todoTasksIndex = i;
            }
        }
        this.todoTasks.splice(todoTasksIndex,1);
        */
       // Method 2 - This is shorter way to do
       /*
        this.todoTasks.splice(
            todoTask.findIndex(function(todoTsk){
                return todoTsk.id === ifToDelete;
            }),1

        );*/

        // Method 3 - This is even shorter
        this.todoTasks.splice(todoTask.findIndex(todoTsk => todoTsk.newTask.id === ifToDelete ));
        console.log('Hello');
      //  console.log("delete clicked" + JSON.stringify(todoTasks) );
      
    }

    // This method is used to fetch data from database
    @wire(getTasks)
    wireTasks;
}