import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../styles/LandingPage.css";
import TeacherRegistration from "./TeacherComponents/TeacherRegistration";
import StudentRegistration from "./StudentComponents/StudentRegistration";
import LandingContent from "./LandingContent";
import LoginForm from "./LoginForm";
import UserContainer from "./UserContainer";
import TeacherContainer from "./TeacherComponents/TeacherContainer";
import BuyCredits from "./StudentComponents/BuyCredits";
import EditProfile from "./EditProfile";
import TeacherShow from "./TeacherComponents/TeacherShow";

export default class LandingPage extends Component {
  render() {
    // console.log(this.props);
    return (
      <div className="landing-page">
        <Switch>
          {this.props.logged_in ? (
            <Switch>
              <Route
                path="/profile"
                render={props => (
                  <UserContainer
                    {...props}
                    current_user={this.props.current_user}
                    teachers={this.props.teachers}
                    ratings={this.props.ratings}
                    user_type={this.props.user_type}
                    // findUser={this.props.findUser}
                    timeslots={this.props.timeslots}
                  />
                )}
              />
              {/* TODO Move these down to child */}
              <Route
                path="/teachers"
                render={props => (
                  <TeacherContainer
                    {...props}
                    current_user={this.props.current_user}
                    teachers={this.props.teachers}
                    ratings={this.props.ratings}
                    user_type={this.props.user_type}
                    timeslots={this.props.timeslots}
                  />
                )}
              />
              <Route path="/buycredits" component={BuyCredits} />
              <Route path="/editprofile" component={EditProfile} />
              <Route
                path="/viewteacher/:id"
                render={props => (
                  <TeacherShow {...props} timeslots={this.props.timeslots} />
                )}
              />
            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={LandingContent} />
              <Route
                path="/login"
                render={props => (
                  <LoginForm {...props} setUser={this.props.setUser} />
                )}
              />
              <Route
                path="/newteacher"
                render={props => (
                  <TeacherRegistration
                    {...props}
                    setUser={this.props.setUser}
                  />
                )}
              />
              <Route
                path="/newstudent"
                render={props => (
                  <StudentRegistration
                    {...props}
                    setUser={this.props.setUser}
                  />
                )}
              />
            </Switch>
          )}
        </Switch>
      </div>
    );
  }
}
