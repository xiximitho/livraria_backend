const app = require ('./config/express')();
const port = app.get('port');

app.listen(port, () => {
    console.log(`server rodando na porta ${port}`)
});