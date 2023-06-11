import React from "react";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Button } from "../../UI/button/Button";
import { Input } from "../../UI/inputs/Input";
import style from "./Classroom.module.css";
import { Pagination } from "../pagination/Pagination";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Form, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { elements } from "../../enums/Element";
import { getClassrooms, deleteClassroomById } from "../../api/ClassroomApiService";
import Swal from "sweetalert2";




/**
 * La función reformatElement toma el valor de un elemento y devuelve su nombre correspondiente de un
 * lista predefinida de elementos.
 * @returns La función `reformatElement` toma un argumento `element` y busca un objeto en
 * la matriz `elementos` que tiene una propiedad `valor` igual a `elemento`. Si se encuentra tal objeto, el
 * la función devuelve el valor de su propiedad `name`. Si no, se devuelve una cadena vacía.
 */
const reformatElement=(element)=>{

  const foundElement = elements.find((e) => e.value === element);
  return foundElement ? foundElement.name : "";
  }




/**
 * La función muestra un mensaje de alerta de éxito con el nombre de un salón eliminado.
 */
  const succesResponseAlert= (response)=>{
    Swal.fire(
      'Eliminado!',
      `El salón ${response.data.name} ha sido eliminada`,
      'success',
    )
  }


/**
  * La función muestra una alerta de error con un mensaje de la respuesta de error.
  */
  const errorResponseAlert = (error)=>{
    Swal.fire({
      title: "Error",
      text: error.response.data.message,
      icon: "error",
      confirmButtonColor: "red",
      confirmButtonText: "Aceptar",
    })
  
  }

export const Classroom = () => {
  
/* Estas líneas de código definen e inicializan variables de estado utilizando el gancho `useState`. */
  const [classroom, setClassroom] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [classroomsChange, setClassroomsChange] = useState(false);
  const classroomsPerPage = 5;

  const [search, setSearch] = useState("");
/**
   * La función establece los datos del aula a partir de una respuesta exitosa.
   */
  const succesResponses = (res) => {
    setClassroom(res.data);
  };

  /*`useEffect` se usa para obtener la lista de aulas de la API usando el
  función `getClassrooms` y actualice el estado de la variable `classroom` con los datos de respuesta
  utilizando la función `setClassroom`. La función `succesResponses` se llama cuando la llamada API es
  exitoso y actualiza el estado de la variable `aula`. Si hay un error, el `error`
  Se llama a la función y registra el error en la consola. La variable `classroomsChange` se usa como
  una dependencia para el gancho `useEffect`, lo que significa que el efecto se volverá a ejecutar siempre que el
  cambia el valor de `classroomsChange`. La línea `setClassroomsChange(false)` se utiliza para restablecer el
  valor de `classroomsChange` a `false` después de que se haya ejecutado el efecto. */
  useEffect(() => {
    getClassrooms()
      .then((response) => succesResponses(response))
      .catch((error) => console.error(error));
      setClassroomsChange(false);
  }, [classroomsChange]);
  const lastClassroomIndex = currentPage * classroomsPerPage;
  const firstClassroomIndex = lastClassroomIndex - classroomsPerPage;
  let currentClassroom = classroom.slice(firstClassroomIndex, lastClassroomIndex);

  const navigate = useNavigate();
  const deleteSubjectHandler = (id) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este salon?',
      text: "Estos cambios son irreversibles",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    })
      .then((result) => {
        if (result.isConfirmed) {
          deleteClassroomById(id)
            .then((response) => {
              succesResponseAlert(response);
              setClassroomsChange(true) //Indicates to the useEffect to update the subject list
            }
            )
            .catch((error) => {
              errorResponseAlert(error);              
            })
        }
      })

    }
   
  
  
    const searchHandler = (event)=>{
      setSearch(event.target.value);
    }
  
    if(search.trim() !== ""){
      currentClassroom = classroom.filter(classroom=> classroom.name.toLowerCase().includes(search))
    }

  

  return (
    <Flex
      height={"100%"}
      width={"100%"}
      direction={"column"}
      alignItems={"center"}
      justifyContent={"none"}
    >
      <Header>
        <h2 style={{ fontSize: "60px" }}>SALONES</h2>
      </Header>
      <Flex
        height={"auto"}
        width={"80%"}
        direction={"column"}
        className={style["main-container"]}
        justifyContent={"none"}
        alignItems={"center"}
      >

        <Flex height={"200px"} width={"100%"} direction={"row"} gap={"30px"}>
          <div style={{ width: "60%", margin: "10px" }}>
            <Button inLineStyle={{ width: "180px", height: "60px" }}
              onClick={() => navigate("/salones/crear")}>
              Crear salon
            </Button>
          </div>
          {<Input
            input={{ placeholder: "Nombre del salon" ,onChange:searchHandler }}
            style={{ height: "20px" }}
          ></Input> }
          
          { <Button
            inLineStyle={{ width: "120px", height: "60px", margin: "10px" }}
          >

            Buscar
          </Button> }
       
        </Flex>
        {classroom.length > 0 ?
          <>
        <table className={style.table}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Ubicacion</th>
              <th>Capacidad</th>
              <th>Elementos</th>
              <th>Tipologia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentClassroom.map((classroom) => (
              <tr key={classroom.id}>
                <td className={style.id}>{classroom.id}</td>
                <td>{classroom.name}</td>
                <td>{classroom.location}</td>
                <td>{classroom.capability}</td>
                <td style={{textAlign:"left"}}>
                  <ul>
                    {classroom.elements.map((element,index) => (
                      <li style={{fontSize:"20px"}} key={index}>{reformatElement(element)}</li>
                    ))}

                  </ul>
                </td>
                <td>{classroom.tipology}</td>

                <td className={style["actions__container"]}>
                    <BiEdit className={style["icon__edit"]} onClick={() => navigate(`/salones/editar/${classroom.id}`)} />
                    <MdDeleteForever className={style["icon__delete"]}  onClick={deleteSubjectHandler.bind(null, classroom.id)}/>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
        {classroom.length > 8 && (
          <Pagination
            totalItems={classroom.length}
            itemsPerPage={classroomsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          ></Pagination>
        )}
          </>
          :
        <p style={{ fontSize: "30px" }}>No hay salones por mostrar</p>
        }
      </Flex>
    </Flex>


  );
}