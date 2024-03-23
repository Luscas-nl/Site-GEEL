import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/firestoreData/firestoreDataContext";
import "./AddStatute.css"

export default function AddStatute(){

    const { uploadFileData } = useContext(DataContext)
    const [selectedFile, setSelectedFile] = useState(null)
    const [fileName, setFileName] = useState("")
    const [fileType, setFileType] = useState(null)

    useEffect(() => {
        const button = document.querySelector(".ast_button")
        if(selectedFile && fileName && fileType){
            button.disabled = false
        } else {
            button.disabled = true
        }
    }, [selectedFile, fileName, fileType])

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        setSelectedFile(file)

        if (file) {
            const fileNameParts = file.name.split(".");
            const extension = fileNameParts[fileNameParts.length - 1].toLowerCase();
            
            if(extension === "pdf"){
                console.log("pdf");
                setFileType("pdf");
            } else if (extension === "docx"){
                console.log("word");
                setFileType("word")
            }
        }
    };

    const postFileData = (e) => {
        e.preventDefault()
        uploadFileData(selectedFile, fileName, fileType, "statutes")
    }

    return(
        <div className="AddStatute">
            <div className="ast_inner">
                <div className="ast_titleInner">
                    <div className="ast_title">
                        <h1>Enviar Edital</h1>
                        <p>upload de editais para o site</p>
                    </div>

                    <button onClick={(e) => postFileData(e)} className="ast_button">Enviar</button>
                </div>

                <div className="ast_uploadIner">
                    <div className="ast_input_inner">
                        <p>Nome do arquivo</p>
                        <input value={fileName} placeholder="Digite o nome de exibição do arquivo" onChange={(e) => setFileName(e.target.value)} className="ast_name" type="text" />
                    </div>

                    <div className="ast_file_inner">
                        <label htmlFor="ast_file" className="ast_img_input">{selectedFile ? selectedFile.name : "Selecione um arquivo"}</label>
                        <input required onChange={(e) => handleFileChange(e, setSelectedFile)} id="ast_file" type="file" />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}