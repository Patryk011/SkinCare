import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
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
  }, [route.params?.answers]);

  if (user.skinType) {
    let recommendationsTitle = "";
    let recommendationsList = [];
    let additionalInfo = "";

    switch (user.skinType) {
      case "Twoja skóra może być typu suchego.":
        recommendationsTitle = "Nasze zalecenia:";
        recommendationsList = [
          "Delikatne oczyszczanie.",
          "Nawilżanie.",
          "Unikaj drażniących składników.",
          "Regularne peelingi.",
        ];
        additionalInfo =
          "Chcesz dowiedzieć się z jakich produktów korzystać odwiedź nasz sklep i śledź zmiany w notatniku.";
        break;

      case "Twoja skóra może być typu tłustego.":
        recommendationsTitle = "Nasze zalecenia:";
        recommendationsList = [
          "Regularne oczyszczanie.",
          "Matujące kremy.",
          "Maseczki oczyszczające.",
        ];
        additionalInfo =
          "Chcesz dowiedzieć się z jakich produktów korzystać odwiedź nasz sklep i śledź zmiany w notatniku.";
        break;

      case "Twoja skóra wydaje się być typu normalnego.":
        recommendationsTitle = "Nasze zalecenia:";
        recommendationsList = [
          "Delikatne oczyszczanie.",
          "Utrzymywanie nawilżenia.",
          "Ochrona przeciwsłoneczna.",
          "Zrównoważona dieta i picie wody.",
        ];
        additionalInfo =
          "Chcesz dowiedzieć się z jakich produktów korzystać odwiedź nasz sklep i śledź zmiany w notatniku.";
        break;

      default:
        break;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.result}>Wynik testu:</Text>
        <Text style={styles.recommendation}>{user.skinType}</Text>
        <Text style={styles.recommendationTitle}>{recommendationsTitle}</Text>
        <View>
          {recommendationsList.map((recommendation, index) => (
            <Text key={index} style={styles.recommendationItem}>
              • {recommendation}
            </Text>
          ))}
        </View>
        <Text style={styles.additionalInfo}>{additionalInfo}</Text>
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate("Shop")}
        >
          <Text style={styles.shopButtonText}>Sklep</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.backHome}>Powrót do ekranu głównego</Text>
        </TouchableOpacity>
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SkinTest")}
        >
          <Text style={styles.buttonText}>Rozpocznij Test Skóry</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  result: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  backHome: {
    flexDirection: "row",
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2edaff",
    padding: 15,
    borderRadius: 10,
  },
  message: {
    fontWeight: "bold",
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  recommendation: {
    fontSize: 18,
    marginBottom: 20,
  },
  recommendationTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recommendationItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  additionalInfo: {
    fontSize: 14,
    marginTop: 20,
    fontStyle: "italic",
  },
  shopButton: {
    marginTop: 20,
    backgroundColor: "#ff69b4", // Różowy kolor
    padding: 15,
    borderRadius: 10,
  },
  shopButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default TestResultScreen;
