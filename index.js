export default {
    // Schedule to run every 5 minutes
    async scheduled(event, env, ctx) {
      await checkWebpage(env);
    },
    
    // Can also be triggered manually via HTTP request
    async fetch(request, env, ctx) {
      await checkWebpage(env);
      return new Response('Check completed', { status: 200 });
    }
  };
  
  async function checkWebpage(env) {
    try {
      const targetUrl = 'https://data.dataforseo.com/api/status_page/get_events_chart?range=30';
      
      const response = await fetch(targetUrl);
      const data = await response.json();
      console.log('API Response:', data);
      
      // Check if there are any issues today
      const today = data.data.items[3];  // items[0] is the latest day
      const isOperational = !today.issues || today.issues.length === 0;
      
      // Only send message if there are issues
      if (!isOperational) {
        // Prepare issue description
        const issuesDescription = today.issues.map(issue => 
          `• *Type:* ${issue.type}\n` +
          `  *Title:* ${issue.title}\n` +
          `  *Affected API:* \`${issue.api}\`\n` +
          `  *Status:* \`${issue.status}\`\n` +
          `  *Duration:* ${Math.floor(issue.duration/60)} minutes\n`
        ).join('\n');
        
        // Prepare message for Slack
        const message = {
          text: `*DataForSEO Status Monitor* :mag:\n\n` +
                `*Status:* :warning: Issues Detected\n` +
                `*Time:* <!date^${Math.floor(Date.now()/1000)}^{date_short} {time}|${new Date().toISOString()}>\n` +
                `\n*Current Issues:*\n${issuesDescription}`
        };
        
        // Send to Slack
        await fetch(env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message)
        });
      }
      
    } catch (error) {
      console.error('Check failed:', error);
      
      // Send error message to Slack
      const errorMessage = {
        text: `*:x: DataForSEO Status Check Error*\n\n` +
              `*Error Message:* \`${error.message}\`\n` +
              `*Time:* <!date^${Math.floor(Date.now()/1000)}^{date_short} {time}|${new Date().toISOString()}>`
      };
      
      await fetch(env.SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorMessage)
      });
    }
  } 
