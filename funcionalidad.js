// Cambia esta URL cuando lo subas a Render
const API_URL = "https://tarea6-calculadora-php.onrender.com"; 

async function llamarApi(tipo, operacion) {
    const a = document.getElementById('numA').value;
    const b = document.getElementById('numB').value;
    const display = document.getElementById('display');
    
    let urlFinal = API_URL;
    let config = { method: 'GET' };

    try {
        if (tipo === 'path') {
            // Formato: index.php/suma/10/5
            urlFinal = `${API_URL}/${operacion}/${a}/${b}`;
        } 
        else if (tipo === 'query') {
            // Formato: index.php?op=suma&a=10&b=5
            urlFinal = `${API_URL}?op=${operacion}&a=${a}&b=${b}`;
        } 
        else if (tipo === 'body') {
            // Formato: POST con JSON
            config = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ op: operacion, a: parseFloat(a), b: parseFloat(b) })
            };
        }

        const respuesta = await fetch(urlFinal, config);
        const datos = await respuesta.json();
        
        display.innerText = `Resultado (${tipo.toUpperCase()}): ${datos.resultado}`;
    } catch (error) {
        display.innerText = "Error de conexión";
        console.error(error);
    }
}