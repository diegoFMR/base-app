import util from "../util/util";

const matchController = {
  deleteMatch: (id)=>{
    return new Promise((resolve)=>{
      try{
        fetch(util.API.GAME.DELETE, {
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id})
          }).then((response)=>{
            switch(response.status){
              case 500:
                alert("There was an issue with the server. Please contact technical support.");
                break;
              case 202:
                alert("Match deleted sucessfully!")    
                break;
              default:
                alert("There was an unexpected issue with the system. Please contact technical support.");
            }//swtich ends
            resolve();
        });//fetch.then ends
    
      }catch(e){
        alert("There was an unexpected issue with the system. Please contact technical support.");
      }
    });//return ends
  },//deleteMatch ends
  insertMatch: (params, onSuccess)=>{
    let url;

    if(params.game){
      url = util.API.GAME.UPDATE;
    }else{
      url = util.API.GAME.CREATE;
    }

    try{
      fetch(url, {
        method: "post",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(params)
        }).then((response)=>{
          switch(response.status){
            case 500:
              alert("There was an issue with the server. Please contact technical support.");
              break;
            case 202:
              alert("Match saved sucessfully!")
              if(onSuccess){
                onSuccess();
              }
              break;
            default:
              alert("There was an unexpected issue with the system. Please contact technical support.");
          }//swtich ends
      });//fetch.then ends
  
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },//insertMatch ends
  findNextGameById: (team) => {
    let params = {team}
    try{
      return new Promise((resolve)=>{
        fetch(util.API.GAME.FIND_BY_ID, {
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(params)
          }).then((response)=>{
            let result;
            switch(response.status){
              case 404:
                alert(" Couldnt load the next game ");
                break;
              case 500:
                alert("There was an issue with the server. Please contact technical support.");
                break;
              case 200:
                return resolve(response.json())
              default:
                alert("There was an unexpected issue with the system. Please contact technical support.");
            }//swtich ends
  
            return result;
        });//fetch.then ends
      })//return Promise ends
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },//findNextGameById ends
  findNextGameByTeam: (team) => {
    let params = {team};
    try{
      return new Promise((resolve)=>{
        fetch("http://localhost:4200/game/findByTeam", {
          method: "post",
          headers: {'Content-Type': 'application/json'},
  
          body: JSON.stringify(params)
          }).then((response)=>{
            let result;
            switch(response.status){
              case 404:
                alert(" Couldnt load the next game ");
                break;
              case 500:
                alert("There was an issue with the server. Please contact technical support.");
                break;
              case 200:
                return resolve(response.json())
              default:
                alert("There was an unexpected issue with the system. Please contact technical support.");
            }//swtich ends
  
            return result;
        });//fetch.then ends
      })//return Promise ends
      
    }catch(e){
      alert("There was an unexpected issue with the system. Please contact technical support.");
    }
  },//findNextGameByTeam ends
}

export default matchController;