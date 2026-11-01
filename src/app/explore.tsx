
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getVinculosLaborales } from '../services/vinculoLaboralService';

type VinculoLaboral = {
  vl_id: number;
  vl_descripcion: string;
};

export default function VinculosScreen() {
  const [vinculos, setVinculos] = useState<VinculoLaboral[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarVinculos();
  }, []);

  const cargarVinculos = async () => {
    try {
      setCargando(true);
      setError('');

      const datos = await getVinculosLaborales();
      setVinculos(datos);
    } catch (error) {
      console.error('Error al consultar vínculos:', error);
      setError('No se pudieron cargar los vínculos laborales.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Gestión de Vínculos Laborales
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tipos de vínculos</Text>
        <Text style={styles.subtitle}>
          Consulta de vínculos laborales disponibles
        </Text>

        {cargando && <ActivityIndicator size="large" />}

        {error !== '' && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {!cargando && error === '' && vinculos.length === 0 && (
          <Text>No se encontraron vínculos laborales.</Text>
        )}

        {!cargando && error === '' &&
          vinculos.map((vinculo) => (
            <View key={vinculo.vl_id} style={styles.card}>
              <Text style={styles.cardTitle}>
                {vinculo.vl_descripcion}
              </Text>
              <Text style={styles.cardText}>
                Identificador: {vinculo.vl_id}
              </Text>
            </View>
          ))}
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
    padding: 18,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666666',
    fontSize: 15,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#555555',
    marginTop: 8,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 15,
  },
});
