import React from "react";
import { View, Text, StyleSheet } from "react-native";
import questions from "../utils/questions";

const TestResultScreen = ({ route }) => {
  if (route.params === undefined) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Aby uzyskać wynik testu na typ skóry najpierw musisz odpowiedzieć na
          pytania.
        </Text>
      </View>
    );
  }
  const { answers } = route.params;

  const analyzeResult = (answers) => {
    let dryScore = 0;
    let oilyScore = 0;

    const drySkinQuestionId = [2, 4, 6, 8, 10];

    const oilySkinQuestionId = [1, 3, 6, 19];

    answers.forEach((answer) => {
      if (answer.answer === true) {
        if (drySkinQuestionId.includes(answer.questionId)) {
          dryScore++;
        } else if (oilySkinQuestionId.includes(answer.questionId)) {
          oilyScore++;
        }
      }
    });

    return dryScore > oilyScore
      ? "Twoja skóra może być typu suchego."
      : oilyScore > dryScore
      ? "Twoja skóra może być typu tłustego."
      : "Twoja skóra wydaje się być typu normalnego.";
  };

  const result = analyzeResult(answers);

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Wynik testu:</Text>
      <Text style={styles.recommendation}>{result}</Text>
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
  result: {
    fontSize: 22,
    fontWeight: "bold",
  },
  recommendation: {
    fontSize: 18,
    marginTop: 20,
  },

  message: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default TestResultScreen;
