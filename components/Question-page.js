import React, { useState } from 'react';
import { View, Text, Button } from 'react-native-web';
import { ButtonGroup, CheckBox } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';

const Question = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { questions, index, userAnswers } = route.params;
  const quizQuestion = questions[index];

  const [selectedIndex, setSelectedIndex] = useState(null); 
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const handleSelect = (i) => {
    setSelectedIndex(i);
  };

  const handleMultiple = (i) => {
    setSelectedIndexes((prev) =>
      prev.includes(i) ? prev.filter((idx) => idx !== i) : [...prev, i]
    );
  };

  const handleNext = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] =
      quizQuestion.type === 'multianswer' ? selectedIndexes : selectedIndex;

    if (index + 1 < questions.length) {
      navigation.navigate('Question', {
        questions,
        index: index + 1,
        userAnswers: updatedAnswers,
      });
    } else {
      navigation.navigate('Summary', {
        questions,
        userAnswers: updatedAnswers,
      });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 20 }}>
        {quizQuestion.question}
      </Text>
      {quizQuestion.type === 'multianswer' ? (
        <View>
          {quizQuestion.answers.map((choice, i) => (
            <CheckBox
              key={i}
              title={choice}
              checked={selectedIndexes.includes(i)}
              onPress={() => handleMultiple(i)}
              testID="choices"
            />
          ))}
        </View>
      ) : (
        <ButtonGroup
          onPress={handleSelect}
          selectedIndex={selectedIndex}
          buttons={quizQuestion.answers}
          vertical
          testID="choices"
          containerStyle={{marginBottom: 20 }}
        />
      )}

      <Button
        title="Next Question"
        onPress={handleNext}
        testID="next-question"
        disabled={
          (quizQuestion.type === 'multianswer' && selectedIndexes.length === 0) ||
          (quizQuestion.type !== 'multianswer' && selectedIndex === null)
        }
      />
    </View>
  );
};

export default Question;
