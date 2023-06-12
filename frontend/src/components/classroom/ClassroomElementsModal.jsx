import React from "react";
import style from "./Classroom.module.css";
import { Button } from "../../UI/button/Button";
import { elements } from "../../enums/Element";
import { useState} from "react";
import {AiFillCloseCircle} from "react-icons/ai";
export const ClassroomElementsModal = (props) => {

    
/* Usando el gancho `useState` para inicializar una variable de estado llamada `elementsAdded` con el valor
    de `props.elements`. También crea una función llamada `setElementsAdded` que se puede usar para
    actualizar el valor de `elementsAdded`. */
    const [elementsAdded, setElementsAdded] = useState(props.elements);

 
/**
   * La función agrega o elimina un elemento de una matriz en función de si ya existe en el
   * matriz.
   */
    const addElement = (newElement)=>{
        if (elementsAdded.includes(newElement)) {
            removeElement(newElement);
          } else {
            setElementsAdded((prevElements) => [...prevElements, newElement]);
          }
    }
  
/**
    * Esta función elimina un elemento específico de una matriz de elementos.
    */
    const removeElement = (elementToRemove) => {
        setElementsAdded((prevElements) =>
          prevElements.filter((element) => element !== elementToRemove)
        );
      };

   
/**
      * La función `confirmHandler` llama a la función `onConfirm` con el parámetro `elementsAdded`
      * y luego llama a la función `onClick`.
      */
      const confirmHandler=()=>{
        props.onConfirm(elementsAdded)
        props.onClick();
      }

    return (
        <div className={style.backdrop} >
        <div className={style.modal}>
          <header className={style.header}>
            <h2>Agregue elementos</h2>
            <AiFillCloseCircle onClick={props.onClick} className={style["close__modal"]}/> 

          </header>
          <p>Puede seleccionar uno o mas elementos.</p>

          <div className={style["elements-container"]}>
            {elements.map((element, index) => {
              const isSelected = elementsAdded.includes(element);
              const elementClassName = isSelected
                ? `${style["element-item"]} ${style.selected}`
                : style["element-item"];
              return (
                <div
                  key={index}
                  className={elementClassName}
                  onClick={() => addElement(element)}
                >
                  {element.name}
                </div>
              );
            })}
          </div>
          <footer className={style.actions}>
            <Button onClick={confirmHandler} inLineStyle={{ width: "100px" }}>
                Confirmar 
            </Button>
          </footer>
        </div>
      </div>

    );
}