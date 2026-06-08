const API_TOKEN = 'pat_1iZO7Dz2OWQC6a9Rx3gqAJ10BQx3a9slMoWkDkx0nE9ZRaAODYqZlgDdTGoOQgNn';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '仅支持 POST 请求' });
    }

    res.setHeader('Content-Type', 'application/json');

    try {
        const { search_query, resume_url, file_type } = req.body;

        if (!search_query) {
            return res.status(400).json({ error: '缺少 search_query 参数' });
        }
        if (!resume_url) {
            return res.status(400).json({ error: '缺少 resume_url 参数' });
        }

        const response = await fetch('https://nq5xgnvdhs.coze.site/run', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                search_query: search_query,
                my_resume: {
                    url: resume_url,
                    file_type: file_type || 'pdf'
                }
            })
        });

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('API 调用失败:', error);
        return res.status(500).json({ 
            error: '分析失败',
            message: error.message 
        });
    }
}
