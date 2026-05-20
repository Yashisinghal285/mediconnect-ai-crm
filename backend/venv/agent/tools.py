from langchain.tools import tool

@tool
def summarize_interaction(notes: str):
    return f"Summary: {notes}"

@tool
def log_interaction(data: str):
    return f"Logged: {data}"

@tool
def schedule_followup(date: str):
    return f"Follow-up on {date}"

@tool
def get_hcp_details(name: str):
    return f"Fetching details for {name}"

@tool
def edit_interaction(data: str):
    return f"Updated interaction: {data}"