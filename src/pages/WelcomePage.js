import React from "react";
//components
import MatchForm from "../components/MatchForm";
import Modal from "../components/Modal";
import UpcomingGames from "../components/UpcomingGames";
//controllers
import matchController from "../controllers/matchController";

class WelcomePage extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      nextGames: [],
      openModal: false,
      mode: 'VIEW',
      matchProps: {},
      eliminateId: undefined
    };  

    //binding methods
    this.confirmDelete = this.confirmDelete.bind(this);
    this.cancelModal = this.cancelModal.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.editMode = this.editMode.bind(this);
    this.deleteMode = this.deleteMode.bind(this);
  }

  componentDidMount(){
    this.listGames();
  }//didMount ends

  listGames(){
    Promise.all([matchController.findNextGameById(this.state.user.team_id)])
    .then((results)=>{
      this.setState({nextGames: results[0], mode: 'VIEW', openModal: false});
    })
  }

  editMode(item){
    let isLocal;
    
    if(this.state.user.team_id === item.team_id){
      isLocal = true;
    }else{
      isLocal = false;
    }

    this.setState({
      mode: 'EDIT', 
      matchProps: {
        user: this.state.user,
        _date: item.date,
        _team: isLocal ? item.vId : item.team_id,
        _stadium: item.stadium_id,
        _game: item.game_id,
        _ignoreId: this.state.user.team_id,
        isLocal,
        SecondaryButton: ()=><button className="btn btn-cancel" onClick={this.cancelEdit}> Cancel</button>,
        onSuccess: ()=>this.listGames()
      }
    });
  }//editMode ends

  deleteMode(item){
    this.setState({openModal: true, eliminateId: item.game_id})
  }

  confirmDelete(){
    matchController.deleteMatch(this.state.eliminateId)
      .then(this.listGames());
  }

  cancelModal(){
    this.setState({openModal: false});
  }

  cancelEdit(e){
    e.preventDefault();
    this.setState({mode: 'VIEW'})
  }

  render(){
    let show;
    if(this.state.mode === 'VIEW'){
      show = <UpcomingGames games={this.state.nextGames} onEdit={this.editMode} onDelete={this.deleteMode} />;
    }else if(this.state.mode === 'EDIT'){
      show = <MatchForm {...this.state.matchProps}/> //_team, _stadium, _date
    }

    return(
      <div className="welcome">
        <p className="welcome-p">Welcome back {this.state.user.name}</p>
        <div>Your team: <h4 className="team-name">{this.state.user.teamName}</h4></div>
        <div>
          {this.state.mode === 'VIEW'? <p>Next 2 upcoming games</p>:null}
          {show}

          <Modal
            tittle={'Are you sure that you want to delete this game?'}
            openModal={this.state.openModal}
            confirmClick={this.confirmDelete}
            cancelClick={this.cancelModal}
          />
        </div>
      </div>
    );
  };//render ends
};

export default WelcomePage;
