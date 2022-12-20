import { useState } from 'react';
import SelectTeam from '../components/SelectTeam';
import SelectStadium from '../components/SelectStadium';
import DatePicker from 'react-datepicker';
//controller
import matchController from '../controllers/matchController';
//css and icons
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar  } from 'react-icons/fi';
import { GiBaseballBat  } from 'react-icons/gi';
import { GoLocation } from 'react-icons/go';

function MatchForm ({user, _team, _stadium, _date, isLocal, _game, _ignoreId,onSuccess, SecondaryButton }) {
  let [team, setTeam] = useState(_team?_team:'');
  let [stadium, setStadium] = useState(_stadium?_stadium:'');
  let [local, setLocal] = useState(isLocal?true: false);
  let [startDate, setStartDate] = useState(_date?new Date(_date): new Date());

  function onChangeSelect(e) {
    this.setState({"teamSelected":e.target.value});
    setTeam(e.target.value);
  }

  function onChangeStadium(e) {
    this.setState({"stadiumSelected":e.target.value});
    setStadium(e.target.value);
  }

  function onChangeDate(date) {
    setStartDate(date);
  }

  function onChangeLocal({target}) {
    setLocal(target.checked);
    if(target.checked){
      setStadium(0)
    }
  }
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    let d = new Date(startDate);
    let formatted = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} `+
    `${d.getHours()}:${d.getMinutes()}:00`; 
    let submitStadium = local?user.local_stadium: stadium;

    if((team === 0 || team === "0" || team === "") || (!local && (submitStadium === 0 || submitStadium === "0")) ){
      alert("Please check all the values and try again!")
    }else{
      try{
        let params = {
            local: local? user.team_id: team, 
            visit: local? team: user.team_id, 
            stadium: local?user.local_stadium: stadium,
            game: _game,
            date: formatted
          }
          
          matchController.insertMatch(params,onSuccess);
      }catch(e){
        alert("There was an unexpected issue with the system. Please contact technical support.");
      }
    }//ELSE ENDS
  };//handleSubmit ends

  return (
    <div className='match-container'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='match-form'>
          <div className='row'>
            <div className='icon-container'><FiCalendar/></div>
            <DatePicker
              selected={startDate}
              onChange={onChangeDate}
              showTimeSelect
              minDate={new Date()}
              dateFormat="yyyy/MM/dd hh:mm"
            />
          </div>
        <div className='row'>
          <div className='icon-container'>
            <GiBaseballBat/>
          </div>
          <SelectTeam 
            initialValue={_team} 
            onChangeSelect={onChangeSelect}
            ignoreId={_ignoreId}/>
        </div>
        
        <div className='row local-container'>
          <label>Playing as local</label>
            <input
              type='checkbox'
              className='form-input'
              id='localGame'
              checked={local}
              onChange={onChangeLocal}
            />
        </div>
        {
          local? null: <div className='row'>
            <div className='icon-container'>
              <GoLocation/>
            </div>
            <SelectStadium initialValue={_stadium} onChange={onChangeStadium}/>
            </div>
        }
        
        <div className='row btn-container'>
          <button type='submit' className='btn btn-confirm'>
            Save
          </button>
          {SecondaryButton? <SecondaryButton/>: null}
        </div>

        </div>
      </form>
    </div>
  );
};//Login ends

export default MatchForm;
