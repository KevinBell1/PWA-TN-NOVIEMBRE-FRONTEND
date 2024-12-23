import { useState } from "react"

const useForm =(InitialForm) =>{
    //logica de formulario y estados
    const [formState, setFormState] = useState(InitialForm)

    const handleChange = (event) =>{
        const field_name = event.target.name
        const field_value = event.target.value
        console.log('Probando: ',field_name, field_value)
        //esta es la funcion de mi estado que permite modificar el estado y re renderizar el componente
        //el parametro que recibe la callback es el estado previo de el estado
        setFormState((prevFormState)=>{ //el valor del estado sera el retorno de la callback
            //siempre hay que trabajar con un estado previo para coordinar las funciones y que no se ejecuten al mismo tiempo. el prevFormState toma como predeterminado el valor de formstate
            return {...prevFormState, [field_name]: field_value} //hago una copia de prevFormState, y en el lugar del campo, cambiaremos el valor del campo
        })
    }

    const handleChangeImage = (event, field_name ) =>{ //llamo a la primer imagen cargada en este input
        const file = event.target.files[0]
        const FILE_MB_LIMIT = 2
        if(file && file.size > FILE_MB_LIMIT * 1024 * 1024){ //seteamos la limitacion
            alert(`El tamaño de la imagen no puede ser mayor a ${FILE_MB_LIMIT}MB`)
        }
        
        const reader = new FileReader() //una instancia que devuelve un lector para trabajar con archivos
        //es un evento que se ejecuta cuando se termina de leer el archivo
        reader.onloadend  = () =>{
            const image_base64 = reader.result //devuelve el contenido de la imagen en base 64
            setFormState(
                (prevFormState) => {
                    return {...prevFormState, [field_name]: image_base64}
                }
            )
        }
        if(file){
            //lee el contenido del archivo y transforma a base6
            reader.readAsDataURL(file)
        }
    }
    return {
        formState,
        handleChange,
        handleChangeImage
    }
}


export default useForm