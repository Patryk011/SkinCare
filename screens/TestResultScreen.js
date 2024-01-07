import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import questions from "../utils/questions";
import { AuthContext } from "../contexts/AuthContext";
import { getUserData, updateUser } from "../data/api";

const TestResultScreen = ({ route, navigation }) => {
  const { user, updateUserState } = useContext(AuthContext);
  const [result, setResult] = useState("");

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

  useEffect(() => {
    saveResult();
  }, [result]);

  const saveResult = async () => {
    if (user && user.id && result) {
      const userData = await getUserData(user.id);
      if (userData) {
        await updateUser(user.id, { ...userData, skinType: result });

        updateUserState({ ...user, skinType: result });
      }
    }
  };
  useEffect(() => {
    if (route.params?.answers) {
      const calculatedResult = analyzeResult(route.params.answers);
      setResult(calculatedResult);
    }
    console.log("wynik: " + result);
  }, [route.params?.answers]);

  if (user.skinType) {
    return (
      <View style={styles.container}>
        <Text style={styles.result}>Wynik testu:</Text>
        <Text style={styles.recommendation}>{user.skinType}</Text>
      </View>
    );
  }

  if (!route.params?.answers) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Aby uzyskać wynik testu na typ skóry, najpierw musisz odpowiedzieć na
          pytania.
        </Text>
        <Button
          title="Rozpocznij Test Skóry"
          onPress={() => navigation.navigate("SkinTest")}
        />
      </View>
    );
  }

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
    marginBottom: 30,
  },
});

export default TestResultScreen;
