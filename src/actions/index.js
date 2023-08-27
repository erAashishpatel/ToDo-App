//defined all the required const
export const ADD_LISTS= 'ADD_LISTS';
export const ADD_NEW= 'ADD_NEW';
export const UPDATE_LIST= "UPDATE_LIST";
export const DELETE_TAKS= "DELETE_TASK";
export const COMPLETE_TASK="COMPLETE_TASK";


export function TaskComplete(id){
    return{
        type:COMPLETE_TASK,
        id
    }
}

export function DeleteTask(id){
    return{
        type:DELETE_TAKS,
        id
    }
}
export function AddList(list){
    return{
        type:ADD_LISTS,
        list
    }
}

export function AddnewData(data){
    return{
        type:ADD_NEW,
        data
    }
}

export function updateState(id,text){
    return{
        type:UPDATE_LIST,
        id,
        text
    }
}

//returning a function which is then call by thunk middleware with dispatch as an argument:- This function is used to call API and then dispatching the action with the Data we get after API call.
export function HandleTodoApi(){
    
    const url= 'https://jsonplaceholder.typicode.com/todos';
    return function(dispatch){
      
        fetch(url)
        .then(response => response.json())
        .then(list => {
            dispatch(AddList(list))
        });
    }
}

//returning a function which is then call by thunk middleware with dispatch as an argument:- This function is used to make Fake API call because we cannot change server side data and then dispatching an action to add new Task to our gloabal state
export function AddTodoApi(text,length){
    const url='https://jsonplaceholder.typicode.com/todos';

    return function(dispatch){

        fetch(url,{
            method:'POST',
            headers: { "Content-Type" : "application/json"},
            body:JSON.stringify({
                userId:1,
                title:text,
                completed:false        
            })

        }).then(response => response.json())
        .then(data => {
            data.id=length;
            dispatch(AddnewData(data));
        })
    }
}

//returning a function which is then call by thunk middleware with dispatch as an argument:- This function is used to make Fake API call because we cannot change server side data and then dispatching an action to update the task for given Id in our gloabal state.
export function Update(id,updateText){
    const url=`https://jsonplaceholder.typicode.com/todos/1`;

    return function(dispatch){

        fetch(url,{
            method:'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body:JSON.stringify({
                    id:id,
                    title:updateText,
                
            })
        }).then(response => response.json())
        .then(data => {
            dispatch(updateState(Number(id),updateText)); 
        })
    }
    
}

//returning a function wich is then call by thunk middleware with dispatch as an argument:- This function is used to make Fake API call because we cannot change server side data and then dispatching an action to delete Task for given id in global state.
export function HandleDelete(id){

    const url='https://jsonplaceholder.typicode.com/todos/1';

    return function(dispatch){
        fetch(url,{
            method:'DELETE'
        }).then(response => response.json())
        .then(data => {
            dispatch(DeleteTask(id))
        })
    }
}

//returning a function wich is then call by thunk middleware with dispatch as an argument:- This function is used to make Fake API call because we cannot change server side data and then dispatching an action to complete Task for given id in global state.
export function CompleteTask(id){
    const url='https://jsonplaceholder.typicode.com/todos/1';

    return function(dispatch){
        fetch(url,{
            method:'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            body:JSON.stringify({
                    id:id,
                    completed:true,
                
            })
        }).then(response => response.json())
        .then(data => {
            dispatch(TaskComplete(id));
        })
    }
}