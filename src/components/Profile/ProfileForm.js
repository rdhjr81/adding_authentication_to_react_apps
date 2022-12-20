import { useContext, useRef } from 'react';
import { useHistory } from "react-router-dom";
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const submitHandler = (evt) => {
    evt.preventDefault();
    const enteredNewPassword = newPasswordRef.current.value;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;
    fetch(url,{
      method: 'POST',
      headers:{
        'Content-Type': 'appplication/json'
      },
      body: JSON.stringify({
        idToken: authContext.token,
        password: enteredNewPassword,
        returnSecureToken: true
      })
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      history.replace('/')
    })

  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} min="7"/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
