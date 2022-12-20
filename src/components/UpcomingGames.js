import { FiNavigation,FiCalendar } from 'react-icons/fi';
import { BiBaseball } from 'react-icons/bi';
import { MdDeleteOutline,MdMode } from 'react-icons/md';

function UpcomingGames({games, onEdit, onDelete}){

  let results;
  
    if(games.length > 0){
      results = games.map((item, index)=>{
        return (
          <div key={index} className="game-container">
            <div className="buttons-container">
              <div className="delete btn-icon" onClick={()=>onDelete(item)}>
                <MdDeleteOutline/>
              </div>
              <div className="edit btn-icon" onClick={()=>onEdit(item)}>
                <MdMode/>
              </div>
  
            </div>
            
            <div>
              Local: {item.localTeam}
            </div> 
            <div>
              Visit: {item.visitT}
            </div> 
            <div>
              <BiBaseball/> {item.stadiumName}
            </div>
            <div>
            <FiNavigation/> {item.stadiumAddress}
            </div>
            <div>
            <FiCalendar/> {item.date}
            </div>
          </div>   
        )
      })//map ends
    }else{
      results = <h2>No games found</h2>
    }
    

    return results;
  }//showNextGame ends

  export default UpcomingGames