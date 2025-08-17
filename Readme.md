
# Env Request Viewer

A tiny HTTP service to help you inspect environment variables and incoming request details inside a container or runtime.

Public image: `docker.io/hasanuzun/env-request-viewer`

## Quick start (consumers)

Pull the image and run the container, then visit <http://localhost:8080>

```bash
docker pull hasanuzun/env-request-viewer:latest
docker run --rm \
 -p 8080:8080 \
 -e EXAMPLE_VAR=hello \
 hasanuzun/env-request-viewer:latest
```

## What you get

- GET `/` — HTML page showing:
 	- All environment variables available to the process
 	- Request details (method, URL, headers)
- GET `/health` — returns `ok` (200) for health checks

## Configuration

- `PORT` (optional): Port the app listens on. Defaults to `8080`.
- Any environment variables you pass will be displayed on the `/` page.

### Examples

Compose (docker-compose.yml):

```yaml
services:
 env-viewer:
  image: hasanuzun/env-request-viewer:latest
  ports:
   - "8080:8080"
  environment:
   EXAMPLE_VAR: hello
```

Kubernetes (snippet):

```yaml
containers:
 - name: env-viewer
  image: hasanuzun/env-request-viewer:latest
  ports:
   - containerPort: 8080
  env:
   - name: EXAMPLE_VAR
    value: "hello"
  readinessProbe:
   httpGet:
    path: /health
    port: 8080
  livenessProbe:
   httpGet:
    path: /health
    port: 8080
```

## For project developers

Local run without Docker:

```bash
npm install
npm start
# visit http://localhost:8080
```

Local Docker build and run:

```bash
docker build -t env-request-viewer:local .
docker run --rm -p 8080:8080 -e EXAMPLE_VAR=hello env-request-viewer:local
```
