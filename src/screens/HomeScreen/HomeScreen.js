import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStateContext } from "../../contexts/ContextProvider";
import CustomButton from "../../components/Buttons/CustomButton";
import { StyleSheet } from "react-native";
import SmallCustomButton from "../../components/Buttons/SmallCustomButton";
import Task from "../../components/Task/Task";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axiosClient from "../../../axios";

const Home = () => {
  const { currentUser, userToken, setUserToken, setCurrentUser } =
    useStateContext();
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const navigation = useNavigation();

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  useEffect(() => {
    axiosClient
      .get("/getTasks", {
        params: {
          userID: currentUser.id,
        },
      })
      .then(({ data }) => {
        setTaskItems(JSON.parse(data.tasks));
      })
      .catch((error) => {
        console.log("Erro na req 1", error);
      });
  }, []);

  const saveTask = async () => {
    await axiosClient
      .post("/saveTask", {
        userID: currentUser.id,
        taskItems: taskItems,
      })
      .then(({ data }) => {
        ToastAndroid.show(
          "Suas tarefas foram salvas com sucesso!",
          ToastAndroid.SHORT
        );
      })
      .catch((error) => {
        console.log("Erro na req 2", error);
        ToastAndroid.show(
          "Desculpe, tivemos um problema interno. Tente novamente!",
          ToastAndroid.SHORT
        );
      });
  };

  if (!userToken) {
    navigation.navigate("SignIn");
  }

  const onSignOutPressed = () => {
    setUserToken(null);
    setCurrentUser({});
  };

  const completeTask = (index) => {
    Keyboard.dismiss();
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Tarefas Do Dia</Text>
        <SmallCustomButton
          style={styles.button}
          text="Sair"
          onPress={onSignOutPressed}
          type="SECONDARY"
        ></SmallCustomButton>
      </View>

      <View>
        {taskItems.map((item, key) => {
          return (
            <TouchableOpacity
              style={styles.items}
              onPress={() => completeTask(key)}
            >
              <Task text={item}></Task>
            </TouchableOpacity>
          );
        })}
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Escreva sua tarefa"}
          value={task}
          onChangeText={(text) => setTask(text)}
        ></TextInput>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              <Icon name="plus" size={26} color={"#000"} />
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => saveTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>
              <Icon name="content-save" size={26} color={"#000"} />
            </Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  items: {
    alignItems: "center",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#c0c0c0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#c0c0c0",
    borderWidth: 1,
  },
  addText: {},
});

export default Home;
