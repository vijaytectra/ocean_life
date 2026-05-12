const http = require('http');

http.get('http://localhost:3000/api/clients/logos', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    try {
      console.log(JSON.stringify(JSON.parse(data), null, 2));
    } catch (e) {
      console.log('Raw output:', data);
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
