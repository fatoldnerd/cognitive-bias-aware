import { Pressable, Text, View } from 'react-native';

import { Challenge, challenges } from '../data/biases';
import { styles } from '../theme';

export function PracticeScreen({
  challenge,
  challengeIndex,
  selectedAnswer,
  onSelectAnswer,
  onNextChallenge,
}: {
  challenge: Challenge;
  challengeIndex: number;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  onNextChallenge: () => void;
}) {
  const hasAnswered = selectedAnswer !== null;
  const answeredCorrectly = selectedAnswer === challenge.answerIndex;

  return (
    <View style={styles.screenStack}>
      <View style={styles.sectionLabelRow}>
        <Text style={styles.kicker}>Spot the bias</Text>
        <Text style={styles.contextLabel}>
          {challengeIndex + 1} / {challenges.length}
        </Text>
      </View>

      <View style={styles.practiceCard}>
        <Text style={styles.scenarioText}>{challenge.scenario}</Text>
        <View style={styles.answerStack}>
          {challenge.options.map((option, optionIndex) => {
            const isSelected = selectedAnswer === optionIndex;
            const isCorrectAnswer = challenge.answerIndex === optionIndex;
            const showCorrect = hasAnswered && isCorrectAnswer;
            const showWrong = hasAnswered && isSelected && !isCorrectAnswer;

            return (
              <Pressable
                accessibilityRole="button"
                disabled={hasAnswered}
                key={option}
                onPress={() => onSelectAnswer(optionIndex)}
                style={({ pressed }) => [
                  styles.answerButton,
                  showCorrect ? styles.answerButtonCorrect : null,
                  showWrong ? styles.answerButtonWrong : null,
                  pressed ? styles.pressed : null,
                ]}
              >
                <Text style={styles.answerText}>{option}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {hasAnswered ? (
        <View style={styles.feedbackCard}>
          <Text style={styles.cardLabel}>
            {answeredCorrectly ? 'You spotted it' : 'Worth noticing'}
          </Text>
          <Text style={styles.feedbackText}>{challenge.explanation}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={onNextChallenge}
            style={({ pressed }) => [styles.secondaryButton, pressed ? styles.pressed : null]}
          >
            <Text style={styles.secondaryButtonText}>Next scenario</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
