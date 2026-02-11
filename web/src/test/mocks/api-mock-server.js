/**
 * 本地Mock API服务器
 * 用于开发环境替代外部API依赖
 *
 * 启动方式：
 * node src/test/mocks/api-mock-server.js
 *
 * 或者添加到package.json scripts中：
 * "mock-server": "node src/test/mocks/api-mock-server.js"
 */

const http = require('http');
const url = require('url');

const PORT = process.env.MOCK_PORT || 3001;

// Mock AI聊天响应
const mockAIResponse = {
  id: 'chatcmpl-mock123',
  object: 'chat.completion',
  created: Date.now(),
  model: 'gpt-4',
  choices: [{
    index: 0,
    message: {
      role: 'assistant',
      content: '这是来自本地Mock服务的响应。在开发环境中使用此服务可以避免对外部API的依赖。'
    },
    finish_reason: 'stop'
  }],
  usage: {
    prompt_tokens: 10,
    completion_tokens: 20,
    total_tokens: 30
  }
};

// Mock Ant Design X API响应
const mockXResponse = {
  success: true,
  data: {
    message: 'Mock response from local server',
    timestamp: new Date().toISOString()
  }
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname } = parsedUrl;

  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  console.log(`${req.method} ${pathname}`);

  // OpenAI API mock
  if (pathname.startsWith('/v1/chat/completions')) {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });

      req.on('end', () => {
        console.log('Received AI request:', body);

        // 模拟处理时间
        setTimeout(() => {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(mockAIResponse));
        }, 500);
      });
    } else {
      res.writeHead(405);
      res.end('Method Not Allowed');
    }
    return;
  }

  // Ant Design X API mock
  if (pathname.startsWith('/api/x') || pathname.includes('api.x.ant.design')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockXResponse));
    return;
  }

  // 默认响应
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    error: 'Not Found',
    message: 'This is a mock server. Endpoint not implemented.',
    availableEndpoints: [
      'POST /v1/chat/completions - Mock OpenAI API',
      'GET /api/x/* - Mock Ant Design X API'
    ]
  }));
});

server.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on http://localhost:${PORT}`);
  console.log('📝 Available endpoints:');
  console.log('  POST /v1/chat/completions - Mock OpenAI API');
  console.log('  GET /api/x/* - Mock Ant Design X API');
  console.log('');
  console.log('💡 To use this server in development, set:');
  console.log('  VITE_AI_BASE_URL=http://localhost:3001');
  console.log('  VITE_X_API_BASE_URL=http://localhost:3001/api/x');
});
