
import React from "react";
import style from "./Classroom.module.css";
import { Button } from "../../UI/button/Button";
import { elements } from "../../enums/Element";
import { useState} from "react";
import {AiFillCloseCircle} from "react-icons/ai";
export const ClassroomElementsModal = (props) => {

  
/* Inicializar una variable de estado llamada `elementsAdded` con el valor de `props.elements` y un
    función llamada `setElementsAdded` para actualizar la variable de estado. Esto está usando `useState`
    gancho de React. */
    const [elementsAdded, setElementsAdded] = useState(props.elements);
    console.log(props.elements+"s");


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
