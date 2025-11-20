import * as React from 'react';
import { IBUQuestionSectionProps } from './IBUQuestionSectionProps';
import styles from './BUQuestionSection.module.scss';

export const BUQuestionSection: React.FunctionComponent<IBUQuestionSectionProps> = (props) => {
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

