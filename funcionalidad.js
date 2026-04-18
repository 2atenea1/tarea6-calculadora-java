// Asegúrate de que esta URL sea exactamente la de tu servicio en Render
const API_URL = "https://calculadora-java-kykd.onrender.com/api";

function llamarApi(op, metodo, a, b) {
    let url = "";
    let options = { method: 'GET' };

    // Construcción precisa de las rutas según tu Controlador Java
    if (metodo === 'PATH') {
        url = `${API_URL}/${op}/path/${a}/${b}`;
    } else if (metodo === 'QUERY') {
        url = `${API_URL}/${op}/query?a=${a}&b=${b}`;
    } else if (metodo === 'BODY') {
        url = `${API_URL}/${op}/body`;
        options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a: parseFloat(a), b: parseFloat(b) })
        };
    }

    console.log("Llamando a:", url); // Esto te dirá en la consola si la URL es correcta

    fetch(url, options)
        .then(response => {
            if (!response.ok) throw new Error("Error en la respuesta: " + response.status);
            return response.json();
        })
        .then(data => {
            alert("Resultado: " + data.resultado);
        })
        .catch(error => {
            console.error("Error detectado:", error);
            alert("Error: Revisa la consola F12 para más detalles.");
        });
}
