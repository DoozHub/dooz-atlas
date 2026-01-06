# Redmine Integration

## Purpose

Connect AI-assisted development to Redmine issue tracking.

---

## Integration Points

### Issue Context
Fetch issue details for AI context:
```typescript
async function getIssueContext(issueId: string) {
  const issue = await redmine.getIssue(issueId);
  return {
    title: issue.subject,
    description: issue.description,
    tracker: issue.tracker.name,
    status: issue.status.name,
    priority: issue.priority.name,
    assignee: issue.assigned_to?.name,
    relatedIssues: await getRelatedIssues(issueId),
  };
}
```

### Work Logging
Log AI time to issues:
```typescript
async function logAITime(issueId: string, session: AgentSession) {
  await redmine.createTimeEntry({
    issue_id: issueId,
    hours: session.duration / 3600,
    activity_id: AI_ACTIVITY_ID,
    comments: `AI-assisted: ${session.operationCount} operations, $${session.cost}`,
  });
}
```

### Status Updates
Auto-update issue status on milestones:
```typescript
async function updateIssueProgress(issueId: string, action: string) {
  if (action === 'tests_passing') {
    await redmine.updateIssue(issueId, {
      status_id: STATUS_IN_REVIEW,
    });
  }
}
```

---

## Workflow Integration

1. **Start Session**
   - Fetch issue context
   - Include in AI prompt
   
2. **During Session**
   - Track time
   - Log significant operations

3. **End Session**
   - Post time entry
   - Update issue notes
   - Change status if appropriate

---

## Configuration

```yaml
redmine:
  url: "https://redmine.example.com"
  api_key: "${REDMINE_API_KEY}"
  
  activity_id: 15  # AI Development
  
  status_mapping:
    in_progress: 2
    in_review: 3
    resolved: 4
    
  auto_update:
    enabled: true
    on_pr_created: in_review
```

---

## Related Documents

- [Review and Audit Workflows](../02_GUIDES/Review_and_Audit_Workflows.md)
