import React from "react";
//controllers
import stadiumController from "../controllers/stadiumController.js";

class SelectStadium extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      stadiumSelected: props.initialValue? props.initialValue: "0",
      stadiumList: []
    };

    this.id = props.id;

    this.onChange = props.onChange.bind(this);
  }

  componentDidMount(){
      Promise.all([stadiumController.listStadiums()]).then((data)=>{
        this.setState({ "stadiumList": data[0]});
      });
  }

  showList(array){
    let results = array.map((item)=>{
      return (
        <option value={item.stadium_id} key={item.stadium_id}> {item.name} </option>
      )
    })//map ends

    return results;
  }

  render(){
    return(
        <div>
          <select 
            id={this.id}
            value={this.state.stadiumSelected} 
            onChange={this.onChange}
          >
            <option value="0"> Please select the stadium...</option>
            {this.showList(this.state.stadiumList)}
          </select>
        </div>
        
    );
  };//render ends
};
export default SelectStadium;
