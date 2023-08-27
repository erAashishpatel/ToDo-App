import React, {Component} from "react";
import { connect } from "react-redux";


import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AddTodoApi, Update } from '../actions';

class Form extends Component{

    constructor(){
        super();
        //local state for this component
        this.state={
            text:'',
            id:'',
            updateText:'',
            idNo:200
        }
    }

    //on Add task button dispatching an action to add that task into our Global state
    handleAddTask=async ()=>{
        await this.setState({
            idNo:this.state.idNo+1
        })
        const {text,idNo}=this.state;
        if(text===''){
            alert("Please Enter Task Title")
            return;
        }
        const length=idNo;
        await this.props.dispatch(AddTodoApi(text,length));
        this.setState({
            text:'',
        })
        console.log("statt",this.state);
    }

    //on clicking update button we are dispatching an action to update the task according to the provided ID
    handleUpdateTask=async ()=>{
        const {id,updateText}= this.state;
        if(id=== '' || updateText=== ''){
            alert("Please Enter the ID and Text");
            return;
        }
        const {dispatch} =this.props;
        await dispatch(Update(parseInt(id),updateText));
        this.setState({
            id:'',
            updateText:''
        })
        console.log(this.state);
    }

    //on change in input feild of Add task we are changing our local state 
    handleChange=(e)=>{
        this.setState({
            text:e.target.value
        })
    }

    //on change in update task input feild of ID :- here changing our local state
    handleIdChange=(e)=>{
        this.setState({
            id:e.target.value
        })
    }

    //on change in update task input feid of what update changing our local state
    whatUpdate=(e) =>{      
        this.setState({
            updateText:e.target.value
        })
    }

    //rendering the whole component
    render(){      
        return(
           <div className='p-3'>
                <div className="header">
                    <div className="mx-auto m-3 " style={ {width: "150px"} }>
                    <h2>Add Task</h2>
                    </div>
                </div>
                
                <div className="input-group mb-3 p-3">
                    <input type="text" className="form-control" placeholder="Enter the task" aria-label="Recipient's username" aria-describedby="button-addon2" value={this.state.text} onChange={this.handleChange} />
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.handleAddTask}>Add Task</button>
                </div>
            
                <div className="mt-5">
                    <div className="header">
                        <div className="mx-auto m-3 " style={ {width: "200px"} }>
                        <h2>Update Task</h2>
                        </div>
                    </div>
                    <div className="p-3">
                        <h4>Enter Task Title</h4>

                        <div className="input-group mb-3 ">                   
                            <input type="text" className="form-control" placeholder="What to Update" aria-label="Recipient's username" aria-describedby="button-addon2" value={this.state.updateText} onChange={this.whatUpdate} />
                        </div>

                        <h4>Enter Task Id</h4>

                        <input type="number" className="form-control " placeholder="List Id" aria-label="Recipient's username" aria-describedby="button-addon2" value={this.state.id} onChange={this.handleIdChange} />

                        <div className="mx-auto m-3 " style={ {width: "150px"} }>
                        <button className="btn btn-primary" onClick={this.handleUpdateTask}> Update Task</button>

                        </div>
                        
                    </div>
                </div>
           </div>
        )
    }
}

//getting list array from gloabal state
function mapStateToProps(state){
    return{
        list:state.list
    }
}

//connecting our form component to store to get global state access
const connectedComponent=connect(mapStateToProps)(Form);

export default connectedComponent;