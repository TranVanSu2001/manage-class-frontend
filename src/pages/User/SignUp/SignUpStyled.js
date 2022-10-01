import styled from "styled-components";
import imgLogin from "@/image/bg-login.jpg";

export const SignUpWrapper = styled.button`
  height: 100vh;
  width: 100%;

  display: flex;
`;

export const SignUpImage = styled.div`
  max-width: 100%;
  height: 100%;
  flex: 1;
  background-image: url(${imgLogin});
  background-repeat: no-repeat;
  background-position: center;
`;

export const SignUpFormWrapper = styled.div`
  height: 100%;
  flex: 1;
  background-color: #ffffff;

  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 5.4rem;

  .form-signin {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100%;
  }
`;

export const SignUpHeader = styled.h1`
  margin-top: 2rem;
  font-size: 2.4rem;
`;

export const RegisterUserWrapper = styled.div`
  width: 20rem;
  margin: 0 auto;
`;

export const RegisterTextNoAccount = styled.span``;

export const RegisterDirectPath = styled.a`
  margin-left: 1rem;
`;
