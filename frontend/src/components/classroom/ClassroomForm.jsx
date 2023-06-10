import { isEmpty } from "../../validations/InputValidations";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { location } from "../../enums/Location";
import {tipologies}from "../../enums/Tipology"
import Select from "react-select";
import { Button } from "../../UI/button/Button";
import style from "./Classroom.module.css";
import { Flex } from "../../UI/flex/Flex";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";
import { elements } from "../../enums/Element";
import { AiOutlineClose } from "react-icons/ai";
import { ClassroomElementsModal } from "./ClassroomElementsModal";

/**
 * Esta función valida un formulario comprobando si el nombre no está vacío y si la capacidad es válida
 * número.
 * @returns La función `validateForm` devuelve un objeto `errors` que contiene mensajes de error para
 * cualquier error de validación encontrado en los `valores` de entrada.
 */
const validateForm = (values) => {
    const errors = {};
    if (isEmpty(values.name)) errors.name = 'El nombre no debe estar vacío';
  
    if ((values.capability <= 0 || values.capability > 40)) errors.capability = "La capacidad debe ser válida";
  
    if (isEmpty(values.capability.toString())) errors.capability = 'La capacidad no debe estar vacío';
  
  
    return errors;
  
  }



 export const ClassroomForm=({ classroom, onSubmit })=>{
   
    const navigate = useNavigate();
    console.log( classroom && classroom.elements)
    const [elementsAdded, setElementsAdded] = useState( classroom ?  [...classroom.elements]: []) ;


    const [
      classroomLocationValue,
      classroomLocationValueChangeHandler
    ] = useState("PRINCIPAL");
  
    const [
      classroomTipologyValue,
      classroomTipologyValueChangeHandler
    ] = useState("NORMAL");
  
    const [elementsModal, setElementsModal] = useState(undefined);
  
  
    /**
    * La función `selectLocationHandler` llama a `classroomLocationValueChangeHandler` con el `valor`
    * parámetro.
    */
    const selectLocationHandler = ({ value }) => {
        classroomLocationValueChangeHandler(value);
      }
  
       /**
       * Esta función maneja la selección de un valor de tipología de aula y activa un cambio
       * manipulador.
       */
      const selectTipologyHandler = ({ value }) => {
        classroomTipologyValueChangeHandler(value)
      }

      
      /**
       * Esta función establece el estado de un modal en verdadero, lo que indica que debe mostrarse.
       */
      const showElementsModalHandler = () => {
        setElementsModal(true)
      }

      
      /**
       * Esta función establece el estado de "elementsAdded" al parámetro "elements" proporcionado.
       */
      const confirmElementsAddedHandler = (elements) => {
        setElementsAdded(elements);
      }


      
      /**
       * La función oculta los elementos modales.
       */
      const hideElementsModalHandler = () => {
        setElementsModal(undefined);
    
      }
      
    
     /* `removeElement` es una función que toma un parámetro `elementToRemove` y lo elimina del
     Matriz de estado `elementsAdded` utilizando la función `setElementsAdded`. Lo hace filtrando
     la matriz anterior de elementos (`prevElements`) y devolver una nueva matriz que excluye el
     `elementoParaEliminar`. */
      const removeElement=(elementToRemove)=>{
        setElementsAdded((prevElements) =>
        prevElements.filter((element) => element !== elementToRemove)
      );
      }

      
     /* `submitButtonHandler` es una función que toma el parámetro `values` y llama al
      función `onSubmit` con un objeto que incluye el parámetro `values`, así como el
      `classroomTipologyValue`, `classroomLocationValue` y una matriz de valores `elementsAdded`
      asignado a su propiedad `value`. Esta función se utiliza para enviar los datos del formulario al padre
      componente para su posterior procesamiento. */
      const submitButtonHandler = (values) => {   
        onSubmit(
            {
                ...values,
                tipology: classroomTipologyValue,
                location:classroomLocationValue,
                elements: elementsAdded.map((element)=>element.value)
            }
        );

    }
    /**
     * La función reformatElement toma el valor de un elemento y devuelve su nombre correspondiente de un
     * matriz de elementos.
     * @returns La función `reformatElement` toma un argumento `element` y busca un objeto
     * en la matriz `elementos` que tiene una propiedad `valor` igual a `elemento`. Si tal objeto es
     * encontrado, la función devuelve el valor de su propiedad `nombre`. Si no, una cadena vacía es
     * devuelto.
     */
    const reformatElement=(element)=>{

      const foundElement = elements.find((e) => e.value === element);
      return foundElement ? foundElement.name : "";
     }
    
    
    return(
       
          <Flex
            justifyContent={"none"}
            alignItems={"center"}
            direction={"column"}
            gap="20px"
            width={"90%"}
            className={style["create-classroom-container"]}
          >
             {elementsModal && <ClassroomElementsModal elements={elementsAdded} onConfirm={confirmElementsAddedHandler} onClick={hideElementsModalHandler} />}
            <Formik
              initialValues={
                classroom ? {
                    name: classroom.name,
                    capability:classroom.capability,
                } :
                    {
                        name: "",
                        capability: "",
                
                    }

            }
            onSubmit={submitButtonHandler}
           
            validate={validateForm}
            >
              {({ errors, touched }) => (
                <Form className={style.form}>
                  <Flex
                    direction={"column"}
                    height={"auto"}
                    alignItems={"none"}
                    justifyContent={"none"}
                    className={errors.name && touched.name ? style["form__item-error"] : style["form__item"]}
                  >
                    <label style={{ fontSize: "20px", color: errors.name && touched.name ? "red" : "black" }}>Nombre</label>
                    <Field name="name" />
                    <ErrorMessage name="name" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                  </Flex>
                  <Flex
                    direction={"column"}
                    height={"auto"}
                    alignItems={"none"}
                    justifyContent={"none"}
                    className={style["form__item"]}
                  >
  
                    <label style={{ fontSize: "20px" }}></label>
                    <Select
                      onChange={selectLocationHandler}
                      defaultValue={{ label: location[0].name, value: location[0].value }}
                      noOptionsMessage={() => "No se encontraron carreras "}
                      className={style.select}
                      options={location.map((location) => ({
                        label: location.name,
                        value: location.value,
                      }))}
                    />
  
                  </Flex>
                  <Flex
                    direction={"column"}
                    height={"auto"}
                    alignItems={"none"}
                    justifyContent={"none"}
                    className={errors.capability && touched.capability ? style["form__item-error"] : style["form__item"]}
                  >
                    <label style={{ fontSize: "20px", color: errors.capability && touched.capability ? "red" : "black" }}>Capacidad</label>
                    <Field name="capability" type="number" />
                    <ErrorMessage name="capability" style={{ fontSize: "17px", color: "red" }} component={"small"} />
                  </Flex>
                  <Flex
                    direction={"column"}
                    height={"auto"}
                    alignItems={"none"}
                    justifyContent={"none"}
                  >
                    <Flex justifyContent={"none"} gap={"10px"} >
                      <label style={{ fontSize: "20px" }}>Elementos</label>
                      <IoIosAddCircle className={style["button__add-element"]} onClick={showElementsModalHandler} />
                    </Flex>
                    {elementsAdded.length === 0 ? <p>Aún no se han agregado elementos</p>
                      :
                      elementsAdded.map((element,index) => (
                        <Flex justifyContent={"none"} height={"50px"} >
                               
                          <p className={style["element-list"]} key={index}>{element.name}</p>
                        
                         {console.log(classroom.elements)+"ss"}
                      
                          <AiOutlineClose className={style["element-list__remove"]} onClick={removeElement.bind(null,element)} />
                        </Flex>
                      ))}
                  </Flex>
                  <Flex
                    direction={"column"}
                    height={"auto"}
                    alignItems={"none"}
                    justifyContent={"none"}
                  >
                    <label style={{ fontSize: "20px" }}>Tipologia</label>
                    <Select
                      onChange={selectTipologyHandler}
                      defaultValue={{ label: tipologies[0].name, value: tipologies[0].value }}
                      noOptionsMessage={() => "No se encontraron tipologias. "}
                      className={style.select}
                      options={tipologies.map((tipology) => ({
                        label: tipology.name,
                        value: tipology.value,
                      }))}
                    />
                  </Flex>
  
                  <Flex width>
                    <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px", backgroundColor: "blue" }}>
                      Guardar
                    </Button>
                    <Button inLineStyle={{ width: "120px", height: "40px", margin: "10px" }} onClick={() => navigate("/salones")}>
                      Cancelar
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
  
          </Flex>
       
    )
}
