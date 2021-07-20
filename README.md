# phiz-on-call

## Instructions

1. Install [Docker Desktop][] and make sure its running in the background.

2. Install [Node.js][].

3. Install [Python][].

4. Add required python libs

```
pip install keyboard
pip install requests
```

4. Create environment variable fields

```bash
# cd to root of this repo
cp ./projects/chat-poller/.env.example ./projects/chat-poller/.env
cp ./projects/web-app/.env.example ./projects/web-app/.env
```

5. Fill in secrets to `./projects/chat-poller/.env`, according to the [README.md](projects/chat-poller/README.md)

6. Start the docker-compose stack

```bash
   yarn compose # or, `npm run compose` if you don't have `yarn`
```

7. Start the keybind listener

```bash
   yarn listen # or, `npm run listen` if you don't have `yarn`
```

> You can configure the keyboard binds inside [keybindListener.py](./keybindListener.py)

[docker desktop]: https://www.docker.com/products/docker-desktop
[node.js]: https://nodejs.org/en/download/
[python]: https://www.python.org/
