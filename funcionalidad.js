// Asegúrate de poner la URL completa y absoluta de Render
const API_URL = "https://calculadora-java-kykd.onrender.com/api";

function llamarApi(op, metodo, a, b) {
    let url = "";
    
    // Construcción de la URL completa
    if (metodo === 'PATH') {
        url = `${API_URL}/${op}/path/${a}/${b}`;
    } else if (metodo === 'QUERY') {
        url = `${API_URL}/${op}/query?a=${a}&b=${b}`;
    } else if (metodo === 'BODY') {
        url = `${API_URL}/${op}/body`;
        // Para BODY usamos POST
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ a: parseFloat(a), b: parseFloat(b) })
        })
        .then(res => res.json())
        .then(data => alert("Resultado: " + data.resultado))
        .catch(err => console.error("Error:", err));
        return; // Salimos aquí porque el fetch es distinto
    }

    // Para PATH y QUERY usamos GET
    fetch(url)
        .then(res => res.json())
        .then(data => alert("Resultado: " + data.resultado))
        .catch(err => {
            console.error("URL fallida:", url);
            console.error("Error:", err);
            alert("Error de conexión. Revisa la consola (F12).");
        });
}
