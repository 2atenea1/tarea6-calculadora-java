// Tu URL de Render
const API_URL = "https://calculadora-java-kykd.onrender.com/api";

// Recibimos los parámetros exactamente como los envía el HTML: primero el método, luego la operación
function llamarApi(metodo, op) {
    // 1. Capturamos los valores 'a' y 'b' directamente de los inputs de la pantalla
    const a = document.getElementById('numA').value;
    const b = document.getElementById('numB').value;

    let url = "";
    let options = { method: 'GET' };

    // 2. Convertimos el método a mayúsculas para que coincida con tus IFs (path -> PATH)
    const metodoUpper = metodo.toUpperCase();

    // 3. Construcción precisa de las rutas
    if (metodoUpper === 'PATH') {
        url = `${API_URL}/${op}/path/${a}/${b}`;
    } else if (metodoUpper === 'QUERY') {
        url = `${API_URL}/${op}/query?a=${a}&b=${b}`;
    } else if (metodoUpper === 'BODY') {
        url = `${API_URL}/${op}/body`;
        options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a: parseFloat(a), b: parseFloat(b) })
        };
    }

    console.log("¡Ahora sí! Llamando a la URL correcta:", url); 

    // 4. Hacemos la petición
    fetch(url, options)
        .then(response => {
            if (!response.ok) throw new Error("Error en la respuesta: " + response.status);
            return response.json();
        })
        .then(data => {
            // En lugar de un alert, mostramos el resultado en la caja gris de tu diseño
            document.getElementById('display').innerText = "Resultado: " + data.resultado;
        })
        .catch(error => {
            console.error("Error detectado:", error);
            document.getElementById('display').innerText = "Error de conexión";
        });
}
