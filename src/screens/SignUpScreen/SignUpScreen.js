import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInputs/CustomInput";
import CustomButton from "../../components/Buttons/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import axiosClient from "../../../axios";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const SignUpScreen = () => {
  const { setCurrentUser, setUserToken, userToken } = useStateContext();
  const [error, setError] = useState("");

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const pwd = watch("password");

  const onSignInPressed = async (data) => {
    console.log("Dados do form", data);
    await axiosClient
      .post("/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
        passwordRepeat: data.passwordRepeat,
      })
      .then(({ data }) => {
        setCurrentUser(data?.user);
        setUserToken(data?.token);
      })
      .catch((error) => {
        console.log("Erro na req", error);
      });
  };

  const onBackPressed = () => {
    navigation.navigate("SignIn");
  };

  if (userToken) {
    console.log(userToken);
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua conta</Text>

      <CustomInput
        placeholder="Digite aqui seu E-mail"
        label="E-mail"
        name="email"
        control={control}
        rules={{
          required: true,
          pattern: {
            value: emailRegex,
            message: "Digite um e-mail válido.",
          },
        }}
      ></CustomInput>

      <CustomInput
        placeholder="Digite aqui seu Nome"
        label="Nome"
        name="name"
        control={control}
        rules={{ required: true }}
      ></CustomInput>

      <CustomInput
        placeholder="Digite aqui sua Senha"
        label="Senha"
        name="password"
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 4,
            message: "A Senha precisa ter um tamanho maior que 4 caracteres.",
          },
        }}
        secureTextEntry
      ></CustomInput>

      <CustomInput
        placeholder="Confirme sua senha"
        label="Confirme sua senha"
        name="passwordRepeat"
        control={control}
        rules={{
          required: true,
          minLength: {
            value: 4,
            message: "A Senha precisa ter um tamanho maior que 4 caracteres.",
          },
          validate: (value) =>
            value == pwd ? true : "As senhas não correspondem.",
        }}
        secureTextEntry
      ></CustomInput>

      <Text style={styles.text}>
        Esta é uma aplicação teste, não utilize dados reais.
      </Text>

      <CustomButton
        text="Cadastrar-se"
        onPress={handleSubmit(onSignInPressed)}
        type="PRIMARY"
      ></CustomButton>
      <CustomButton
        text="Voltar"
        onPress={onBackPressed}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    margin: 20,
  },
  input: {
    margintop: 15,
  },
  text: {
    color: "gray",
    width: "100%",
    marginBottom: 20,
  },
});

export default SignUpScreen;
