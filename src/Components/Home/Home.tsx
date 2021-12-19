import { useContext } from "react";
import AuthContext from "../../store/auth.context";
import Article from "../Article/Article";
import Login from "../Login/Login";

const Home = (props: {}) => {
    const authCtx = useContext(AuthContext);

    return (
        <div>
            {!(authCtx.isLoggedIn) &&
                <Login />
            }
            {(authCtx.isLoggedIn) &&
                <Article
                    userid={authCtx.user?.userid}
                />
            }
        </div>
    )
};

export default Home;