import * as React from 'react';
import styles from './BUQuestionSection.module.scss';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
const chatbotIcon: string = require('../../assets/chatbot-icon.png');
interface IBUQuestionSectionProps {} 

interface ChatMessage { role: 'user' | 'assistant' | 'system'; content: string }

const YOUR_API_KEY = "2Hcf7EkLSg88ySVEjrapikrQjIFA4F4BGgshU8Gwci15RkklqgGDJQQJ99BIACYeBjFXJ3w3AAABACOGHLjU";
const AZURE_BASE_URL = "https://engineeringteamopenai.openai.azure.com";
const API_VERSION = "2024-05-01-preview";
const DEPLOYMENT_NAME = "gpt-4o";

const PDF_CONTEXT = `CONTEXT FROM INDEGENE PDF: [cites omitted] CONTEXT FROM SKYSECURE PDF: [cites omitted]`;
const SYSTEM_PROMPT = `You are a helpful assistant. Only use the following context to answer the user's questions.\nCONTEXT:\n---\n${PDF_CONTEXT}\n---`;

const handleInternalQueries = (query: string): string | null => {
  const lower = query.toLowerCase().trim();
  const now = new Date();
  if (lower.includes("what is the time")) return `The current time is ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
  if (lower.includes("current date") || lower.includes("today")) return `Today's date is ${now.toLocaleDateString()}.`;
  if (lower.includes("what is the day")) return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long' })}.`;
  return null;
};

const fetchChatbotResponse = async (history: { sender: string; text: string }[]): Promise<string> => {
  const messages: ChatMessage[] = [{ role: "system", content: SYSTEM_PROMPT }];
  history.forEach(m => messages.push({ role: m.sender === "user" ? "user" : "assistant", content: m.text }));

  const endpoint = `${AZURE_BASE_URL}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=${API_VERSION}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": YOUR_API_KEY },
    body: JSON.stringify({ messages, temperature: 0.1 })
  });

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "No response";
};

export const QuestionSection: React.FC<IBUQuestionSectionProps> = () => {
  const [isChatVisible, setChatVisible] = React.useState(false);
  const [messages, setMessages] = React.useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // NEW: Search Filter State
  const [searchText, setSearchText] = React.useState("");
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleChat = () => setChatVisible(!isChatVisible);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { sender: "user", text: input.trim() };
    const newHistory = [...messages, userMsg];

    setMessages(newHistory);
    setInput("");
    setIsLoading(true);

    const internalReply = handleInternalQueries(userMsg.text);

    let reply = internalReply ?? await fetchChatbotResponse(newHistory);

    setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    setIsLoading(false);
  };

  return (
<<<<<<< HEAD
    <div className={styles.questionSection} ref={containerRef}>

      {/* -------------------------------- SEARCH + ASK INPUT -------------------------------- */}
      <div className={styles.questionContainer}>
        
        <div className={styles.leftPrompt}>
          <p className={styles.promptText}>Ask your question or search</p>
        </div>

        <div className={styles.rightInput}>

          {/* SEARCH BAR */}
          <input
            type="text"
            className={styles.questionInput}
            placeholder="Search filters or ask a question..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setIsFilterOpen(true);
            }}
            onClick={() => setIsFilterOpen(true)}
          />

          {/* Chatbot Icon */}
          <img
            src={chatbotIcon}
            alt="Chatbot Icon"
            className={styles.chatbotIcon}
            onClick={toggleChat}
          />
        </div>
      </div>

      {/* FILTER DROPDOWN */}
      {isFilterOpen && (
        <div className={styles.dropdownPanel}>
          <FilterDropdown searchText={searchText} />
        </div>
      )}

      {/* -------------------------------- CHAT WINDOW -------------------------------- */}
      {isChatVisible && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <span>Chat Assistant</span>
            <button className={styles.closeButton} onClick={toggleChat}>
              ×
            </button>
          </div>

          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.sender === "user" ? styles.userMsg : styles.botMsg}
              >
                {msg.text}
              </div>
            ))}

            {isLoading && <div className={styles.botMsg}>...Thinking...</div>}
          </div>

          <div className={styles.inputRow}>
            <input
              className={styles.chatInput}
              value={input}
              placeholder="Ask something..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isLoading}
            />
            <button
              className={styles.sendButton}
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
            >
              Send
            </button>
          </div>
        </div>
      )}
=======
    <div className={styles.questionSection}>
>>>>>>> origin/vamshik
    </div>
  );
};
