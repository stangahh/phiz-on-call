# chat-poller

This application requires access to Twitch APIs via a Twitch account that you have access to. You can use your personal twitch account to set up this bot.

1. Create the environnment file if you havent already.

`cp .env.example .env`

1. Fill `AUTH_USERNAME` environment variable with your developer account username

1. Fill `CHANNEL_TO_JOIN` environment variable with the twitch chat you want to trail

1. Register an `Application` on your [Twitch Developer Console][]

1. Set the `OAuth Redirect URLs` to `http://localhost`

1. Take the `Client ID` and save it for use in the next step.

1. Navigate to the following url in your browser, replacing `$CLIENT_ID` with the value from the previous step

```bash
https://id.twitch.tv/oauth2/authorize
    ?client_id=$CLIENT_ID
    &redirect_uri=http://localhost
    &response_type=token
    &scope=chat:read
```

You will be redirected to an empty page with an updated URL, in the format:
`http://localhost/#access_token=$YOUR_ACCESS_TOKEN&scope=chat%3Aread&token_type=bearer`

Except `$YOUR_ACCESS_TOKEN` will be a randomly generated string.

1. Take the randomly generated string and put it in the `OAUTH_TOKEN` environment variable

[twitch developer console]: https://dev.twitch.tv/console
