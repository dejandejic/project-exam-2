import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import AuthActions from "redux/auth/actions";
import NavigationActions from "redux/navigation/actions";
import enhancer from "./enhancer/LoginFormEnhancer";
import { checkApi, loginApi } from "services/authServices";
import { Eye, EyeOff, Lock, Mail } from "react-feather";
import LoaderComponent from "components/common/LoaderComponent";

const { login, check } = AuthActions;
const { success, error, toggleOneTimeModal, fetching } = NavigationActions;
const Login = props => {
  const {
    token,
    success,
    error,
    values,
    handleChange,

    handleBlur,
    errors,
    touched,
    submitCount,
    toggleOneTimeModal,
    fetching,
    isFetching
  } = props;
  const [pwdView, togglePwdView] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const checkLogin = async () => {
    fetching();
    await checkApi(token).then(data => {
      if (data.success) {
        check(data.data);
        success();
        props.history.push("/intro");
      } else {
        error();
      }
    });
  };

  useEffect(() => {
    token !== null && checkLogin();
    // eslint-disable-next-line
  }, []);
  const handleLogin = async e => {
    let { values, isValid, handleSubmit } = props;
    e.preventDefault();
    handleSubmit();
    if (isValid) {
      fetching();
      await loginApi(values).then(data => {
        if (data.success) {
          success(data.message);
          props.login(data.data);
          if (rememberMe) {
            var date = new Date();
            date.setDate(date.getDate() + 7);
            document.cookie = `token=${data.data.token} ;SameSite=strict;expires=${date}`;
          }

          props.history.push("/intro");
        } else {
          error(data.message);
        }
      });
    }
  };

  const Error = props => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </span>
      );
    } else {
      return <span />;
    }
  };
  return isFetching ? (
    <div className="row text-center">
      <LoaderComponent />
    </div>
  ) : (
    <div className="container-fluid">
      <div className="row login-page">
        <div className="col-lg-12 align-self-center login-main">
          <div className="shape-bg"></div>
          <div className="login-inner-content">
            <div className="form-container">
              {/* <div className="login-icon text-center">
                <img src={logo} alt="logo" className="img-fluid" />
              </div> */}
              <div className="login-title">
                Login!
                <span>Please login your account.</span>
              </div>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label>Email</label>
                  <Mail className="form-icons" />
                  <input
                    type="email"
                    className="form-control react-form-input"
                    id="email"
                    onChange={handleChange}
                    value={values.email}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                  />
                  <Error field="email" />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <Lock className="form-icons" />
                  <div className="input-group">
                    <input
                      type={pwdView ? "text" : "password"}
                      className="form-control react-form-input"
                      id="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter password"
                      style={{
                        borderRight: "0px",
                        borderBottomRightRadius: "0px",
                        borderTopRightRadius: "0px"
                      }}
                    />
                    <div className="input-group-append thead-dark">
                      <button
                        className="btn btn-link react-form-input"
                        type="button"
                        style={{
                          borderLeft: "0px",
                          borderBottomLeftRadius: "0px",
                          borderTopLeftRadius: "0px"
                        }}
                        onClick={() => togglePwdView(!pwdView)}
                      >
                        {pwdView ? (
                          <EyeOff className="sm-svg" />
                        ) : (
                          <Eye className="sm-svg" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Error field="password" />
                </div>
                <button type="submit" className="btn form-button btn-blue mt-4">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    token: state.auth.accessToken,
    isFetching: state.navigation.isFetching
  };
};
export default compose(
  withRouter,
  enhancer,
  connect(mapStateToProps, {
    check,
    login,
    success,
    error,
    toggleOneTimeModal,
    fetching
  })
)(Login);
