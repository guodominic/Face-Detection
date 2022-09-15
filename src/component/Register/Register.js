import React from "react";


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    onSubmitRegister = () => {
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //regular expression

        if (this.state.email.match(mailFormat)) {
            fetch('https://quiet-shelf-72514.herokuapp.com/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            }).then(res => res.json()).then(user => {
                //console.log(user);
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.routeChange('home');
                }

            })
        } else {
            return alert('please use valid email format')
        }
    }


    emailValidation = () => {
        const mail = document.getElementById("text").value;
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!validRegex.text(mail)) {
            alert('Invalid email format')
            return false;
        }
    }
    /*             document.getElementById('text').addEventListener('blur', function() {
            const mail = document.getElementById("text").value;
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if (!validRegex.text(mail)) {
                alert('Invalid email format')
                return false;
            }
        }
            ) */

    render() {

        return (
            <article className="br2 ba mv4 w-100 w-50-m w-25-l mw5 center shown shadow-5" >
                <main className="pa4 black-80">
                    <div className="measure shown">
                        <fieldset id="register" className="ba b--transparent ph0 mh0">
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">User Name</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="name"
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 br3 input-reset ba b--white hover-white bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                                onClick={this.onSubmitRegister}
                            />
                        </div>
                    </div>
                </main>
            </article >

        )

    }

}
export default Register;