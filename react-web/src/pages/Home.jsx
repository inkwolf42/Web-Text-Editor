    import { useNavigate } from "react-router-dom";
    import { clearToken, getUser } from "../api/Auth";
    import { useCallback, useEffect, useState } from "react";
    import CodeEditor from "../components/CodeEditor";
import { getFile, getFolder, updateFile } from "../api/Files";
import Folder from "../components/Folder";
import { LogOut, LogOutIcon, Save, SaveAll, SaveAllIcon, User, X } from "lucide-react";
import { useSaveShortcut } from "../shortcuts";
import ActionDropdown from "../components/DropDownMenu";
import { showProfileInfo } from "../ProfileAlert";

    export default function Home() {
        const nav = useNavigate()
        const [user,setUser] = useState(null)

        const [folder,setFolder] = useState(undefined)

        const [currentFile,setCurrentFile] = useState(-1)
        const [tabs,setTabs] = useState([])



        useEffect(()=>{
            getUser()
            .then(d=>{
                setUser(d.data.data)
                getFolder(d.data.data.folder_id).then(d=>setFolder(d.data))
            })
        },[])


        const openFileInTab = (id)=>{
            if(tabs.filter(v=>v.id==id).length===0){
                getFile(id)
                .then(d=>{setTabs(prev=>[...prev,{...d.data,changed:false}]);setCurrentFile(id)})
            }else
            setCurrentFile(id)
        }

        const closeFileInTab = (id)=>{
            if (currentFile==id){
                setCurrentContentFile(
                    tabs[(tabs.findIndex(v=>v.id==id)-1+tabs.length)%tabs.length].id
                )
            }
            setTabs(prev=>prev.filter(v=>v.id!=id))
        }

        const getCurrentFile = ()=>{
            return tabs.filter(v=>v.id==currentFile)[0]
        }

        const setCurrentContentFile = (val)=>{
            setTabs(prev=>
                prev.map(v =>
                v.id == currentFile
                    ? { ...v, content: val , changed:true}
                    : v
            ))
        }


        const handleSave = useCallback(() => {
            updateFile(currentFile, { content : (getCurrentFile()??{content:""}).content??'' })
            .then(()=>setTabs(prev=>
                prev.map(v =>
                v.id == currentFile
                    ? { ...v, changed:false}
                    : v
            )))
        }, [currentFile, tabs]);


        const handleSaveAll = useCallback(async() => {
            tabs.forEach(tab=>{
                if (!tab.changed)return

                updateFile(tab.id, { content : tab?.content??'' })
                .then(()=>setTabs(prev=>
                    prev.map(v =>
                    v.id == tab.id
                        ? { ...v, changed:false}
                        : v
                )))

            })
        }, [currentFile, tabs]);

        useSaveShortcut(handleSave)




        return (
            <div className="h-screen flex flex-col">
                <div className="flex flex-row justify-between items-baseline bg-indigo-500 shadow z-10 text-white p-2 ">
                    <h2 className="text-2xl font-bold uppercase">Hi, {user==null?"...":user.name}</h2>

                    <ActionDropdown
                        light
                        actions={[
                            { label: "Profile", icon: User, onClick: ()=>user==null?null:showProfileInfo(user) },
                            { icon:null },
                            { label: "Save File", icon: Save, onClick: ()=>handleSave() },
                            { label: "Save All File", icon: SaveAllIcon, onClick: ()=>handleSaveAll() },
                            { icon:null },
                            { label: "Logout", icon: LogOutIcon, onClick: ()=>{clearToken();nav('/login')} },
                        ]}
                    />
                </div>
                <div className="flex flex-row bg-gray-200 flex-1 min-h-0">
                    <div className="w-80 bg-indigo-50 py-4 px-2 flex flex-col gap-3 shadow z-5 ">
                        <h2 className="font-bold text-3xl">
                            Folders
                        </h2>
                        <Folder folder={folder} level={0} setFolder={setFolder} openFileInTab={openFileInTab}/>
                    </div>
                    <div className="flex-1 min-h-0 p-4 bg-indigo-100 flex justify-stretch overflow-scroll">
                        {
                            tabs.length===0?
                            <div className="bg-indigo-200 text-indigo-500 opacity-50 rounded-xl w-full flex justify-center items-center text-5xl">
                                No File Is Opened!!!
                            </div>
                            :
                            <div className="flex-col flex-1 min-h-0 p-1 bg-indigo-200 rounded-lg">
                                <div className="flex flex-row h-7">
                                    {
                                        tabs.map(v=>(
                                            <div key={v.id} className={`w-40 rounded-t-xl  shadow border-b-0 border-indigo-400 flex flex-row px-3 text-white ${v.id==currentFile?"bg-indigo-400":"bg-indigo-300"}`}>
                                                <button type="button"
                                                    className="cursor-pointer flex-1 text-start"
                                                    onClick={()=>openFileInTab(v.id)}
                                                >
                                                    {v.name}.{v.extension} {v.changed&&"*"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="cursor-pointer text-red-300 hover:text-red-400"
                                                    onClick={()=>closeFileInTab(v.id)}

                                                >
                                                    <X size={18} />
                                                </button>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="flex-1 min-h-0 h-[calc(100%-var(--spacing)*7)] border-2 border-indigo-400 overflow-clip rounded-b-lg ">

                                    <CodeEditor
                                        text={(getCurrentFile()??{content:""}).content??''}
                                        setText={setCurrentContentFile}
                                        extension={getCurrentFile()?.extension??""}
                                    />
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div>
        );
    }
