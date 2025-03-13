document.addEventListener('DOMContentLoaded', function() {
    const messageContainer = document.getElementById('message-container');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const resetButton = document.getElementById('reset-button');
    
    let conversationId = null;
    
    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message ai-message';
        messageDiv.innerHTML = isUser ? content : DOMPurify.sanitize(marked.parse(content));
        
        // Add copy buttons to code blocks
        const codeBlocks = messageDiv.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            const pre = block.parentNode;
            pre.classList.add('code-block');
            
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.textContent = 'Copy';
            copyButton.addEventListener('click', function() {
                navigator.clipboard.writeText(block.textContent);
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            });
            
            pre.appendChild(copyButton);
        });
        
        messageContainer.appendChild(messageDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    
    // Function to add thinking animation
    function addThinking() {
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message ai-message thinking';
        thinkingDiv.id = 'thinking';
        thinkingDiv.textContent = 'Thinking';
        
        const dots = document.createElement('span');
        dots.id = 'thinking-dots';
        dots.textContent = '...';
        thinkingDiv.appendChild(dots);
        
        messageContainer.appendChild(thinkingDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
        
        // Animate the dots
        let count = 0;
        const thinkingInterval = setInterval(() => {
            const dotsSpan = document.getElementById('thinking-dots');
            if (dotsSpan) {
                count = (count + 1) % 4;
                dotsSpan.textContent = '.'.repeat(count + 1);
            } else {
                clearInterval(thinkingInterval);
            }
        }, 500);
        
        return thinkingInterval;
    }
    
    // Function to remove thinking animation
    function removeThinking(interval) {
        clearInterval(interval);
        const thinkingDiv = document.getElementById('thinking');
        if (thinkingDiv) {
            thinkingDiv.remove();
        }
    }
    
    // Function to add AI thoughts
    function addThoughts(thoughts, messageDiv) {
        if (!thoughts || thoughts.trim() === '') return;
        
        const thoughtsToggle = document.createElement('div');
        thoughtsToggle.className = 'thoughts-toggle';
        thoughtsToggle.textContent = 'Show AI thoughts';
        
        const thoughtsContainer = document.createElement('div');
        thoughtsContainer.className = 'thoughts-container';
        thoughtsContainer.innerHTML = DOMPurify.sanitize(marked.parse(thoughts));
        
        thoughtsToggle.addEventListener('click', function() {
            if (thoughtsContainer.style.display === 'block') {
                thoughtsContainer.style.display = 'none';
                thoughtsToggle.textContent = 'Show AI thoughts';
            } else {
                thoughtsContainer.style.display = 'block';
                thoughtsToggle.textContent = 'Hide AI thoughts';
            }
        });
        
        messageDiv.appendChild(thoughtsToggle);
        messageDiv.appendChild(thoughtsContainer);
    }
    
    // Function to send a message to the AI
    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, true);
        userInput.value = '';
        
        // Add thinking animation
        const thinkingInterval = addThinking();
        
        try {
            // Send message to backend
            const response = await fetch('https://venice-backend-14aff752beac.herokuapp.com/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    conversation_id: conversationId,
                }),
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }
            
            // Get the conversation ID from the response
            const data = await response.json();
            conversationId = data.conversation_id;
            
            // Remove thinking animation
            removeThinking(thinkingInterval);
            
            // Add AI response to chat
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'message ai-message';
            messageContainer.appendChild(aiMessageDiv);
            
            // Add thoughts if available
            if (data.thoughts) {
                addThoughts(data.thoughts, aiMessageDiv);
            }
            
            // Parse and display the AI response with markdown
            aiMessageDiv.innerHTML += DOMPurify.sanitize(marked.parse(data.response));
            
            // Add copy buttons to code blocks
            const codeBlocks = aiMessageDiv.querySelectorAll('pre code');
            codeBlocks.forEach(block => {
                const pre = block.parentNode;
                pre.classList.add('code-block');
                
                const copyButton = document.createElement('button');
                copyButton.className = 'copy-button';
                copyButton.textContent = 'Copy';
                copyButton.addEventListener('click', function() {
                    navigator.clipboard.writeText(block.textContent);
                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                });
                
                pre.appendChild(copyButton);
            });
            
            messageContainer.scrollTop = messageContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
            removeThinking(thinkingInterval);
            addMessage('Sorry, there was an error processing your request. Please try again later.');
        }
    }
    
    // Function to reset the conversation
    async function resetConversation() {
        try {
            // Send reset request to backend
            const response = await fetch('https://venice-backend-14aff752beac.herokuapp.com/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error('Failed to reset conversation');
            }
            
            // Clear the conversation ID and message container
            conversationId = null;
            messageContainer.innerHTML = '';
            
            // Add a system message
            addMessage('Conversation has been reset. You can start a new chat now.');
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, there was an error resetting the conversation. Please try again later.');
        }
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
    
    resetButton.addEventListener('click', resetConversation);
    
    // Initialize with a welcome message
    addMessage('Welcome to the Portland Hacker Foundation chat! How can I help you today?');
});
