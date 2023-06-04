
import style from "./Loading.module.css";

export const Loading = () => {
    return (
        <div class={style["lds-ring"]}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );

}
