// import 'dotenv/config';
// import app from './app.js'; 

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
import 'dotenv/config';
import app from './app.js';
import serverless from 'serverless-http';


export const handler = serverless(app);  
