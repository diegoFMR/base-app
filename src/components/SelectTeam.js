// import { useState } from 'react';
import React from "react";
//controllers
import teamController from "../controllers/teamController";

class SelectTeam extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      teamSelected: props.initialValue? props.initialValue: "0",
      teamList: [],
      ignoreId: props.ignoreId,
      loading: true
    };
    this.id = props.id;
    
    this.onChangeSelect = props.onChangeSelect.bind(this);
  }

  componentDidMount(){
    Promise.all([teamController.requestTeam()]).then((data)=>{
      this.setState({ "teamList": data[0], loading: false});
    });
  }//componentDidMount end

  showList(array){
    
    let results = [];
    
    if(array){
      results = array.map((item)=>{

        if(this.state.ignoreId === item.team_id){
          return [];
        }
  
        return (
          <option value={item.team_id} key={item.team_id}> {item.name} </option>
        )
      })//map ends
    }

    return results;
  }

  render(){
    return(
        <div className={`select-container form-input ${this.state.loading? 'loading':''}`}>
          <select 
            id={this.id}
            value={this.state.teamSelected} 
            onChange={this.onChangeSelect}
          >
            <option value="0" className="loading">
               {this.state.loading? "Loading...": 
                  this.state.teamList ? "Please select one item..." : "No items found..." 
                }
            </option>
            {this.showList(this.state.teamList)}
          </select>
        </div>
        
    );
  };//render ends
};
export default SelectTeam;
