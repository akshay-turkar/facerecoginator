import React, {useState, useEffect} from 'react'

function Register({onRouteChange, loadUser}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [click, setClick] = useState(false)

    const onEmailChange = (event) => {
        setEmail(event.target.value)
    }
    
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const onNameChange = (event) => {
        setName(event.target.value)
    }
    useEffect(() => {
        if(email && password && name){
            fetch("http://localhost:3000/register", {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password ,
                    name: name
                })
        })
        .then(response => response.json())
        .then(user => {
            if (user && click) {
                console.log("success");
                loadUser(user)
                onRouteChange ('home')
            }
        })
        }
        else{
            console.log("error");
        }
        
        
        
    }, [click])

    const onSubmitRegister = () => {
        setClick(true);
    }



    return (
        <>
            <article className="br3 ba  b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0 center">Register</legend>
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
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">
                                Name
                            </label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange = {onNameChange}
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
                        <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            onClick = {onSubmitRegister} 
                            type="button" 
                        >Register</button>
                        </div>
                    </form>
                </main>
            </article>
        </>
    )
}

export default Register
