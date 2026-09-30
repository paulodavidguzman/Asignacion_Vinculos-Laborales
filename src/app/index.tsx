import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  anularVinculoLaboral,
  asignarVinculoLaboral,
  getEmpleados,
} from '../services/empleadoService';

import { getVinculosLaborales } from '../services/vinculoLaboralService';

export default function HomeScreen() {
  const [vinculos, setVinculos] = useState<any[]>([]);
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const [empleadoSeleccionado, setEmpleadoSeleccionado] =
    useState<any>(null);

  const [vinculoSeleccionado, setVinculoSeleccionado] =
    useState<any>(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      setError('');

      const datosVinculos = await getVinculosLaborales();
      const datosEmpleados = await getEmpleados();

      console.log('Vínculos recibidos:', datosVinculos);
      console.log('Empleados recibidos:', datosEmpleados);

      setVinculos(datosVinculos);
      setEmpleados(datosEmpleados);
    } catch (error) {
      console.error(error);
      setError('No se pudo conectar con el BackendAPI.');
    } finally {
      setCargando(false);
    }
  };

  const confirmarAsignacion = async () => {
    if (!empleadoSeleccionado || !vinculoSeleccionado) {
      return;
    }

    try {
      await asignarVinculoLaboral(
        empleadoSeleccionado.emp_id,
        vinculoSeleccionado.vl_id
      );

      console.log('Vínculo asignado correctamente');

      setEmpleadoSeleccionado(null);
      setVinculoSeleccionado(null);

      await cargarDatos();
    } catch (error) {
      console.error('Error al asignar vínculo:', error);
    }
  };

  const anularVinculo = async (empleado: any) => {
  if (!empleado.evl_id) {
    console.log('El empleado no tiene un vínculo para anular');
    return;
  }

  try {
    await anularVinculoLaboral(empleado.evl_id);

    console.log('Vínculo anulado correctamente');

    setEmpleadoSeleccionado(null);
    setVinculoSeleccionado(null);

    await cargarDatos();
  } catch (error) {
    console.error('Error al anular vínculo:', error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      {/* ENCABEZADO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Sistema Asignación Vínculos Laborales
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          Vínculos Laborales
        </Text>

        <Text style={styles.subtitle}>
          Datos obtenidos desde el BackendAPI
        </Text>

        {/* CARGANDO */}
        {cargando && (
          <View style={styles.card}>
            <ActivityIndicator size="large" />

            <Text style={styles.cardText}>
              Cargando datos...
            </Text>
          </View>
        )}

        {/* ERROR */}
        {error !== '' && (
          <View style={styles.card}>
            <Text style={styles.errorText}>
              {error}
            </Text>
          </View>
        )}

        {/* VÍNCULOS LABORALES */}
        {!cargando && error === '' && (
          <>
            <Text style={styles.sectionTitle}>
              Tipos de vínculos
            </Text>

            {vinculos.length === 0 ? (
              <View style={styles.card}>
                <Text style={styles.cardText}>
                  No se encontraron vínculos laborales.
                </Text>
              </View>
            ) : (
              vinculos.map((vinculo, index) => (
                <View
                  style={styles.card}
                  key={vinculo.vl_id ?? index}
                >
                  <Text style={styles.cardTitle}>
                    {vinculo.vl_descripcion ??
                      'Sin descripción'}
                  </Text>

                  <Text style={styles.cardText}>
                    ID: {vinculo.vl_id ?? '-'}
                  </Text>
                </View>
              ))
            )}
          </>
        )}

        {/* EMPLEADOS */}
        {!cargando && error === '' && (
          <>
            <Text style={styles.sectionTitle}>
              Empleados
            </Text>

            {empleados.length === 0 ? (
              <View style={styles.card}>
                <Text style={styles.cardText}>
                  No se encontraron empleados.
                </Text>
              </View>
            ) : (
              empleados.map((empleado, index) => (
                <View
                  style={styles.card}
                  key={empleado.emp_id ?? index}
                >
                  {/* NOMBRE */}
                  <Text style={styles.cardTitle}>
                    {empleado.emp_apellido}{' '}
                    {empleado.emp_nombre}
                  </Text>

                  {/* DNI */}
                  <Text style={styles.cardText}>
                    DNI:{' '}
                    {empleado.emp_nrodocumento ?? '-'}
                  </Text>

                  {/* VÍNCULO ACTUAL */}
                  <Text style={styles.cardText}>
                    Vínculo:{' '}
                    {empleado.vinculo ||
                      'Sin vínculo asignado'}
                  </Text>

                  {/* ESTADO */}
                  <Text style={styles.cardText}>
                    Estado:{' '}
                    {empleado.estado === true
                      ? 'Activo'
                      : empleado.estado === false
                        ? 'Pendiente'
                        : 'Sin vínculo'}
                  </Text>

                  {/* BOTÓN ASIGNAR */}
                {empleado.estado !== true && (
  <Pressable
    style={styles.btnAsignar}
    onPress={() => {
      setEmpleadoSeleccionado(empleado);
      setVinculoSeleccionado(null);
    }}
  >
    <Text style={styles.btnAsignarTexto}>
      Asignar
    </Text>
  </Pressable>
)}
                  {empleado.estado === true && empleado.evl_id && (
  <Pressable
    style={styles.btnAnular}
    onPress={() => anularVinculo(empleado)}
  >
    <Text style={styles.btnAnularTexto}>
      Anular vínculo
    </Text>
  </Pressable>
)}

                  {/* FORMULARIO DE ASIGNACIÓN */}
                  {empleadoSeleccionado?.emp_id ===
                    empleado.emp_id && (
                    <View style={styles.formAsignacion}>
                      <Text
                        style={
                          styles.empleadoSeleccionado
                        }
                      >
                        Seleccione un vínculo laboral
                      </Text>

                      {/* OPCIONES */}
                      {vinculos.map(
                        (vinculo, indiceVinculo) => (
                          <Pressable
                            key={
                              vinculo.vl_id ??
                              indiceVinculo
                            }
                            style={[
                              styles.opcionVinculo,

                              vinculoSeleccionado
                                ?.vl_id ===
                                vinculo.vl_id &&
                                styles.opcionVinculoSeleccionada,
                            ]}
                            onPress={() =>
                              setVinculoSeleccionado(
                                vinculo
                              )
                            }
                          >
                            <Text
                              style={
                                styles.opcionVinculoTexto
                              }
                            >
                              {
                                vinculo.vl_descripcion
                              }
                            </Text>
                          </Pressable>
                        )
                      )}

                      {/* BOTÓN CONFIRMAR */}
                      {vinculoSeleccionado && (
                        <Pressable
                          style={styles.btnConfirmar}
                          onPress={
                            confirmarAsignacion
                          }
                        >
                          <Text
                            style={
                              styles.btnConfirmarTexto
                            }
                          >
                            Confirmar asignación
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  )}
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  header: {
    backgroundColor: '#0d6efd',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  content: {
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  cardText: {
    fontSize: 15,
    color: '#555555',
    marginTop: 5,
  },

  errorText: {
    fontSize: 15,
    color: '#dc3545',
    fontWeight: 'bold',
  },

  btnAsignar: {
    backgroundColor: '#0d6efd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },

  btnAsignarTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  empleadoSeleccionado: {
    marginTop: 10,
    fontSize: 14,
    color: '#198754',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  formAsignacion: {
    marginTop: 12,
  },

  opcionVinculo: {
    backgroundColor: '#eeeeee',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
  },

  opcionVinculoSeleccionada: {
    backgroundColor: '#dbeafe',
    borderColor: '#0d6efd',
    borderWidth: 2,
  },

  opcionVinculoTexto: {
    fontSize: 15,
    fontWeight: '600',
  },

  btnConfirmar: {
    backgroundColor: '#198754',
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },

  btnConfirmarTexto: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnAnular: {
  backgroundColor: '#dc3545',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginTop: 10,
  alignItems: 'center',
},

btnAnularTexto: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
},
});