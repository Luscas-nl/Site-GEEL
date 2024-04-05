import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext'
import './AddPost.css'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'

const initialValue = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]
export default function AddPost(){

    const { signOff, signed, userDB } = useContext(AuthContext)
    const [editor, setEditor] = useState(null)

    useEffect(() => {
        if (signed) {
            setEditor(withReact(createEditor()))
        }
    }, [signed])   

    function saveTitle(){

    }

    if(signed && editor){
        return(
            <div className="AddPost">
                <div className="adp_inner">
                    <div className="adp_infos_inner">
                        <div>
                            <h1>Adicionar Matéria</h1>
                            <p>Escrita por <span style={{color: userDB.color, borderColor: userDB.color, backgroundColor: userDB.color + "15"}}>{"• " + userDB.firstName + ' ' + userDB.lastName ?? "Eduardo Lucas"}</span></p>
                        </div>

                        <div className="adp_button_inner">
                            <button className="adp_btn_cancel">Cancelar</button>
                            <button disabled={true} className="adp_btn_publish" style={{background: `linear-gradient(135deg, rgba(121,234,109,1) 0%, rgba(8,121,7,1) 50%, ${userDB.color + "de"} 100%)`}}>Publicar</button>
                        </div>
                    </div>

                    <input type="text" className="adp_postTitle" placeholder='Digite o título da matéria'/>

                    <div className="adp_text_inner">
                        <Slate editor={editor} initialValue={initialValue}>
                            <Editable className='adp_editor' placeholder='Escreva a matéria aqui'/>
                        </Slate>

                        <div className="adp_actions_inner">
                            <i class="fa-solid fa-bold"></i>
                            <i class="fa-solid fa-underline"></i>
                            <i class="fa-solid fa-italic"></i>
                            <i class="fa-solid fa-link"></i>
                            <i class="fa-solid fa-image"></i>
                            <i class="fa-solid fa-list-ul"></i>
                            <i class="fa-solid fa-heading"></i>
                        </div>
                    </div>
    
                    {/* <button onClick={(e) => postFileData(e)} className="adp_button">Enviar</button> */}
                </div>
            </div>
        )
    }
}