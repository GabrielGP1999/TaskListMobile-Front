import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import randomLogo from "../../../assets/pictures/logorandom.png";
import CustomInput from "../../components/CustomInputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../../axios";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const SignInScreen = () => {
  const navigation = useNavigation();
  const { setCurrentUser, setUserToken, userToken } = useStateContext();
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async(data) => {
    console.log(data);
    await axiosClient
      .post("/login", {
        email: data.email,
        password: data.password
      })
      .then(({ data }) => {
        console.log(data);
        setCurrentUser(data?.user);
        setUserToken(data?.token);
      })
      .catch((error) => {
        console.log("Erro na req", error);
        setError('Email ou senha incorretos');
      });
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };

  if(userToken) {
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Image
        source={randomLogo}
        style={styles.logo}
        resizeMode="contain"
      ></Image>


    {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
    <CustomInput
        placeholder="Digite aqui seu E-mail"
        label="E-mail"
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: { 
            value: emailRegex, 
            message: "Digite um e-mail válido." 
          }
        }}
      ></CustomInput>

      <CustomInput
        placeholder="Digite aqui sua Senha"
        label="Senha"
        name="password"
        control={control}
        rules={{required: true, minLength: {
            value: 4,
            message: "A Senha precisa ter um tamanho maior que 4 caracteres."
        }}}
        secureTextEntry
      ></CustomInput>

      <CustomButton
        text="Entrar"
        onPress={handleSubmit(onSignInPressed)}
      ></CustomButton>
      <CustomButton
        text="Cadastrar-se"
        onPress={onSignUpPressed}
        type="SECONDARY"
      ></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 50,
    marginVertical: 30,
  },
  logo: {
    width: "100%",
    maxWidth: 500,
    height: 100,
    marginBottom: "20%",
  },
  input: {
    margintop: 15,
  },
});

export default SignInScreen;
