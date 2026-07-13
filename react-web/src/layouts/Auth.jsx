import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { get } from "../api/Api";
import { me } from "../api/Auth";

export default function Auth() {
    const nav = useNavigate()
    const [loaded,setLoaded] = useState(false)

    useEffect(()=>{
        async function check() {
            if (await me())
                setLoaded(true)
            else
                nav("/login")
        }
        check()
    },[])

    return (
        loaded ?
        <Outlet/> :
        <div></div>
    );
}
