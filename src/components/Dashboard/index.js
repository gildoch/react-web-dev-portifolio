import { useState } from "react";
import Home from "./home";
import "./index.scss"

const Dashboard = () => {
    const [user, setUser] = useState(true);

    return (
       <div className="btn-wrapper">
           {user && <Home />}
       </div>
    )
}

export default Dashboard;