import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";


function SideBar(){
  const navigate = useNavigate();
  const [, setUserProfile] = useState(null);//destructuring one only to avoid unused var warning

  let onSelect = url=>{

    if(url === "/logout"){
        setUserProfile(null);
        url = "/login";
    }
    navigate(url);
  }

  return(
        <SideNav
            onSelect={onSelect}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
              <NavItem eventKey="/welcome">
                  <NavIcon>
                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Home
                  </NavText>
              </NavItem>
              <NavItem eventKey="/create/match">
                  <NavIcon>
                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      Create match
                  </NavText>
              </NavItem>
              <NavItem eventKey="/logout">
                  <NavIcon>
                      <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                      LOG OUT
                  </NavText>
              </NavItem>
          </SideNav.Nav>
      </SideNav>
    );//return ends
}//SideBar ends

export default SideBar;
