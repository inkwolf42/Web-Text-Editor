import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { get } from "../api/Api";
import { me } from "../api/Auth";

export default function NotAuth() {
    const nav = useNavigate()
    const [loaded,setLoaded] = useState(false)

    useEffect(()=>{
        async function check() {
            if (await me())
                nav("/")
            else
                setLoaded(true)
        }
        check()
    },[])

    return (
        loaded ?
        <Outlet/> :
        <div></div>
    );
}
