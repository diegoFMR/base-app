//UTIL
import util from '../util/util';

const loginController = {

    findUser: (data) => {
        let params = {email: data.email, pwd: data.pwd}

        return new Promise((resolve)=>{
            try{
                fetch(util.API.USER.FIND_USER, {
                  method: "post",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(params)
                  })
                  .then((response)=>{
                    switch(response.status){
                      case 404:
                        alert(" Wrong user name or password ");
                        break;
                      case 500:
                        alert("There was an issue with the server. Please contact technical support.");
                        break;
                      case 200:
                        resolve(response.json())      
                        break;
                      default:
                        alert("There was an unexpected issue with the system. Please contact technical support.");
                    }//swtich ends
                })//fetch.then ends  
              }catch(e){
                alert("There was an unexpected issue with the system. Please contact technical support.");
              }
        });//return Promise ends
        
    }//handleSubmit ends
}

export default loginController;