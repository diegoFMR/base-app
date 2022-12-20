import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SelectTeam from '../components/SelectTeam';
import util from '../util/util';

//css
import '../style/app.css';
//icons
import { GrContactInfo } from 'react-icons/gr';

function RegisterPage ({setUserProfile}) {
  let [pwdRegister, setPwdRegister] = useState('');
  let [emailRegister, setEmailRegister] = useState('');
  let [name, setName] = useState('');
  let [team, setTeam] = useState('');

  let navigate = useNavigate();

  function onChangeSelect(e) {

    this.setState({"teamSelected":e.target.value});
    setTeam(e.target.value);
  }
  
  let handleSubmit = async (e) => {
    e.preventDefault();

    if((team === 0 || team === "0") || !name || !emailRegister || !pwdRegister ){
      alert("Please enter all the values!")
    }else{
      try{
        let params = {team, name, "email":emailRegister, "pwd":pwdRegister}
        fetch(util.API.USER.REGISTER, {
          method: "post",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(params)
          }).then((response)=>{
  
            switch(response.status){
              case 409:
                alert(" That email is already in use! ");
                break;
              case 500:
                alert("There was an issue with the server. Please contact technical support.");
                break;
              case 202:
                alert("User registered sucessfully!")
                navigate('/login');
                break;
              default:
                alert("There was an unexpected issue with the system. Please contact technical support.");
            }//swtich ends
        });//fetch.then ends
  
        
      }catch(e){
        alert("There was an unexpected issue with the system. Please contact technical support.");
      }
    }//ELSE ENDS
  };//handleSubmit ends

  return (
    <div className='outer'>
      <div className='login-container'>
        <div className='form-container'>
          <div className='login-label'>
            <GrContactInfo/>
          </div>
          <form className='form' onSubmit={handleSubmit}>
            <div className='form-row'>
              <label htmlFor='name' className='form-label'>
                Team
              </label> 
              <SelectTeam id="teamRegister" onChangeSelect={onChangeSelect}></SelectTeam>
            </div>
            <div className='form-row'>
              <label htmlFor='name' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-input'
                id='pwdRegister'
                value={pwdRegister}
                onChange={(e) => setPwdRegister(e.target.value)}
              />
            </div>
            <div className='form-row'>
              <label htmlFor='email' className='form-label'>
                email
              </label>
              <input
                type='email'
                className='form-input'
                id='emailRegister'
                value={emailRegister}
                onChange={(e) => setEmailRegister(e.target.value)}
              />
            </div>
            <div className='form-row'>
              <label htmlFor='email' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-input'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='btn-container'>
              <button type='submit' className='btn btn-confirm'>
                Register
              </button>
              <div className='form-row link-container'>
                <p onClick={()=>navigate('/login')}>Go to login...</p>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};//Login ends

export default RegisterPage;
