/**
 * Date: 09/07/2023
 * Subject: E-comers Project server index.js
 * Auth: Ismile Sardar
 */

const app = require("./app");
const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`server runnig at http://localhost:${PORT}`);
});