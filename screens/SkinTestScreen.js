import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
      navigation.navigate("TestResultScreen", { answers });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>
        {questions[currentQuestionIndex].text}
      </Text>
      <Button title="Tak" onPress={() => handleAnswer(true)} />
      <Button title="Nie" onPress={() => handleAnswer(false)} />
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
});

export default SkinTestScreen;
