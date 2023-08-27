//importing all the required const from actions
import { ADD_LISTS,
    ADD_NEW,
    COMPLETE_TASK,
    DELETE_TAKS,
    UPDATE_LIST 
} from '../actions'

//initial state
const initialState={
    list:[]
}

export default function TodoLists(state= initialState,action){
  switch(action.type){
      //Adding all the data that we got from making API call to our state
      case ADD_LISTS:
          return{
              list:action.list
          }
      //Adding new task to our state
      case ADD_NEW:
          return{
              list:[action.data , ...state.list ]
          }
      //updating the task in our state
      case UPDATE_LIST:
          const text=action.text;
          const index=state.list.findIndex( list => list.id === action.id); //getting index of the task from List array in our state on the basis of Id
          const newArray=state.list.map(listeItem => ({...listeItem}));//deep cloaning the list array from state
          newArray[index].title=text;//changing title
          return{
              ...state,
              list:newArray
          }
      case DELETE_TAKS:
          //filetering array on the basis of given ID and then changing list array in state from this filtered Array
          const filteredArray=state.list.filter(list => list.id !== action.id);
          return{
              ...state,
              list:filteredArray
          }
      case COMPLETE_TASK:
          const i=state.list.findIndex( list => list.id === action.id); //getting index of the task from List array in our state on the basis of Id
          const copyArray=state.list.map(listeItem => ({...listeItem}));//deep cloaning the list array from state
          copyArray[i].completed=true;//changing completed to true
          return{
              ...state,
              list:copyArray
          }
      default:
          return  state;
          
  }
}