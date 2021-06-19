# chat-poller

`cp .env.example .env`

fill values

get access_token via:

```
https://id.twitch.tv/oauth2/authorize
    ?client_id=$CLIENT_ID
    &redirect_uri=http://localhost
    &response_type=token
    &scope=chat:read
```
