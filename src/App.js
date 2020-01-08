import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage/homepage";
import ShopPage from "./Pages/Shop/ShopPage";
import "./App.css";
import Header from "./Components/Header/Header";
import SignInAndSignUpPage from "./Pages/Signin-Signup/Signin-Signup";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); //what we returned in .utils...we want to chekc if the db has updated at that reference

        userRef.onSnapshot(snapShot => {
          //listening to any change in the data
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
          console.log(this.state);
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //sign out
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
