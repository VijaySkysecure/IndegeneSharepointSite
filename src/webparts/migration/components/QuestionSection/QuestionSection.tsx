import * as React from 'react';
import { IQuestionSectionProps } from './IQuestionSectionProps';
import styles from './QuestionSection.module.scss';

export const QuestionSection: React.FunctionComponent<IQuestionSectionProps> = (props) => {
  return (
    <div className={styles.questionSection}>
      <div className={styles.questionContainer}>
        <div className={styles.leftPrompt}>
          <p className={styles.promptText}>Ask your question here</p>
        </div>
        <div className={styles.rightInput}>
          <input
            type="text"
            className={styles.questionInput}
            placeholder="Type your question..."
          />
        </div>
      </div>
    </div>
  );
};



