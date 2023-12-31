import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import questions from "../utils/questions";

const SkinTestScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const [endView, setEndView] = useState(false);

  useEffect(() => {
    if (user.skinType) {
      setEndView(true);
    } else {
      setEndView(false);
    }
  }, [user.skinType]);

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setEndView(false);
  };

  const handleAnswer = (answer) => {
    const nextQuestion = currentQuestionIndex + 1;
    setAnswers([
      ...answers,
      { questionId: questions[currentQuestionIndex].id, answer },
    ]);
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      navigation.navigate("TestResult", { answers });
      setEndView(true);
    }
  };

  if (endView) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Test na typ skóry został zakończony. Sprawdź wyniki w swoim profilu.
        </Text>
        <Button
          title="Wróć do profilu"
          onPress={() => navigation.navigate("Profile")}
        />
        <Button title="Resetuj Test" onPress={resetTest} color="#ff6347" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {questions[currentQuestionIndex].text}
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonYes}
          onPress={() => handleAnswer(true)}
        >
          <Text style={styles.buttonText}>Tak</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonNo}
          onPress={() => handleAnswer(false)}
        >
          <Text style={styles.buttonText}>Nie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
  },
  buttonYes: {
    backgroundColor: "#32CD32",
    padding: 10,
    borderRadius: 5,
    marginRight: 15,
    width: 100,
    alignItems: "center",
  },

  buttonNo: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginLeft: 15,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SkinTestScreen;
