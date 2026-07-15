import { ChevronDown, ChevronRight, Download, FileIcon, FilePlus, FolderIcon, FolderPlus, TextCursorIcon, Trash, UploadIcon } from "lucide-react";
import { createFile, createFolder, deleteFile, deleteFolder, renameFolder, updateFile, uploadFile } from "../api/Files";
import ActionDropdown from "./DropDownMenu";
import { askForName, confirmButtonText } from "../alerts";
import { useState } from "react";
import { getFileIcon } from "../LanguageMap";
import { downloadFile, downloadFolder } from "../Downloader";
import { useFilePicker } from "../../FileSelector";
import { toast } from "react-toastify";

export default function Folder({
    level,
    folder,
    setFolder,
    onDelete,
    openFileInTab
}) {
    if(folder==undefined)return <div/>

    const [expanded,setExpanded] = useState(false)


    const OnClickCreateFolder = async ()=>{
        const n = await askForName('folder')
        if(!n.isConfirmed)return
        createFolder(folder.id,n.value)
        .then(d=>{
            setFolder(prev=>({...prev,folders:[...prev.folders,d.data]}))
            toast.success(`The Folder "${n.value}" has been created.`)
        })
    }

    const OnClickCreateFile = async ()=>{
        const n = await askForName('file')
        if(!n.isConfirmed)return
        const lastDot = n.value.lastIndexOf(".");

        let file_name
        let extention

        if (lastDot === -1) {
            file_name = n.value;
            extention = 'txt';
        }else{
            file_name = n.value.slice(0, lastDot);
            extention = n.value.slice(lastDot + 1);
        }


        createFile(folder.id,file_name,extention)
        .then(d=>{
            setFolder(prev=>({...prev,files:[...prev.files,d.data]}))
            toast.success(`The file "${file_name}.${extention}" has been created.`)
        })
    }

    const [OnClickUploadeFile,FileInput]  = useFilePicker(async (file) => {
        const content = await file.text();
        const lastDot = file.name.lastIndexOf(".");
        const name = lastDot === -1 ? file.name : file.name.slice(0, lastDot);
        const extension = lastDot === -1 ? "txt" : file.name.slice(lastDot + 1);

        uploadFile(folder.id, name, extension, content)
        .then(d=>{
            setFolder(prev=>({...prev,files:[...prev.files,d.data]}))
            toast.success(`The file "${name}.${extension}" has been uploaded.`)
        })
    });


    const OnClickRenameFolder = async ()=>{
        const n = await askForName('folder',folder.folder_name)
        if(!n.isConfirmed)return
        renameFolder(folder.id,n.value)
        .then(d=>{
            toast.success(`The folder "${folder.folder_name}" has been Renamed into "${d.data.folder_name}".`)
            setFolder(prev=>({...prev,folder_name:d.data.folder_name}))
        })
    }

    const OnClickRenameFile = async (id)=>{
        const og_name = folder.files.filter(v=>v.id==id)[0].name
        const n = await askForName('file',og_name)
        if(!n.isConfirmed)return
        const lastDot = n.value.lastIndexOf(".");

        let file_name
        let extention

        if (lastDot === -1) {
            file_name = n.value;
            extention = 'txt';
        }else{
            file_name = n.value.slice(0, lastDot);
            extention = n.value.slice(lastDot + 1);
        }
        updateFile(id,{name:file_name,extension:extention})
        .then(d=>{
            toast.success(`The file "${og_name}" has been Renamed into "${file_name}.${extention}".`)
            setFolder(prev=>({...prev,files:prev.files.map(v=>v.id==id?{...v,name:file_name,extension:extention}:v)}))
        })
    }

    const OnClickDeleteFolder = async ()=>{
        if(!await confirmButtonText())return
        deleteFolder(folder.id)
        .then(()=>{
            toast.success(`The folder "${folder.folder_name}" has been Deleted.`)
            onDelete(folder.id)
        })

    }

    const OnClickDeleteFile = async (id)=>{
        if(!await confirmButtonText())return
        const og_name = folder.files.filter(v=>v.id==id)[0].name
        deleteFile(id)
        .then(()=>{
            toast.success(`The file "${og_name}" has been Deleted.`)
            setFolder(prev=>({...prev,files:prev.files.filter(v=>v.id!=id)}))
        })
    }

    const OnClickDownloadFile = async (f)=>{
        downloadFile(f)
        toast.info(`Starting to Download the file "${f.name}".`)
    }

    const OnClickDownloadFolder = async ()=>{
        downloadFolder(folder)
        toast.info(`Starting to Download the folder "${folder.folder_name}".`)
    }

    const onForNextDelete = (id)=>{
        setFolder(prev=>({...prev,folders:prev.folders.filter(v=>v.id!=id)}))
    }

    return (
        <div className="flex flex-col text-sm">

            <div className="flex flex-row gap-1 items-center">
                <button type="button" className="hover:bg-gray-300 rounded aspect-square  " onClick={()=>setExpanded(prev=>!prev)}>
                    {
                        expanded?
                        <ChevronDown className="w-5 h-5 my-auto  " />:
                        <ChevronRight className="w-5 h-5 my-auto  " />
                    }
                </button>
                <FolderIcon size={15}/>
                <h1 className="flex-1 font-semibold font-mono">{folder.folder_name}</h1>
                <ActionDropdown
                    actions={[
                        { label: "New folder", icon: FolderPlus, onClick: OnClickCreateFolder },
                        { label: "New File", icon: FilePlus, onClick: OnClickCreateFile },
                        { label: "Upload a File", icon: UploadIcon, onClick: ()=>{OnClickUploadeFile()} },
                        { icon:null },
                        { label: "Download Folder", icon: Download, onClick: OnClickDownloadFolder },
                        { label: "Rename Folder", icon: TextCursorIcon, onClick: OnClickRenameFolder },
                        { icon:null },
                        { label: "Delete Folder", icon: Trash, onClick: OnClickDeleteFolder },
                    ]}
                />
            </div>
            <div className={`flex-col   border-gray-300 ${expanded? "flex border-l-[0.5px]" : "hidden"}`} style={{paddingLeft:`13px`}}>
                {
                    folder.folders.map(f=>(<Folder
                        level={level+1}
                        key={f.id}
                        folder={f}
                        setFolder={(updater) =>
                            setFolder(prev => ({
                                ...prev,
                                folders: prev.folders.map(child =>
                                    f.id === child.id
                                        ? (typeof updater === "function" ? updater(child) : updater)
                                        : child
                                ),
                            }))
                        }
                        onDelete={onForNextDelete}
                        openFileInTab={openFileInTab}
                    />))
                }
                {
                    folder.files.map(f=>{
                        const Icon = getFileIcon(f.extension)
                        return (
                        <div className="flex flex-row" key={f.id}>
                            <button
                                type="button"
                                className="text-sm font-mono  flex flex-row items-center gap-1 w-full cursor-pointer hover:text-indigo-700"
                                key={f.id}
                                onClick={()=>openFileInTab(f.id)}
                            >
                                <Icon size={15}/>
                                {f.name}.{f.extension}
                            </button>
                            <ActionDropdown
                                actions={[
                                    { label: "Rename File", icon: TextCursorIcon, onClick: ()=>OnClickRenameFile(f.id) },
                                    { label: "Download File", icon: Download, onClick: ()=>OnClickDownloadFile(f) },
                                    { icon:null },
                                    { label: "Delete File", icon: Trash, onClick: ()=>OnClickDeleteFile(f.id) },
                                ]}
                            />
                        </div>
                )})
                }
            </div>
            <FileInput/>
        </div>
    );
}
