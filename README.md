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

1. Deploy the code to cloudflare worker
2. Set up the necessary environment variables, especially the `SLACK_WEBHOOK_URL`.
3. The function will automatically run every 5 minutes. You can also trigger it manually via an HTTP request.

## Error Handling

If any errors occur during the status check, a detailed error message will be sent to the configured Slack channel.
