import * as React from 'react';
import { ICommunityPageProps } from './ICommunityPageProps';
import styles from './CommunityPage.module.scss';

export const CommunityPage: React.FunctionComponent<ICommunityPageProps> = (props) => {
  const communities = ['Community 1', 'Community 2', 'Community 3'];

  return (
    <div className={styles.communityPage}>
      <div className={styles.contentContainer}>
        <div className={styles.communitiesGrid}>
          {communities.map((community, index) => (
            <div key={index} className={styles.communityCard}>
              <p className={styles.communityText}>{community}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

