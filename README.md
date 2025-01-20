# dfs-status-checker-on-cloudflare-worker
This project monitors the status of DataForSEO's services by checking their status page every 5 minutes and notifies a Slack channel if any issues are detected.

## Features

- **Scheduled Monitoring**: Runs every 5 minutes to check the status of DataForSEO services.
- **Manual Trigger**: Can be triggered manually via an HTTP request.
- **Slack Notifications**: Sends a detailed message to a Slack channel if any issues are detected or if an error occurs during the check.

## Environment Variables

The project relies on the following environment variables:

- `SLACK_WEBHOOK_URL`: The webhook URL for the Slack channel where notifications will be sent.

## Functions

### `scheduled(event, env, ctx)`

This function is triggered automatically every 5 minutes. It calls the `checkWebpage` function to fetch and analyze the status of DataForSEO services.

### `fetch(request, env, ctx)`

This function can be triggered manually via an HTTP request. It also calls the `checkWebpage` function and responds with a confirmation message.

### `checkWebpage(env)`

This function performs the following actions:
1. Fetches the status data from DataForSEO's status API.
2. Checks if there are any issues reported for the current day.
3. If issues are found, formats a message and sends it to the specified Slack channel.
4. If an error occurs during the check, sends an error message to Slack.

## How to Use
### Method 1: use cloudflare wrangler CLI to deploy index.js and wrangler.toml

### Method 2: use cloudflare to deploy
1. you can actually just copy the code from index.js and paste it into the online editor for the Cloudflare worker.
<img width="775" alt="Screenshot 2025-01-20 at 11 21 53 PM" src="https://github.com/user-attachments/assets/23f9997e-7f4f-420f-8d29-84c1cecfc60a" />


2. Setting > Variable and Secret: Replace env SLACK_WEBHOOK_URL with your own.
<img width="733" alt="Screenshot 2025-01-20 at 11 22 13 PM" src="https://github.com/user-attachments/assets/fcf95122-00c6-404a-a2e4-f582dfea63f6" />

3. Setting > Trigger events: Set to run every 5 minutes
 <img width="728" alt="Screenshot 2025-01-20 at 11 22 27 PM" src="https://github.com/user-attachments/assets/3e11d2a1-e9d7-4e25-8748-4df45216e222" />


## Error Handling

If any errors occur during the status check, a detailed error message will be sent to the configured Slack channel.
