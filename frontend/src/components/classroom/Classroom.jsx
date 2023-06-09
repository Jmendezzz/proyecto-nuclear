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
import { tipologies } from "../../enums/Tipology";
import { getClassrooms, deleteClassroomById } from "../../api/ClassroomApiService";
import Swal from "sweetalert2";





/**
 * La función reformatElement toma el valor de un elemento y devuelve su nombre correspondiente de un
 * lista predefinida de elementos.
 * @returns La función `reformatElement` toma un argumento `element` y busca un objeto en un
 * matriz llamada `elementos` que tiene una propiedad `valor` igual al argumento `elemento`. Si tal
 * se encuentra el objeto, la función devuelve el valor de su propiedad `nombre`. De lo contrario, una cadena vacía
 * es regresado.
 */
const reformatElement=(element)=>{

  const foundElement = elements.find((e) => e.value === element);
  return foundElement ? foundElement.name : "";
 }


/**
  * La función reformatTipology toma un valor de tipología y devuelve su nombre correspondiente de un
  * lista predefinida de tipologías.
  * @returns La función `reformatTipology` toma un parámetro `tipología` y devuelve el correspondiente
  * Propiedad `nombre` de la matriz `tipologías` si se encuentra una propiedad `valor` coincidente. Si no hay coincidencia
  * encontrado, se devuelve una cadena vacía.
  */
 const reformatTipology=(tipology)=>{

  const foundTipology = tipologies.find((e) => e.value === tipology);
  return foundTipology ? foundTipology.name : "";
  }
  


/**
 * El código anterior define dos funciones para mostrar alertas de éxito y error utilizando la biblioteca Swal
 * en JavaScript Reaccionar.
 */
  const succesResponseAlert= (response)=>{
    Swal.fire(
      'Eliminado!',
      `El salón ${response.data.name} ha sido eliminada`,
      'success',
    )
  }
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

/* El código define tres variables de estado usando el gancho `useState`: `classroom`, `currentPage`,
 y `aulasCambio`. */
  const [classroom, setClassroom] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [classroomsChange, setClassroomsChange] = useState(false);
  const classroomsPerPage = 5;
  const succesResponses = (res) => {
    setClassroom(res.data);
  };
  useEffect(() => {
    getClassrooms()
      .then((response) => succesResponses(response))
      .catch((error) => console.error(error));
      setClassroomsChange(false);
  }, [classroomsChange]);


  //-------------------------------------------------------------------------

  const lastClassroomIndex = currentPage * classroomsPerPage;
  const firstClassroomIndex = lastClassroomIndex - classroomsPerPage;
  let currentClassroom = classroom.slice(firstClassroomIndex, lastClassroomIndex);

/* El código define una función llamada `deleteClassroomHandler` que toma un parámetro `id`. Este
La función se usa para manejar la eliminación de un salón de clases llamando a la función `deleteClassroomById`
del módulo `ClassroomApiService`. Antes de eliminar el aula, aparece un cuadro de diálogo de confirmación.
se muestra usando la función `Swal.fire` de la biblioteca SweetAlert2. Si el usuario confirma la
eliminación, se llama a la función `deleteClassroomById` y si la eliminación es exitosa, un éxito
La alerta se muestra usando la función `succesResponseAlert`. Si hay un error durante la
eliminación, se muestra una alerta de error utilizando la función `errorResponseAlert`. Finalmente, el
Se llama a la función `setClassroomsChange` para actualizar el estado de la variable `classroomsChange`,
que desencadena una nueva representación del componente. */
  const navigate = useNavigate();
  const deleteClassroomHandler = (id) => {
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
              setClassroomsChange(true)
            }
            )
            .catch((error) => {
              errorResponseAlert(error);              
            })
        }
      })

    }
    //-------------------------------------------------------------------------
   

/* Este código define una funcionalidad de búsqueda para el componente Classroom. Crea una variable de estado.
  `buscar` y una función `searchHandler` que actualiza el estado de `búsqueda` con el valor del
  campo de entrada. Luego, comprueba si la variable `buscar` no es una cadena vacía y filtra la
  matriz `currentClassroom` basada en si la propiedad `name` de cada aula incluye el
  Cadena de `búsqueda` (no distingue entre mayúsculas y minúsculas). Esto permite al usuario buscar un aula específica por
  nombre. */
    const [search, setSearch] = useState("");
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
            input={{ placeholder: "Nombre de la persona" ,onChange:searchHandler}}
            style={{ height: "20px" }}
          ></Input> }
          
          { <Button
            inLineStyle={{ width: "120px", height: "60px", margin: "10px" }}
          >

            Buscar
          </Button> }
       
        </Flex>
        {currentClassroom.length > 0 ?
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
                <td style={{textAlign:"left"}}>
                  <ul>
                 
                  <li>{reformatTipology(classroom.tipology)}</li>
               
                  </ul> 
                </td>

                <td className={style["actions__container"]}>
                    <BiEdit className={style["icon__edit"]} onClick={() => navigate(`/salones/editar/${classroom.id}`)} />
                    <MdDeleteForever className={style["icon__delete"]}  onClick={deleteClassroomHandler.bind(null, classroom.id)}/>
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