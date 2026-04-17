package Jar;

import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://lanastudionline.com") // IMPORTANTE: Sin '/' al final
public class CalculadoraController {

    // 1. PATH: /api/suma/path/10/5
    @GetMapping("/{op}/path/{a}/{b}")
    public Map<String, Object> calcularPath(@PathVariable String op, @PathVariable double a, @PathVariable double b) {
        return ejecutar(op, a, b, "PATH");
    }

    // 2. QUERY: /api/suma/query?a=10&b=5
    @GetMapping("/{op}/query")
    public Map<String, Object> calcularQuery(@PathVariable String op, @RequestParam double a, @RequestParam double b) {
        return ejecutar(op, a, b, "QUERY");
    }

    // 3. BODY: POST /api/suma/body
    @PostMapping("/{op}/body")
    public Map<String, Object> calcularBody(@PathVariable String op, @RequestBody Map<String, Double> body) {
        double a = body.getOrDefault("a", 0.0);
        double b = body.getOrDefault("b", 0.0);
        return ejecutar(op, a, b, "BODY");
    }

    private Map<String, Object> ejecutar(String op, double a, double b, String metodo) {
        double res = 0;
        switch (op.toLowerCase()) {
            case "suma": res = a + b; break;
            case "resta": res = a - b; break;
            case "multiplicacion": res = a * b; break;
            case "division": res = (b != 0) ? a / b : 0; break;
        }
        Map<String, Object> respuesta = new HashMap<>();
        respuesta.put("resultado", res);
        respuesta.put("operacion", op);
        respuesta.put("metodo", metodo);
        return respuesta;
    }
}