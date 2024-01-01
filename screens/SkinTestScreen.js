import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import questions from "../utils/questions";

const SkinTestScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

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
    }
  };

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
    backgroundColor: "#3498db",
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
