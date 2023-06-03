import { Button } from "../../UI/button/Button";
import { Flex } from "../../UI/flex/Flex";
import { Header } from "../../UI/headers/Header";
import { Input } from "../../UI/inputs/Input";
import { Pagination } from "../pagination/Pagination";

export const Professor = () => {


    return(
        <Flex>
            <Header>
                <h2>Profesores</h2>
            </Header>
            <Flex>
                <Flex>
                    <div>
                        <Button>Crear profesor</Button>
                    </div>
                    <Input></Input>
                    <Button>Buscar</Button>
                </Flex>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {}
                    </tbody>
                </table>
                <Pagination></Pagination>
            </Flex>
        </Flex>
    );
};