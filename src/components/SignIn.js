import React, { useState, useEffect } from "react"
import { Alert } from "@material-ui/lab"
import { login } from '../services/authService'

function SignIn() {
  const intialValues = { username: "", password: "" };

  const [formValues, setFormValues] = useState(intialValues);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setMessages(validate(formValues));
    setIsSubmitting(true);
    setLoading(true);
  };

  const validate = (values) => {
    let errors = {};
    if (!values.username) {
      errors.username = "Le nom d'utilisateur est obligatoire";
    }

    if (!values.password) {
      errors.password = "Le mot de passe est obligatoire";
    }

    return errors;
  };

  const submit = () => {
    login(formValues).then(data => {
      if (data.data) {
        localStorage.setItem('token', data.data.apiToken)
        window.location.reload()
      }
      
    }).catch(e => setMessages({
      response: e
    }))
    setFormValues(intialValues);
    setLoading(false);
  };

  useEffect(() => {
    if (Object.keys(messages).length === 0 && isSubmitting) {
      submit();
    }
  }, [messages]);

  return (
    <div className="signIn">
      <form onSubmit={handleLogin}>
        {messages.response && (
          <div className="form-group">
            <Alert variant="outlined" severity={messages.type}>
              {messages.response}
            </Alert>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">
            <p>Nom d'utilisateur</p>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              className={messages.username && "input-error"}
            />
            {messages.username && (
              <Alert severity="error">{messages.username}</Alert>
            )}
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <p>Mot de passe</p>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className={messages.password && "input-error"}
            />
            {messages.password && (
              <Alert severity="error">{messages.password}</Alert>
            )}
          </label>
        </div>

        <div className="form-group">
          <button className="submit">
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>connexion</span>
          </button>
        </div>
      </form>
    </div>
  );
}


export default SignIn;
