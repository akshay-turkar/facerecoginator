import React, {useState, useEffect} from 'react'


function SignIn({onRouteChange, loadUser}) {

    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [click, setClick] = useState(false)

    const onEmailChange = (event) => {
        setSignInEmail(event.target.value)
    }
    
    const onPasswordChange = (event) => {
        setSignInPassword(event.target.value)
    }

    useEffect(() => {
        if(signInEmail && signInPassword){
            fetch("http://localhost:3000/signin", {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: signInEmail,
                    password: signInPassword 
                })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                loadUser(user)
                setClick(true);
            }
        })
        }
        else{
            console.log("error")
        }
        
    }, [click, signInPassword, signInEmail])
    
    
    const onSubmitSignIn = () => {
        if(click){
            onRouteChange('home')
        }
          
  }
    return (
        <>
        <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f4 fw6 ph0 mh0 center">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">
                            Email
                        </label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        onChange = {onEmailChange}
                        required/>
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">
                            Password
                        </label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password"
                         name="password"
                           id="password"
                           onChange = {onPasswordChange}
                           required
                        />
                    </div>
                    </fieldset>
                    <div className="center">
                    <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        onClick = {onSubmitSignIn} 
                        type="submit" 
                        value="Sign in"
                    />
                    </div>
                    <div className="lh-copy mt3 center button-p">
                    <p onClick = {() => onRouteChange('register')}  className="f6 link dim black db">Register</p>
                    </div>
                </form>
            </main>
        </article>
        </>
    )
}

export default SignIn
