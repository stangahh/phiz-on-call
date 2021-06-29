# phiz-on-call

## Instructions

1. Install [docker desktop][] and make sure its running in the background.

1. Create environment variable fields

```bash
# cd to root of this repo
cp ./projects/chat-poller/.env.example ./projects/chat-poller/.env
cp ./projects/web-app/.env.example ./projects/web-app/.env
```

1. Fill in secrets to `./projects/chat-poller/.env`, according to the [README.md](projects/chat-poller/README.md)

1. Start the docker-compose stack

```bash
   yarn compose # or, `npm run compose`
```

[docker desktop]: https://www.docker.com/products/docker-desktop
