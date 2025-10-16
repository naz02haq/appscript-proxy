export default async function handler(req, res) {
     const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyPeZJrr5ruYyqd9ntK3_eK2M6XsoxYduo85FxEN_PS6l4W4F8PzDH2qJWHNyTyyxUr/exec';
     
     try {
       const url = appsScriptUrl + (req.url !== '/api' ? req.url.replace('/api', '') : '');
       
       const response = await fetch(url, {
         method: req.method,
         headers: {
           'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0'
         }
       });
       
       const contentType = response.headers.get('content-type');
       
       if (contentType && contentType.includes('text/html')) {
         const html = await response.text();
         res.setHeader('Content-Type', 'text/html; charset=utf-8');
         return res.status(200).send(html);
       }
       
       const data = await response.text();
       res.setHeader('Content-Type', contentType || 'text/html');
       return res.status(200).send(data);
       
     } catch (error) {
       return res.status(500).send(`Error: ${error.message}`);
     }
   }
