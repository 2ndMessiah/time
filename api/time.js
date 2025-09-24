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
    const now = new Date();
    
    // 直接使用 JavaScript 的时区转换，更准确
    const chinaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Shanghai"}));
    
    const response = {
      success: true,
      timestamp: chinaTime.toISOString(),
      timezone: 'Asia/Shanghai',
      utc_offset: '+08:00',
      unix_timestamp: Math.floor(chinaTime.getTime() / 1000),
      milliseconds: chinaTime.getMilliseconds(),
      local_time: chinaTime.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      server_time: now.toISOString(),
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