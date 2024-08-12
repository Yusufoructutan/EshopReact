'use client'

import Container from "../components/container";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";

const Register = () => {
    return ( 
        <Container>
            <FormWrap>
                <RegisterForm/>
            </FormWrap> 
        </Container>
    );
}

export default Register;
