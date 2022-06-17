# ToDoList
NodeJS CRUD Application to implement ToDoList

Steps to Run Application:
1. Clone Repository on your local system
2. Get into the cloned folder
3. RUN command `npm i`
4. RUN command `npm start`
5 Import the postman collection to run the Application


ENDPOINTS-

 CREATE TASK: POST http://localhost:3000/addTask
               BODY 
                {
                    "taskTitle":String,
                    "taskMessage":String
                }

VIEWALLTASK: GET http://localhost:3000/viewTask

VIEWTASKBYID http://localhost:3000/viewTaskById?id={Task ID recieved from CREATE TASK API}

DELETETASK http://localhost:3000/deleteTask?task_id={ Task ID recieved from CREATE TASK API }
    
UPDATETASK http://localhost:3000/updateTask?taskId={ Task ID recieved from CREATE TASK API },
            BODY
            {
                "taskStatus":String OPTIONAL,
                "taskTitle":String OPTIONAL,
                "taskMessage": String OPTIONAL
            }