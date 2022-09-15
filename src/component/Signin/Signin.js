import React from "react";


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }


    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value });
    }

    onSubmitSignIn = () => {
        if (this.state.signInEmail && this.state.signInPassword) {
            fetch('https://quiet-shelf-72514.herokuapp.com/signin', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
                .then(res => res.json()).then(user => {
                    //console.log(data);
                    if (user.id) {
                        this.props.loadUser(user);
                        this.props.routeChange('home');
                    } else {
                        return alert('Incorrect email and password combination')
                    }
                })
        } else {
            alert('email, password cannot be empty')
        }
    }

    render() {
        const { routeChange } = this.props;
        return (
            <article className="br2 ba mv4 w-100 w-50-m w-25-l mw5 center shown shadow-5" >
                <main className="pa4 black-80">
                    <div className="measure shown">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f3 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    ype="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 br3 pv2 input-reset ba hover-white b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                onClick={this.onSubmitSignIn}
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => routeChange('register')} className="pointer f6 link dim black db">Register</p>
                        </div>
                    </div>
                </main>
            </article >
        )
    }
}
export default Signin;