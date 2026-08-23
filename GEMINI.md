# Strict Brainstorming & User Approval Guidelines

## 🚨 MANDATORY WORKFLOW RULES FOR AGENT

To ensure complete alignment, architectural clarity, and user control, the AI agent MUST strictly adhere to these rules in every conversation and task:

### 1. Brainstorm & Explain First (NO Immediate Coding)
- Before writing code, creating/editing files, or running execution commands, the agent **MUST ALWAYS** first explain:
  1. The underlying problem or context.
  2. The proposed technical design and architectural approach.
  3. The exact step-by-step implementation plan.

### 2. Require Explicit User Approval Before Execution
- The agent **MUST NEVER** start coding, editing files, or running modification commands automatically.
- The agent **MUST** present the plan and explicitly ask:  
  *"Would you like me to proceed with this plan?"*
- The agent MUST WAIT until the user explicitly approves before performing any code generation or terminal command execution.
