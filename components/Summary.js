import React from 'react';
import { View, Text, ScrollView } from 'react-native-web';

const Summary = ({ route }) => {
  const { questions, userAnswers } = route.params;

  let score = 0;

  const isCorrect = (question, answer) => {
    if (question.type === 'multianswer') {
      const correctSorted = [...question.correct].sort();
      const userSorted = [...answer].sort();
      return (
        correctSorted.length === userSorted.length &&
        correctSorted.every((val, i) => val === userSorted[i])
      );
    } else {
      return question.correct === answer;
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text testID="total" style={{ fontSize: 24, textAlign: 'center', fontWeight: 'bold', marginBottom: 20 }}>
        Summary
      </Text>

      {questions.map((q, qIndex) => {
        const userAnswer = userAnswers[qIndex];
        const correct = q.correct;
        const gotItRight = isCorrect(q, userAnswer);

        if (gotItRight) score += 1;

        return (
          <View key={qIndex} style={{ marginBottom: 25 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
              {qIndex + 1}. {q.question}
            </Text>

            {q.answers.map((choice, i) => {
              const userSelected =
                q.type === 'multianswer'
                  ? Array.isArray(userAnswer) && userAnswer.includes(i)
                  : userAnswer === i;
              const isCorrectAnswer =
                q.type === 'multianswer'
                  ? correct.includes(i)
                  : correct === i;

              let style = {
                fontSize: 16,
                marginBottom: 4,
              };

              if (userSelected) {
                if (isCorrectAnswer) {
                  style.fontWeight = 'bold';
                  style.color = 'green'; 
                } else {
                  style.textDecorationLine = 'line-through';
                  style.color = 'red';
                }
              } else if (isCorrectAnswer) {
                style.color = 'green';
              }

              return (
                <Text key={i} style={style}>
                  - {choice}
                </Text>
              );
            })}
          </View>
        );
      })}
        <Text testID="total" style={{ fontSize: 24, textAlign: 'center', marginBottom: 40 }}>
        Total Score: {score} / {questions.length}
      </Text>
    </ScrollView>
  );
};

export default Summary;
