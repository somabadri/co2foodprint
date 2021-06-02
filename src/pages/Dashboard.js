import React from "react";
import { useState, useEffect } from 'react'
import '../styles/dashboard.scss'
import Tracker from '../components/Tracker'
import NavbarComponent from '../components/Navbar';
import Footer from '../components/Footer';
import Post from '../components/Post';
import { BrowserRouter, Route, Switch, withRouter } from 'react-router-dom';
import About from './About.js'
import Button from 'react-bootstrap/Button';


function Dashboard() {
  const [users, setUsers] = useState([{}]);
  const [index, setIndex] = useState();
  const [following, setFollowing] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [elem, setElem] = useState({});
  useEffect(() => {
    const data = {
      name: localStorage.getItem('current name'),
      email: localStorage.getItem('current email'),
      pic: localStorage.getItem('current pic')
    }
    fetch('http://localhost:5000/api/v1/users/' + data.email, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (!response.ok) {
        return 'error';
      }
      return response.json();
    }).then((json) => {
      if (json.users.length === 0) {
        authenticateUser(data);
      }
    }).then(() => {
      fetch('http://localhost:5000/api/v1/users', {
        "method": "GET",
        "headers": {
          "Content-Type": "application/json"
        },
      }).then((response) => {
        if (!response.ok) {
          return 'error';
        }
        return response.json();
      }).then((json) => {
        setUsers(json.users);
      }).catch((error) => {
        throw (error);
      });
    }).catch((error) => {
      throw (error);
    });
  }, []);

  function authenticateUser(data) {
    const newUser = {
      "name": data.name,
      "user_id": data.email,
      "profile_pic": data.pic
    }
    fetch('http://localhost:5000/api/v1/users', {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify(newUser)
    }).then((response) => {
      if (!response.ok) {
        return 'error';
      }
      return response.json();
    }).catch((error) => {
      throw (error);
    });
  }

  useEffect(() => {
    if (following[index]) {
      alert("you are already following this user");
    } else {
      if (firstRender) {
        setFirstRender(false);
      } else {
        const email = localStorage.getItem('current email');
        const data = {
          "name": elem.name,
          "friend_id": elem.user_id,
          "profile_pic": elem.profile_pic
        }
        fetch('http://localhost:5000/api/v1/users/' + email + '/friends', {
          "method": "POST",
          "headers": {
            "Content-Type": "application/json"
          },
          "body": JSON.stringify(data)
        }).then((response) => {
          if (!response.ok) {
            return 'error';
          }
          return response.json();
        }).catch((error) => {
          throw (error);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function checkFollow(element, idx) {
    const email = localStorage.getItem('current email');
    let fol = [...following];
    fetch('http://localhost:5000/api/v1/users/' + email, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json"
      },
    }).then((response) => {
      if (!response.ok) {
        return 'error';
      }
      return response.json();
    }).then((json) => {
      if (json.users[0].friends.find(friend => {
        return friend.friend_id === element.user_id;
      })) {
        fol[idx] = true;
      } else {
        fol[idx] = false;
      }
      setFollowing(fol);
      setElem(element);
    }).then(() => {
      setIndex(idx)
    }).catch((error) => {
      throw (error);
    });
  }

  function showPosts(users) {
    if (users[1] === undefined) {
      return <div></div>
    } else {
      return users.map((element, idx) => {
        return (element.user_id === localStorage.getItem('current email') ?
          <div></div>
          :
          <div>
            <Post key={idx} name={element.name} content={element.most_recent_post} pic={element.profile_pic} />
            <div className="follow-button">
              <Button variant="light" onClick={() => checkFollow(element, idx)} disabled={following[idx]}>{following[idx] ? "Following" : "Follow"}</Button>
            </div>
          </div>
        )
      }
      )
    }
  }

  return (
    <BrowserRouter>
      <div>
        <NavbarComponent />
        <div className="dashboard">
          <div className="left-section">
            <div className="tracker">
              <Tracker />
            </div>
            <div className="buttons">

            </div>
          </div>
          <div className="right-section">
            <div className="posts">
              {showPosts(users)}
            </div>
          </div>
        </div>
        <Footer />
        <Switch>
          <Route path="/about/" component={withRouter(About)} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default Dashboard;
