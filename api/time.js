// Vercel Serverless Function
export default async function handler(req, res) {
  // 设置响应头防止缓存
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  
  // 处理 OPTIONS 请求（CORS 预检）
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // 只允许 GET 请求
  if (req.method !== 'GET') {
    res.status(405).json({ 
      error: 'Method not allowed',
      message: 'Only GET method is supported' 
    });
    return;
  }
  
  try {
    // 直接使用服务器当前时间，不做时区转换
    // 让前端根据用户的本地时区显示
    const now = new Date();
    
    const response = {
      success: true,
      timestamp: now.toISOString(),
      timezone: 'Server Time',
      server_time: now.toISOString(),
      unix_timestamp: Math.floor(now.getTime() / 1000),
      server_timezone: process.env.TZ || 'UTC'
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error('Time API error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: 'Failed to get server time',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}