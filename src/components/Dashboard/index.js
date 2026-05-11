import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Home from "./home";
import Login from '../Login';
import "./index.scss"

const Dashboard = () => {

    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsub();
    }, []);


    return (
       <div className="btn-wrapper">
           {user ? <Home /> : <Login />}
       </div>
    )
}

export default Dashboard;