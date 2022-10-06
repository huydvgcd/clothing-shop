
import Login from "./Login"
import Register from "./Register"

function Index(){
    return(
        <div className="row">
            <Login/>
            <div class="col-sm-1">
			    <h2 class="or">OR</h2>
		    </div>
            <Register/>
        </div>
    )
}
export default Index