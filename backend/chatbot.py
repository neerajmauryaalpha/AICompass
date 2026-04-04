chat_history = {}
 
def get_response(user, msg):
    msg = msg.lower()
 
    if user not in chat_history:
        chat_history[user] = []
 
    chat_history[user].append(msg)
 
    if "ai" in msg:
        return "AI is the simulation of human intelligence in machines."
    elif "bias" in msg:
        return "AI bias happens when data leads to unfair outcomes."
    elif "ethics" in msg:
        return "AI ethics ensures fairness and transparency."
    elif "history" in msg:
        return f"Your previous messages: {chat_history[user]}"
    else:
        return "Ask me about AI, ethics, bias, or risks."
 
