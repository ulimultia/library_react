import React  from "react";
// import ComponentLogin from "components/login.component"
// import Card from "reactstrap/lib/Card";
// import CardBody from "reactstrap/lib/CardBody";
import LoginForm from "components/LoginForm"
// import RegisterForm from "components/RegisterForm"
import "./login.css"


class Login extends React.Component {

  render() {
    return (
      <>
        <div>
            <LoginForm/>
            {/* <RegisterForm /> */}
          {/* <ComponentLogin /> */}
          {/* <Card>
                  <CardBody>
                      <p class="login-box-msg">Silahkan masuk untuk mendapatkan fitur katalog!</p>

                      <form action="#" method="post" id="login-form">
                          <span class="font-weight-lighter" id="emailHelp"></span>
                          <div class="input-group mb-3">
                              <input type="email" class="form-control" id="email" placeholder="Email">
                              <div class="input-group-append">
                                  <div class="input-group-text">
                                      <span class="fas fa-envelope"></span>
                                  </div>
                              </div>
                          </div>
                          <span class="font-weight-lighter" id="passwordHelp"></span>
                          <div class="input-group mb-3">
                              <input type="password" class="form-control" id="password" placeholder="Kata sandi">
                              <div class="input-group-append">
                                  <div class="input-group-text">
                                      <span class="fas fa-lock"></span>
                                  </div>
                              </div>
                          </div>
                          <div class="icheck-primary">
                              <input type="checkbox" id="remember">
                              <label for="remember"> Remember Me</label>
                          </div>
                          <button type="button" class="btn btn-primary btn-block mt-3" id="login-button">Masuk</button>
                      </form>

                      <p class="text-center mt-3">
                          Belum punya akun? <a href="register.html">Daftar</a> sekarang.
                      </p>
                  </CardBody>
            </Card> */}
          </div>
      </>
    );
  }
}
export default Login;
