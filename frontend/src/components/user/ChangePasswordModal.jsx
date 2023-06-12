import { Flex } from "../../UI/flex/Flex";
import style from "./User.module.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { isEmpty } from "../../validations/InputValidations";
import { Button } from "../../UI/button/Button";
import { AiFillCloseCircle } from "react-icons/ai";
import { updatePassword } from "../../api/UserApiService";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { m } from "framer-motion";


const validatePasswordForm = (values) => {

    const errors = {};

    if (isEmpty(values.currentPassword)) errors.currentPassword = "Obligatorio *";

    if (isEmpty(values.newPassword)) errors.newPassword = "Obligatoio *";

    if (isEmpty(values.newPasswordConfirmation)) errors.newPasswordConfirmation = "Obligatorio *";

    if (values.newPassword != values.newPasswordConfirmation) errors.newPasswordConfirmation = "Las contraseñas no coinciden";

    return errors;
}




const errorResponseAlert = (error) => {
    Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
        confirmButtonColor: "red",
        confirmButtonText: "Aceptar"
    })

}
export const ChangePasswordModal = (props) => {
    
const succesResponseAlert = (response) => {
    Swal.fire({
        title: "Contraseña actualizada",
        text: response,
        icon: "success",
        confirmButtonColor: "green",
        confirmButtonText: "Aceptar",

    }).then(result=>{
        if(result.isConfirmed){
            props.onClick();
        }
    })
}

    const { userId } = useAuth();
    console.log(userId);
        const submitHandler = (values) => {
        updatePassword(userId, values.currentPassword, values.newPassword)
            .then((res) => succesResponseAlert(res.data))
            .catch(error => errorResponseAlert(error.response.data.message));
    }

    return (
        <div className={style.backdrop} >
            <div className={style.modal}>
                <header className={style.header}>
                    <h2>Cambiar Contraseña</h2>
                    <AiFillCloseCircle onClick={props.onClick} className={style["close__modal"]} />
                </header>

                <Flex direction={"column"}>

                    <Formik
                        initialValues={{
                            currentPassword: "",
                            newPassword: "",
                            newPasswordConfirmation: ""
                        }}
                        onSubmit={submitHandler}
                        validate={validatePasswordForm}
                    >
                        {({ errors, touched }) => (
                            <Form>

                                <Flex direction={"column"}>

                                    <div className={style["modal-form__item"]}>
                                        <label style={{ color: errors.currentPassword && touched.currentPassword ? "red" : "black" }}>Contraseña actual</label>
                                        <Field name="currentPassword" type="password"></Field>
                                        <ErrorMessage name="currentPassword" style={{fontSize: "17px", color: "red"}} component={"small"} />


                                    </div>
                                    <div className={style["modal-form__item"]}>
                                        <label style={{ color: errors.newPassword && touched.newPassword ? "red" : "black" }} >Contraseña Nueva</label>
                                        <Field name="newPassword" type="password"></Field>
                                        <ErrorMessage name="newPassword" style={{fontSize: "17px", color: "red"}} component={"small"} />


                                    </div>
                                    <div className={style["modal-form__item"]}>
                                        <label style={{ color: errors.newPasswordConfirmation && touched.newPasswordConfirmation ? "red" : "black" }} >Confirmar contraseña nueva</label>
                                        <Field name="newPasswordConfirmation" type="password"></Field>
                                        <ErrorMessage name="newPasswordConfirmation" style={{fontSize: "17px", color: "red"}} component={"small"} />
                                    </div>

                                </Flex>
                                <footer className={style.actions}>
                                    <Button inLineStyle={{ width: "100px" }}>
                                        Confirmar
                                    </Button>
                                </footer>
                            </Form>

                        )}

                    </Formik>



                </Flex>


            </div>
        </div>

    );
}