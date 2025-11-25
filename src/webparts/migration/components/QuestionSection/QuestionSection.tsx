import * as React from 'react';
import { IQuestionSectionProps } from './IQuestionSectionProps';
import styles from './QuestionSection.module.scss';

const chatbotIcon: string = require('../../assets/chatbot-icon.png');

interface ChatMessage { sender: 'user' | 'bot'; text: string }

// Context mapped by keywords for smarter responses
const CONTEXT_MAP: Record<string, string[]> = {
  "indegene": [
    "Indegene is a digital-first life sciences commercialization company helping pharma, biotech, and medical device organizations launch, market, and optimize therapies.",
    "Provides medical affairs, regulatory compliance, multi-channel engagement, data-driven insights, and technology platforms.",
    "Indegene serves biopharmaceutical companies, emerging biotech firms, and medical device organizations globally.",
    "Key differentiators: 25+ years domain expertise, omnichannel engagement, proven ROI, operational resilience."
  ],
  "skysecure": [
    "Skysecure: 5+ years committed to enhancing digital security & resilience for clients worldwide.",
    "Focuses on building a strong digital ecosystem and offering specialized security solutions.",
    "Founded by former Microsoft technologists and supported by skilled certified professionals.",
    "Adapts solutions for multiple industries with unique digital threat considerations."
  ]
};

const handleInternalQueries = (query: string): string | null => {
  const lower = query.toLowerCase().trim();
  const now = new Date();
  if (lower.includes("what is the time") || lower.includes("current time")) {
    return `The current time is ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
  }
  if (lower.includes("what is the date") || lower.includes("today's date")) {
    return `Today's date is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
  }
  if (lower.includes("what is the day") || lower.includes("today's day")) {
    return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long' })}.`;
  }
  return null;
};

const getAnswerFromContext = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  for (const key in CONTEXT_MAP) {
    if (lowerQuery.includes(key)) {
      // Attempt to find subtopic match
      const matchedSections = CONTEXT_MAP[key].filter(section =>
        section.toLowerCase().includes(lowerQuery.split(key)[1]?.trim() || "")
      );
      if (matchedSections.length > 0) return matchedSections.join(" ");
      // Otherwise return all info for the keyword
      return CONTEXT_MAP[key].join(" ");
    }
  }
  return "I checked the content, but your question doesn't match anything relevant from Skysecure or Indegene.";
};

export const QuestionSection: React.FC<IQuestionSectionProps> = () => {
  const [isChatVisible, setChatVisible] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleChat = () => setChatVisible(!isChatVisible);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      try {
        const internalReply = handleInternalQueries(userMessage.text);
        const reply = internalReply || getAnswerFromContext(userMessage.text);
        const botMessage: ChatMessage = { sender: 'bot', text: reply };
        setMessages(prev => [...prev, botMessage]);
      } catch (err) {
        const botMessage: ChatMessage = { sender: 'bot', text: '⚠️ Something went wrong.' };
        setMessages(prev => [...prev, botMessage]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className={styles.questionSection}>
      <div className={styles.questionContainer}>
        <div className={styles.leftPrompt}><p className={styles.promptText}>Ask your question here</p></div>
        <div className={styles.rightInput}>
          <input type="text" className={styles.questionInput} placeholder="Type your question..." readOnly />
          <img src={chatbotIcon} alt="Chatbot" className={styles.chatbotIcon} onClick={toggleChat} />
        </div>
      </div>

      {isChatVisible && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <span>Chat Assistant</span>
            <button className={styles.closeButton} onClick={toggleChat}>&times;</button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.messageContainer} ${msg.sender === 'user' ? styles.messageContainerUser : styles.messageContainerBot}`}>
                {msg.sender === 'bot' && <img src={chatbotIcon} alt="Bot" className={styles.messageAvatar} />}
                <div className={msg.sender === 'user' ? styles.userMsg : styles.botMsg}>{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.messageContainer} ${styles.messageContainerBot}`}>
                <img src={chatbotIcon} alt="Bot" className={styles.messageAvatar} />
                <div className={`${styles.botMsg} ${styles.thinking}`}>...Thinking...</div>
              </div>
            )}
          </div>

          <div className={styles.inputRow}>
            <input className={styles.chatInput} placeholder="Ask something..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyPress} disabled={isLoading} />
            <button className={styles.sendButton} onClick={handleSend} disabled={isLoading || !input.trim()}>
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
