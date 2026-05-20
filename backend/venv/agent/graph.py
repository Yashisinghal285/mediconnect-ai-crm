from langgraph.graph import StateGraph
from typing import TypedDict
from agent.llm import llm

class AgentState(TypedDict):
    input: str
    output: str

def ai_node(state: AgentState):

    response = llm.invoke(
        f"""
        Extract:
        - Doctor Name
        - Interaction Type
        - Summary
        - Follow Up

        from this text:

        {state['input']}
        """
    )

    return {
        "output": response.content
    }

workflow = StateGraph(AgentState)

workflow.add_node("ai_node", ai_node)

workflow.set_entry_point("ai_node")

workflow.set_finish_point("ai_node")

graph = workflow.compile()