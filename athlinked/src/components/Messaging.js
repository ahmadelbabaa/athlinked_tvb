import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from './PageHeader';

function Messaging({ userRole }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  const location = useLocation();
  
  // Sample conversation data for players (receiving messages from clubs/agents)
  const playerConversations = [
    {
      id: 1,
      contact: {
        id: 3,
        name: "David Chen",
        role: "Agent",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      messages: [
        { id: 1, text: "Hello, I saw your profile and I'm interested in representing you. Do you have a few minutes to discuss your career goals?", sender: "other", timestamp: "2023-10-05T14:30:00" },
        { id: 2, text: "Hi David, I'd be happy to chat about working together. What times work for you this week?", sender: "user", timestamp: "2023-10-05T15:45:00" },
        { id: 3, text: "Great! How about Wednesday at 3pm? We can schedule a video call.", sender: "other", timestamp: "2023-10-05T16:20:00" }
      ],
      unread: 0,
      lastActivity: "2023-10-05T16:20:00"
    },
    {
      id: 2,
      contact: {
        id: 1,
        name: "Madrid FC",
        role: "Team",
        avatar: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      messages: [
        { id: 1, text: "We've reviewed your performance data and would like to invite you for a trial next month.", sender: "other", timestamp: "2023-10-01T10:15:00" },
        { id: 2, text: "That sounds amazing! I'd be very interested in this opportunity.", sender: "user", timestamp: "2023-10-01T11:30:00" }
      ],
      unread: 1,
      lastActivity: "2023-10-03T09:45:00"
    },
    {
      id: 3,
      contact: {
        id: 4,
        name: "Emma Wilson",
        role: "Agent",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      messages: [
        { id: 1, text: "I have an opportunity with Northern Ladies FC that might interest you. They're looking for a defender with your skill set.", sender: "other", timestamp: "2023-09-28T08:30:00" }
      ],
      unread: 1,
      lastActivity: "2023-09-28T08:30:00"
    }
  ];

  // Sample conversation data for teams (messaging players)
  const teamConversations = [
    {
      id: 1,
      contact: {
        id: 1,
        name: "Alex Johnson",
        role: "Striker",
        avatar: "https://images.unsplash.com/photo-1627461696668-d6118767e614?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      messages: [
        { id: 1, text: "We've reviewed your performance data and would like to invite you for a trial next month.", sender: "user", timestamp: "2023-10-01T10:15:00" },
        { id: 2, text: "That sounds amazing! I'd be very interested in this opportunity.", sender: "other", timestamp: "2023-10-01T11:30:00" },
        { id: 3, text: "Great! Our coaching staff will contact you with the details. Is there a specific position you're most comfortable playing?", sender: "user", timestamp: "2023-10-02T09:20:00" }
      ],
      unread: 0,
      lastActivity: "2023-10-02T09:20:00"
    },
    {
      id: 2,
      contact: {
        id: 3,
        name: "Emma Wilson",
        role: "Defender",
        avatar: "https://images.unsplash.com/photo-1530259152377-3a013c126799?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      messages: [
        { id: 1, text: "Hello Emma, we've been following your progress and are impressed with your defensive skills.", sender: "user", timestamp: "2023-09-25T14:30:00" },
        { id: 2, text: "Thank you! I'm honored that you've noticed my performance.", sender: "other", timestamp: "2023-09-25T15:10:00" },
        { id: 3, text: "Would you be interested in joining our training camp next month? We're looking to strengthen our defensive line.", sender: "user", timestamp: "2023-09-25T16:05:00" }
      ],
      unread: 1,
      lastActivity: "2023-09-25T16:05:00"
    },
    {
      id: 3,
      contact: {
        id: 2,
        name: "Carlos Rodriguez",
        role: "Midfielder",
        avatar: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
      },
      messages: [
        { id: 1, text: "Carlos, we've been impressed with your creative passing abilities. Our team is looking for a midfielder with your vision.", sender: "user", timestamp: "2023-10-07T11:20:00" }
      ],
      unread: 0,
      lastActivity: "2023-10-07T11:20:00"
    }
  ];

  // Select conversations based on user role
  const conversations = userRole === 'team' ? teamConversations : playerConversations;

  // Handle URL parameters for direct messaging
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const contactParam = query.get('contact');
    
    if (contactParam) {
      // Extract type and id from the parameter (e.g., "player-1", "agent-2", "team-3")
      const [type, id] = contactParam.split('-');
      const numericId = parseInt(id, 10);
      
      if (!isNaN(numericId)) {
        // Find the conversation that matches the contact
        let foundConversation;
        
        // For players messaging agents
        if (type === 'agent' && userRole !== 'team') {
          foundConversation = playerConversations.find(
            conv => conv.contact.id === numericId && conv.contact.role === 'Agent'
          );
        } 
        // For players messaging teams
        else if (type === 'team' && userRole !== 'team') {
          foundConversation = playerConversations.find(
            conv => conv.contact.id === numericId && conv.contact.role === 'Team'
          );
        }
        // For teams messaging players
        else if (type === 'player' && userRole === 'team') {
          foundConversation = teamConversations.find(
            conv => conv.contact.id === numericId
          );
        }
        
        // If found, select this conversation
        if (foundConversation) {
          setSelectedConversation(foundConversation);
        } else {
          console.log("No existing conversation found for", contactParam, "with ID", numericId);
          // In a real app, you would create a new conversation here
        }
      }
    }
  }, [location.search, userRole]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;
    // In a real app, this would send the message to a backend
    console.log("Sending message:", messageText, "to conversation:", selectedConversation.id);
    setMessageText('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getPageTitle = () => {
    if (userRole === 'team') {
      return "Player Messages";
    }
    return "Messages";
  };

  const getPageSubtitle = () => {
    if (userRole === 'team') {
      return "Connect directly with potential talent for your team";
    }
    return "Stay connected with teams, agents and opportunities";
  };

  return (
    <>
      <PageHeader 
        title={getPageTitle()} 
        subtitle={getPageSubtitle()}
        backgroundImage="url(https://images.unsplash.com/photo-1533750516457-a7f992034fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80)"
      />

      <div className="messaging-container" style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        display: "flex",
        backgroundColor: "#1E1E1E",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        height: "70vh"
      }}>
        {/* Conversations List */}
        <div className="conversations-list" style={{
          width: "30%",
          borderRight: "1px solid #333",
          overflowY: "auto",
          backgroundColor: "#1A1A1A"
        }}>
          <div className="conversations-header" style={{
            padding: "1.5rem",
            borderBottom: "1px solid #333",
          }}>
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Conversations</h2>
          </div>

          {conversations.map((conversation) => (
            <div 
              key={conversation.id} 
              className={`conversation-item ${selectedConversation?.id === conversation.id ? 'selected' : ''}`} 
              style={{
                padding: "1rem 1.5rem",
                borderBottom: "1px solid #333",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                backgroundColor: selectedConversation?.id === conversation.id ? "#7b2e8e20" : "transparent",
                position: "relative"
              }}
              onClick={() => setSelectedConversation(conversation)}
            >
              <div className="avatar" style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                marginRight: "1rem"
              }}>
                <img 
                  src={conversation.contact.avatar} 
                  alt={conversation.contact.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div className="conversation-info" style={{ flex: 1 }}>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center"
                }}>
                  <h3 style={{ 
                    margin: 0, 
                    fontSize: "1rem", 
                    fontWeight: conversation.unread > 0 ? "600" : "normal" 
                  }}>{conversation.contact.name}</h3>
                  <span style={{ 
                    fontSize: "0.8rem", 
                    color: "rgba(255, 255, 255, 0.5)"
                  }}>{formatDate(conversation.lastActivity)}</span>
                </div>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  marginTop: "0.25rem" 
                }}>
                  <p style={{ 
                    margin: 0, 
                    fontSize: "0.85rem",
                    color: "rgba(255, 255, 255, 0.7)",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    maxWidth: "70%"
                  }}>
                    {conversation.messages[conversation.messages.length - 1].text.length > 40 
                      ? conversation.messages[conversation.messages.length - 1].text.substring(0, 40) + "..." 
                      : conversation.messages[conversation.messages.length - 1].text}
                  </p>
                  {conversation.unread > 0 && (
                    <span style={{
                      backgroundColor: "#7b2e8e",
                      color: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: "bold"
                    }}>{conversation.unread}</span>
                  )}
                </div>
                <div style={{ 
                  fontSize: "0.8rem", 
                  color: "rgba(255, 255, 255, 0.5)", 
                  marginTop: "0.25rem"
                }}>
                  {conversation.contact.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="chat-area" style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#262626"
        }}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="chat-header" style={{
                padding: "1.5rem",
                borderBottom: "1px solid #333",
                display: "flex",
                alignItems: "center"
              }}>
                <div className="avatar" style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginRight: "1rem"
                }}>
                  <img 
                    src={selectedConversation.contact.avatar} 
                    alt={selectedConversation.contact.name} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{selectedConversation.contact.name}</h3>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.6)" }}>{selectedConversation.contact.role}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="messages-container" style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column-reverse"
              }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {selectedConversation.messages.slice().reverse().map((message) => (
                    <div 
                      key={message.id} 
                      className={`message ${message.sender === 'user' ? 'sent' : 'received'}`}
                      style={{
                        alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: message.sender === 'user' ? "#7b2e8e" : "#333",
                        borderRadius: "18px",
                        borderBottomRightRadius: message.sender === 'user' ? "4px" : "18px",
                        borderBottomLeftRadius: message.sender === 'user' ? "18px" : "4px",
                        padding: "0.75rem 1rem",
                        marginBottom: "1rem",
                        maxWidth: "70%",
                        position: "relative"
                      }}
                    >
                      <p style={{ margin: 0, fontSize: "0.95rem" }}>{message.text}</p>
                      <span style={{ 
                        fontSize: "0.7rem", 
                        marginTop: "0.3rem", 
                        color: "rgba(255, 255, 255, 0.6)",
                        display: "block",
                        textAlign: message.sender === 'user' ? "right" : "left"
                      }}>
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="message-input" style={{
                padding: "1rem 1.5rem",
                borderTop: "1px solid #333",
                display: "flex"
              }}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "0.75rem 1rem",
                    borderRadius: "24px",
                    border: "none",
                    backgroundColor: "#333",
                    color: "white",
                    fontSize: "0.95rem"
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  style={{
                    backgroundColor: "#7b2e8e",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "0.75rem",
                    cursor: "pointer"
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: "2rem",
              textAlign: "center"
            }}>
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "1.5rem", opacity: 0.5 }}>
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="rgba(255, 255, 255, 0.3)" />
              </svg>
              <h3>Select a conversation</h3>
              <p style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                {userRole === 'team' 
                  ? "Choose a player to continue your conversation" 
                  : "Choose a conversation from the list to start messaging"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Messaging; 