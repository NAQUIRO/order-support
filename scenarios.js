const scenariosByTeamSize = {
  3: [
    {
      context: "Hay 15 clientes en fila. El bar está atrasado. Acaban de salir 3 bebidas frías y 2 calientes. El horno acaba de terminar una comida.",
      options: {
        A: "Entregar bebidas",
        B: "Marcar vasos",
        C: "Sacar comida del horno",
        D: "Apoyar a bar"
      },
      correct: "C",
      explanation: "La comida recién salida del horno debe servirse caliente. Si la dejas, se enfría y afecta la experiencia. Después puedes entregar bebidas y comida juntas."
    },
    {
      context: "El PDV tiene un cliente esperando para ordenar. No hay bebidas listas. El bar está desocupado. El horno está vacío.",
      options: {
        A: "Escuchar el pedido",
        B: "Preparar insumos",
        C: "Limpiar la barra",
        D: "Revisar inventario"
      },
      correct: "A",
      explanation: "Siempre debes estar atento al PDV para tomar el pedido y anticipar bebidas. Es la primera tarea del ciclo."
    },
    {
      context: "El bar está lleno de vasos sucios y falta hielo. Hay 5 clientes esperando bebidas. No hay comida en el horno.",
      options: {
        A: "Apoyar a bar limpiando y reponiendo hielo",
        B: "Entregar bebidas (aunque no están listas)",
        C: "Marcar vasos para el siguiente pedido",
        D: "Esperar a que el bar se desocupe"
      },
      correct: "A",
      explanation: "Si el bar está atascado por falta de insumos, debes apoyar para agilizar la producción de bebidas."
    },
    {
      context: "Tienes 2 bebidas listas y una comida recién salida. El cliente correspondiente está esperando.",
      options: {
        A: "Entregar solo las bebidas",
        B: "Entregar la comida primero",
        C: "Entregar bebidas y comida juntas",
        D: "Llamar al cliente pero esperar a que termine otra comida"
      },
      correct: "C",
      explanation: "Siempre que sea posible, entrega la orden completa (bebida + comida) para una mejor experiencia."
    },
    {
      context: "El horno acaba de terminar 2 comidas. El bar está sirviendo bebidas sin demora. No hay clientes en PDV.",
      options: {
        A: "Sacar las comidas y llamar al cliente",
        B: "Ayudar al bar con bebidas",
        C: "Preparar vasos para el próximo pedido",
        D: "Revisar el inventario de leche"
      },
      correct: "A",
      explanation: "La comida lista es prioridad, sácala inmediatamente y entrégala al cliente."
    }
  ],
  4: [
    // Escenarios para equipo de 4 (diferentes énfasis)
    {
      context: "Hay 10 clientes en fila. El bar está sirviendo bien. El horno tiene una comida lista. No hay bebidas listas.",
      options: {
        A: "Sacar la comida",
        B: "Ayudar en bar",
        C: "Marcar vasos",
        D: "Escuchar PDV"
      },
      correct: "A",
      explanation: "La comida lista siempre es lo primero, independientemente del tamaño del equipo."
    },
    {
      context: "El PDV está vacío. El bar necesita hielo y leche. Hay 3 bebidas listas esperando entrega.",
      options: {
        A: "Reponer insumos en bar",
        B: "Entregar bebidas",
        C: "Limpiar estaciones",
        D: "Preparar vasos"
      },
      correct: "B",
      explanation: "Las bebidas listas deben entregarse cuanto antes. Luego puedes apoyar con insumos."
    },
    {
      context: "Acaban de llegar 5 pedidos nuevos. Los vasos no están marcados. El bar está desocupado.",
      options: {
        A: "Marcar vasos",
        B: "Escuchar PDV",
        C: "Preparar insumos",
        D: "Ayudar en bar"
      },
      correct: "A",
      explanation: "Marcar vasos inmediatamente después de tomar el pedido es clave para organizar la producción."
    },
    {
      context: "El horno tiene comida lista. El bar está atrasado. Hay 2 bebidas listas.",
      options: {
        A: "Sacar comida",
        B: "Ayudar a bar",
        C: "Entregar bebidas",
        D: "Marcar vasos"
      },
      correct: "A",
      explanation: "Siempre prioriza la comida caliente. Luego puedes entregar bebidas y apoyar a bar."
    },
    {
      context: "No hay clientes en fila. Todo está al día. El bar tiene insumos completos.",
      options: {
        A: "Limpiar y organizar estaciones",
        B: "Revisar inventario",
        C: "Preparar vasos por si acaso",
        D: "Descansar"
      },
      correct: "A",
      explanation: "Aprovecha los momentos de baja para mantener el área limpia y organizada."
    }
  ],
  5: [
    // Escenarios para 5 partners (más énfasis en coordinación)
    {
      context: "Hay 20 clientes en fila. El bar de calientes está atrasado. El cold bar está bien. El horno tiene 3 comidas listas.",
      options: {
        A: "Sacar comidas",
        B: "Apoyar a bar de calientes",
        C: "Marcar vasos",
        D: "Entregar bebidas frías"
      },
      correct: "A",
      explanation: "La comida lista es prioridad global. Después puedes apoyar donde más se necesite."
    },
    {
      context: "El PDV tiene un cliente esperando. Los vasos del pedido anterior no están marcados. El bar necesita leche.",
      options: {
        A: "Marcar vasos",
        B: "Escuchar PDV",
        C: "Llevar leche a bar",
        D: "Revisar horno"
      },
      correct: "B",
      explanation: "Primero toma el pedido, luego marcas vasos. El apoyo a bar puede esperar unos segundos."
    },
    {
      context: "El horno acaba de terminar 2 comidas. El bar de frías tiene 4 bebidas listas. Hay clientes esperando.",
      options: {
        A: "Sacar comidas y entregar todo junto",
        B: "Entregar bebidas frías primero",
        C: "Sacar comidas y luego entregar bebidas",
        D: "Llamar a los clientes para que recojan"
      },
      correct: "A",
      explanation: "Coordina la entrega completa. Saca la comida y junto con las bebidas, llama al cliente."
    },
    {
      context: "El cold bar está desbordado. El bar de calientes está bien. El horno está vacío. No hay clientes en PDV.",
      options: {
        A: "Apoyar a cold bar",
        B: "Preparar insumos",
        C: "Marcar vasos",
        D: "Limpiar"
      },
      correct: "A",
      explanation: "Con 5 partners, el OS coordina y apoya donde haya cuello de botella."
    },
    {
      context: "Hay 2 pedidos nuevos. Los vasos están listos. El bar necesita jarabes. El horno tiene una comida a punto de salir.",
      options: {
        A: "Esperar la comida",
        B: "Llevar jarabes a bar",
        C: "Marcar vasos",
        D: "Tomar el siguiente pedido"
      },
      correct: "B",
      explanation: "Puedes aprovechar mientras la comida termina para abastecer al bar, pero sin descuidar la comida."
    }
  ],
  6: [
    // Escenarios para 6 partners (énfasis en coordinación y flujo)
    {
      context: "Ambos PDV tienen clientes. El bar de calientes y frías están trabajando. El horno tiene comida lista.",
      options: {
        A: "Sacar comida y entregar",
        B: "Ayudar en PDV",
        C: "Abastecer insumos",
        D: "Marcar vasos"
      },
      correct: "A",
      explanation: "Con 6 personas, el OS es coordinador: la comida lista es su responsabilidad directa."
    },
    {
      context: "El bar de calientes está atrasado. El cold bar tiene todo listo. El horno está vacío. Hay bebidas listas en la barra.",
      options: {
        A: "Ayudar a bar de calientes",
        B: "Entregar bebidas",
        C: "Revisar PDV",
        D: "Limpiar"
      },
      correct: "A",
      explanation: "Apoya al área más atrasada para equilibrar el flujo."
    },
    {
      context: "Acaban de salir 5 bebidas frías y 3 calientes. El horno tiene 2 comidas listas. Los clientes esperan.",
      options: {
        A: "Entregar todo junto",
        B: "Entregar primero las frías",
        C: "Sacar comida y luego entregar",
        D: "Llamar a los clientes por separado"
      },
      correct: "A",
      explanation: "Coordina la entrega completa para cada cliente."
    },
    {
      context: "Los dos registros tienen fila. Los vasos del pedido anterior no están marcados. Falta hielo en ambas barras.",
      options: {
        A: "Marcar vasos",
        B: "Abastecer hielo",
        C: "Ayudar a tomar pedidos",
        D: "Preguntar qué necesitan"
      },
      correct: "A",
      explanation: "Marcar vasos es inmediato después del pedido. El hielo puede ser delegado a otro partner."
    },
    {
      context: "Todo está fluyendo bien. No hay clientes esperando. Las barras tienen insumos. El horno está vacío.",
      options: {
        A: "Hacer limpieza preventiva",
        B: "Preparar vasos",
        C: "Revisar inventario",
        D: "Ayudar en registro"
      },
      correct: "A",
      explanation: "Mantener el área limpia y organizada siempre es una buena práctica."
    }
  ]
};

// Función para generar 5 preguntas aleatorias para un tamaño de equipo dado
function generateQuestions(teamSize) {
  const scenarios = scenariosByTeamSize[teamSize] || scenariosByTeamSize[3]; // fallback a 3
  // Mezclar y tomar 5 (o menos si no hay suficientes)
  const shuffled = [...scenarios].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 5).map(s => ({
    context: s.context,
    options: s.options,
    correct: s.correct,
    explanation: s.explanation,
    userAnswer: null
  }));
  return selected;
}

module.exports = { generateQuestions };