import * as React from 'react';
import { IAboutPageProps } from './IAboutPageProps';
import styles from './AboutPage.module.scss';

export const AboutPage: React.FunctionComponent<IAboutPageProps> = (props) => {
  return (
    <div className={styles.aboutPage}>
      <div className={styles.contentContainer}>
        <p className={styles.contentText}>
          Indegene combines deep healthcare domain expertise with proprietary AI/ML tools to provide end-to-end commercialization services for life-sciences companies.  Its core business units are Enterprise Commercial Solutions (ECS) and Enterprise Medical Solutions (EMS). Indegene's clients include a wide range of pharmaceutical, biotech and medical-device companies worldwide and as of end-2023 serviced roughly 65 active clients. Through its integrated, technology-driven delivery model and global delivery hubs, Indegene helps these clients modernize and scale their drug-development, regulatory, medical and commercial operations with speed, compliance and efficiency.
        </p>
      </div>
    </div>
  );
};



