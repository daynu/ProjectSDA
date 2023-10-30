export default function Login()
{
    return(
        <>
            <h2>Log into your account</h2>
            <form id = 'loginForm'>
                <input type="text" placeholder="email" />
                <input type="password" placeholder="password" />
                <input type="submit" value="Log in"/>
            </form>
            <div>
                <p>Don't have an account? <a style={{color: 'blue'}} href="/signup">Click here to sign up</a></p>
            </div>
        </>
    )
}