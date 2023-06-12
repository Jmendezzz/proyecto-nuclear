import React from "react";
import { Flex } from "../../UI/flex/Flex";
import style from "./Login.module.css";
import logo from '../../assets/images/logo-cue-avh.png';
import { Field, Form, Formik } from "formik";
import { isEmpty } from "../../validations/InputValidations";
import { useAuth } from "../../context/AuthContext";

const formValidation = (values) => {
    const errors = {};

    if (isEmpty(values.username)) errors.username = 'El usuario no debe estar vacío';

    if (isEmpty(values.password)) errors.password = 'La contraseña no debe estar vacía'

    return errors;

}
export const Login = () => {
    const {loginHandler} = useAuth();

    const loginButtonHandler = (values) => {

        loginHandler(values.username, values.password)
        
    }

    return (
        <Flex className={style.div} direction={"column"} width={"100%"} height={"100%"}>

            <Flex className={style["login-div"]} width={"70%"} height={"80vh"}>

                <Flex direction={"column"} justifyContent={"space-between"} width={"84%"} height={"100%"}>
                    <img className={style.logo} src={logo}></img>
                    <Flex height="70%" alignItems={"none"} className={style["login-div__header"]}>
                        <h2>INICIAR SESIÓN</h2>
                    </Flex>
                </Flex>

                <Flex width={"50%"} direction={"column"} height={"50%"} className={style["login-div__inputs"]}>
                    <Formik
                        initialValues={{
                            username: "",
                            password: ""
                        }}
                        onSubmit={loginButtonHandler}
                        validate={formValidation}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <Flex width={"500px"} direction={"column"} height={"50%"} className={style["login-div__inputs"]}>
                                    <Field
                                        name="username"
                                        placeholder="Ingresa tu usuario"
                                        className={ errors.username && touched.username ? style["input-error"] :  style.input  }
                                    />
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Ingresa tu contraseña"
                                        className={ errors.password && touched.password ? style["input-error"] :  style.input }
                                    />
                                    <button type="submit" className={style["login-div__button"]}>INGRESAR</button>

                                </Flex>


                            </Form>
                        )}
                    </Formik>

                </Flex>

            </Flex>

            <footer className={style.footer}>
                <div className={style["footer__item-1"]}>
                    <h3>
                        ACERCA DE NOSOTROS
                    </h3>
                    <p>Institución Universitaria | SNIES 2840 | Personería Jurídica Resolución 439 del 14 de marzo de 2001 otorgada por el Ministerio de Educación Nacional Sede principal: Avenida Bolívar # 1-189, Armenia - Quindío PBX: (606)7450025</p>
                </div>
                <div className={style["footer__item-2"]}>
                    <h3>
                        CONTACTE CON NOSOTROS
                    </h3>
                    <ul>
                        <li>
                            Principal Avenida Bolívar # 1-189 PBX: (606) 7450025 Alcázar Calle 4 Norte # 13- 05 PBX: (606) 7451544 Anova Carrera 13 N° 15 Norte- 46 Ed. Anova PBX: (606) 7312521 Nogal Carrera 13 #16N-07 Casa Anova Calle 16N #13-09 Casa Campiña Calle 15 A Norte #11-80 PBX: (606) 7312284
                        </li>
                        <li>
                            Teléfono: PBX: (606) 7450025

                        </li>
                        <li>
                            Email: recepcion@cue.edu.co

                        </li>
                    </ul>
                </div>

            </footer>

        </Flex>
    );


}