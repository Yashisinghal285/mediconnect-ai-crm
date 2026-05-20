from graph import graph

response = graph.invoke({
    "input": """
    Met Dr Sharma today.
    Discussed diabetes medicine.
    Follow-up next week.
    """
})

print(response)