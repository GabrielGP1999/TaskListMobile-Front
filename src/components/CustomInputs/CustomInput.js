import { View, Text, StyleSheet } from "react-native";
import { HelperText, TextInput } from "react-native-paper";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  label,
  secureTextEntry,
  control,
  name,
  rules = {},
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <TextInput
            mode="outlined"
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error}
            value={value}
            label={label}
            secureTextEntry={secureTextEntry}
          ></TextInput>
          
          {error ? (
            <HelperText type="error" style={{backgroundColor: '#f2f2f2'}} visible={true}>
              {error.message || "Desculpe, este campo é necessário para continuar."}
            </HelperText>
          ) : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    marginVertical: 5,
  },
});

export default CustomInput;
