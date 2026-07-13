import { useNavigate, useSearchParams } from "react-router-dom";
import { getToken, saveToken } from "../api/Auth";
import { useEffect } from "react";

export default function RedirectPage() {

    const nav = useNavigate()

    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    useEffect(()=>{
        saveToken(token)
        nav("/")

    },[])

    return (
        <div>
            <h1>RedirectYou Have Loged In !!!!</h1>
        </div>
    );
}
