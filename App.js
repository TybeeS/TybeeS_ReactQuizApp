import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Question from './components/Question-page';
import questions from './components/data/Questions';
import Summary from './components/Summary';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        {/*Start Screen*/}
        <Stack.Screen
          name="Question"
          component={Question}
          initialParams={{
            questions: questions, 
            index: 0,            
            userAnswers: Array(questions.length).fill(null), 
          }}
        />

        {/* Summary screen after the last question */}
        <Stack.Screen
          name="Summary"
          component={Summary}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
