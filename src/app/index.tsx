import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';



import {
  anularVinculoLaboral,
  asignarVinculoLaboral,
  getEmpleados,
  modificarVinculoLaboral,
} from '../services/empleadoService';


import { getVinculosLaborales } from '../services/vinculoLaboralService';

export default function HomeScreen() {
  const [vinculos, setVinculos] = useState<any[]>([]);
  const [empleados, setEmpleados] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [fotoSeleccionada, setFotoSeleccionada] =
  useState<string | null>(null);

  const [empleadoSeleccionado, setEmpleadoSeleccionado] =
    useState<any>(null);

  const [vinculoSeleccionado, setVinculoSeleccionado] =
    useState<any>(null);

    
const [empleadoEnEdicion, setEmpleadoEnEdicion] =
  useState<any>(null);

const [vinculoEnEdicion, setVinculoEnEdicion] =
  useState<number | null>(null);


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
  
const seleccionarFoto = async () => {
  try {
    const permiso =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permiso.granted) {
      setError('Se necesita permiso para acceder a las fotografías.');
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!resultado.canceled && resultado.assets.length > 0) {
      setFotoSeleccionada(resultado.assets[0].uri);
    }
  } catch (error) {
    console.error('Error al seleccionar fotografía:', error);
    setError('No se pudo abrir la galería.');
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

const confirmarModificacion = async () => {
  if (!empleadoEnEdicion?.evl_id || vinculoEnEdicion === null) {
    return;
  }

  try {
    const fechaDesde = empleadoEnEdicion.evl_fecha_desde;

    if (!fechaDesde) {
      setError('El vínculo no tiene una fecha de inicio válida.');
      return;
    }

    await modificarVinculoLaboral(
      empleadoEnEdicion.evl_id,
      vinculoEnEdicion,
      empleadoEnEdicion.evl_temporal ?? false,
      fechaDesde,
      empleadoEnEdicion.evl_fecha_hasta ?? null
    );

    setEmpleadoEnEdicion(null);
    setVinculoEnEdicion(null);

    await cargarDatos();
  } catch (error) {
    console.error('Error al modificar vínculo:', error);
    setError('No se pudo modificar el vínculo laboral.');
  }
};


const compartirEmpleado = async (empleado: any) => {
  try {
    const nombre = `${empleado.emp_apellido} ${empleado.emp_nombre}`;

    const vinculo = empleado.vinculo || 'Sin vínculo asignado';

    const estado =
      empleado.estado === true
        ? 'Activo'
        : empleado.estado === false
          ? 'Pendiente'
          : 'Sin vínculo';

    const mensaje =
      `Empleado: ${nombre}\n` +
      `DNI: ${empleado.emp_nrodocumento}\n` +
      `Vínculo laboral: ${vinculo}\n` +
      `Estado: ${estado}`;

    await Share.share({
      message: mensaje,
      title: 'Información del vínculo laboral',
    });
  } catch (error) {
    console.error('Error al compartir empleado:', error);
  }
};

const empleadosFiltrados = empleados.filter((empleado) => {
  const texto = busqueda.toLowerCase().trim();

  const nombre = String(empleado.emp_nombre ?? '').toLowerCase();
  const apellido = String(empleado.emp_apellido ?? '').toLowerCase();
  const dni = String(empleado.emp_nrodocumento ?? '');

  return (
    nombre.includes(texto) ||
    apellido.includes(texto) ||
    dni.includes(texto) ||
    `${apellido} ${nombre}`.includes(texto)
  );
});

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

            
<View style={styles.card}>
  <Text style={styles.cardTitle}>
    Fotografía desde la galería
  </Text>

  <Pressable
    style={styles.btnAsignar}
    onPress={seleccionarFoto}
  >
    <Text style={styles.btnAsignarTexto}>
      Seleccionar fotografía
    </Text>
  </Pressable>

  {fotoSeleccionada && (
    <Image
      source={{ uri: fotoSeleccionada }}
      style={{
        width: 160,
        height: 160,
        borderRadius: 10,
        marginTop: 15,
        alignSelf: 'center',
      }}
      resizeMode="cover"
    />
  )}
</View>


            <TextInput
  style={styles.inputBusqueda}
  placeholder="Buscar por nombre, apellido o DNI"
  value={busqueda}
  onChangeText={setBusqueda}
  autoCapitalize="none"
/>

            {empleadosFiltrados.length === 0 ? (
              <View style={styles.card}>
                <Text style={styles.cardText}>
                  No se encontraron empleados.
                </Text>
              </View>
            ) : (
              empleadosFiltrados.map((empleado, index) => (
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

{empleado.estado === true && empleado.evl_id != null && (
  <Pressable
    style={styles.btnModificar}
    onPress={() => {
      setEmpleadoSeleccionado(null);
      setVinculoSeleccionado(null);
      setEmpleadoEnEdicion(empleado);
      setVinculoEnEdicion(empleado.vl_id);
    }}
  >
    <Text style={styles.btnModificarTexto}>
      Modificar vínculo
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


{/* BOTÓN COMPARTIR */}
<Pressable
  style={styles.btnCompartir}
  onPress={() => compartirEmpleado(empleado)}
>
  <Text style={styles.btnCompartirTexto}>
    Compartir información
  </Text>
</Pressable>


{/* FORMULARIO DE MODIFICACIÓN */}
{empleadoEnEdicion?.emp_id === empleado.emp_id && (
  <View style={styles.formAsignacion}>
    <Text style={styles.empleadoSeleccionado}>
      Seleccione el nuevo vínculo laboral
    </Text>

    {vinculos.map((vinculo) => (
      <Pressable
        key={vinculo.vl_id}
        style={[
          styles.opcionVinculo,
          vinculoEnEdicion === vinculo.vl_id &&
            styles.opcionVinculoSeleccionada,
        ]}
        onPress={() => setVinculoEnEdicion(vinculo.vl_id)}
      >
        <Text style={styles.opcionVinculoTexto}>
          {vinculo.vl_descripcion}
        </Text>
      </Pressable>
    ))}
    
{vinculoEnEdicion !== null && (
  <Pressable
    style={styles.btnConfirmar}
    onPress={confirmarModificacion}
  >
    <Text style={styles.btnConfirmarTexto}>
      Confirmar modificación
    </Text>
  </Pressable>
)}


    <Pressable
      style={styles.btnAnular}
      onPress={() => {
        setEmpleadoEnEdicion(null);
        setVinculoEnEdicion(null);
      }}
    >
      <Text style={styles.btnAnularTexto}>
        Cancelar modificación
      </Text>
    </Pressable>
  </View>
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
inputBusqueda: {
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderColor: '#cccccc',
  borderRadius: 8,
  padding: 12,
  fontSize: 16,
  marginBottom: 15,
},


btnModificar: {
  backgroundColor: '#f0ad4e',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginTop: 10,
  alignItems: 'center',
},

btnModificarTexto: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
},

btnCompartir: {
  backgroundColor: '#495057',
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginTop: 10,
  alignItems: 'center',
},

btnCompartirTexto: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
},

});