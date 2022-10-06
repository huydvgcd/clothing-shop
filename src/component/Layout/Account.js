import { Link } from 'react-router-dom';
function Account(){
    return(
        <div class="col-sm-3">
            <div class="left-sidebar">
                <h2>Account</h2>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a>
                                <Link to="/Account" class="fa fa-user">ACCOUNT</Link>
                            </a>
                        </h4>
                    </div>
                </div>
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a>
                            <Link to="/Account/MyProduct" class="fa fa-user">PRODUCT</Link>
                            </a>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Account