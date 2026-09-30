import API_URL from './api';

export async function getEmpleados() {
  try {
    const response = await fetch(`${API_URL}/Empleado`);

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    throw error;
  }
}

export async function asignarVinculoLaboral(
  empId: number,
  vlId: number
) {
  const fechaActual = new Date().toISOString();

  const nuevoVinculo = {
    evl_id: 0,
    emp_id: empId,
    vl_id: vlId,
    evl_temporal: false,
    evl_fecha_desde: fechaActual,
    evl_fecha_hasta: fechaActual,
    evl_emp_id_modifico: empId,
    evl_fecha_modifico: fechaActual,
    evl_estado: true,
    evl_anulado: false,
  };

  const response = await fetch(
    `${API_URL}/EmpleadoVinculoLaboral`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoVinculo),
    }
  );

  if (!response.ok) {
    const texto = await response.text();

    throw new Error(
      `Error HTTP ${response.status}: ${texto}`
    );
  }

  return await response.json();
}
export async function anularVinculoLaboral(
  evlId: number
) {
  const response = await fetch(
    `${API_URL}/EmpleadoVinculoLaboral/anular/${evlId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const texto = await response.text();

    throw new Error(
      `Error HTTP ${response.status}: ${texto}`
    );
  }

  const texto = await response.text();

  return texto ? JSON.parse(texto) : null;
}