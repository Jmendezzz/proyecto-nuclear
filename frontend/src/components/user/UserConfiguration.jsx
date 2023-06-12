import { useEffect, useState } from "react";
import { Flex } from "../../UI/flex/Flex";
import style from "./User.module.css";
import { useAuth } from "../../context/AuthContext";
import { getUserDetails } from "../../api/UserApiService";
import { Loading } from "../../UI/loading/Loading";
import { Header } from "../../UI/headers/Header";
import {AiOutlineEdit} from "react-icons/ai";
import { ChangePasswordModal } from "./ChangePasswordModal";



export const UserConfiguration = () => {
    const { userId } = useAuth();
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [showPasswordModal, setShowPasswordModal] = useState(false);


    useEffect(() => {
        getUserDetails(userId)
            .then((res) => {
                setUser(res.data)
            })
            .then(() => setIsLoading(false))
            .catch(err => console.log(err))
    }, [])

    const showPasswordModalHandler = ()=>{
        setShowPasswordModal(true);
    }
    const closePasswordModalHandler = ()=>{
        setShowPasswordModal(false);
    }


    return (
       
        isLoading ?
            <Loading />
            :
            <Flex
                height={"100%"}
                width={"100%"}
                direction={"column"}
                alignItems={"center"}
                justifyContent={"none"}
            >
            {showPasswordModal && <ChangePasswordModal onClick={closePasswordModalHandler}/>}
                <Header>
                    <h2 style={{ fontSize: "60px" }}>CONFIGURACIÓN</h2>
                </Header>
                <Flex
                    height={"auto"}
                    width={"80%"}
                    direction={"column"}
                    className={style["main-container"]}
                    justifyContent={"center"}
                    alignItems={"none"}
                >
                    <Flex
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"none"}
                        className={style["information-container"]}

                    >
                        <h2 style={{ fontSize: "40px" }}>Información General</h2>

                        <div className={style["user-detail__item"]}>
                            <label>Nombre: </label>
                            <p>{user.name} {user.lastName}</p>
                        </div>
                        <div className={style["user-detail__item"]}>
                            <label>Identificación: </label>
                            <p>{user.nid}</p>
                        </div>
                        <div className={style["user-detail__item"]}>
                            <label>Correo electronico: </label>
                            <p>{user.email}</p>
                        </div>

                        <h2 style={{ fontSize: "40px" }}>Información De Cuenta</h2>

                        <div className={style["user-detail__item"]}>
                            <label>Usuario: </label>
                            <p>{user.username}</p>
                        </div>
                        <div className={style["user-detail__item"]}>
                            <label>Contraseña:</label>
                            <AiOutlineEdit className={style["edit__password"] }onClick={showPasswordModalHandler}/>
                        </div>

                    </Flex>

                </Flex>
            </Flex>

    );

}