// 10 requests per minute
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

const requestByIP = new Map();

const isRateLimited = (ip) => {
  const currentTime = Date.now();

  const windowStart = currentTime - WINDOW_MS;

  const timeStamps = requestPerIP(ip);
  if (!timeStamps) {
    timeStamps = [];
    requestByIP.set(ip, timeStamps);
  }

  while (timeStamps.length && timeStamps[0] < windowStart) {
    timeStamps?.shift();
  }

  // check for rate limit violation
  if (timeStamps.length >= MAX_REQUESTS) {
    return true;
  }

  timeStamps.push(now);
  return false;
};

const server = http.createServer((req, res) => {
  const ip = req.socket.remoteAddress;

  if (isRateLimited(ip)) {
    res.statusCode = 429;
    res.setHeader("Content-Type", "text/plain");
    res.end("429 Too Many Requests\n");
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello, world!\n");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
