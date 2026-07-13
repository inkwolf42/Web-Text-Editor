    import { useNavigate } from "react-router-dom";
    import { clearToken, getUser } from "../api/Auth";
    import { useEffect, useState } from "react";
    import CodeEditor from "../components/CodeEditor";

    export default function Home() {
        const nav = useNavigate()
        const [user,setUser] = useState(null)

        const [currentFile,setCurrentFile] = useState(-1)
        const [value,setValue] = useState("")



        useEffect(()=>{
            getUser()
            .then(d=>setUser(d.data.data.user))
            .catch()
        },[])


        return (
            <div className="h-screen flex flex-col">
                <div className="flex flex-row justify-between items-baseline bg-indigo-500 shadow z-10 text-white p-2 ">
                    <h2 className="text-2xl font-bold uppercase">Hi, {user==null?"...":user.name}</h2>
                    <button
                        className="bg-red-400 px-2 py-1 rounded font-bold text-xl hover:brightness-90"
                        onClick={()=>{clearToken();nav('/login')}}>Logout</button>
                </div>
                <div className="flex flex-row bg-gray-200 flex-1 min-h-0">
                    <div className="w-60 bg-indigo-50 p-2 flex flex-col gap-3 shadow z-5 ">
                        <h3>File 1</h3>
                        <h3>File 2</h3>
                        <h3>File 3</h3>
                    </div>
                    <div className="flex-1 min-h-0 p-4 bg-gray-100 flex justify-stretch overflow-scroll">
                        <CodeEditor
                            value={value}
                            onChange={setValue}
                        />
                    </div>
                </div>
            </div>
        );
    }
