const API_TOKEN = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMwNTQ1ZjM1LWY0M2YtNDU1OS1iNmUzLTc3ODc1MTFiZDc4YiJ9.eyJpc3MiOiJodHRwczovL2FwaS5jb3plLmNuIiwiYXVkIjpbInZCRkNGM2RJVnBJY3ZaVXBjZ2xkV0hmTXg4RzVpU1ZBIl0sImV4cCI6ODIxMDI2Njg3Njc5OSwiaWF0IjoxNzgwODkwOTUzLCJzdWIiOiJzcGlmZmU6Ly9hcGkuY296ZS5jbi93b3JrbG9hZF9pZGVudGl0eS9pZDo3NjQyMjg3MjMwNTg0NjE5MDA4Iiwic3JjIjoiaW5ib3VuZF9hdXRoX2FjY2Vzc190b2tlbl9pZDo3NjQ4ODY4NDAyNjEzNzE1MDA3In0.Dsi3VNNsoPghRD4oBdJVsuho92KPY8GfnSPPetUP97buBkmesLszZKBaRUfU-RlAhl2-CQxx2rNPQDruhG8F8wAsOq8xw5ifESj77ZtYVxbuhMg0kETIDlstat0d_xr_MCDF9_qS6fjKBifDYcs262nv1TuGXX0Fj8US0hweYBOx9j25WuqIvg1ZzyCPUICsMT3hMPyyuZlaupn_BTOZhxCyyE-qHi_e-_mKFVJdaNYvkjEJ7eJX1me9B_-U7uRVj9-rVNssyK19S-9u3WCXhqhNEdnJeOdHOjm5SkwbcG41wQonfMztvQ_hkc25diLKct-2mC8BmmPjoIGNiTYLSQ';

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
