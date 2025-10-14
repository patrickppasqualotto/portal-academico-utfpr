import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterSection } from '../components/FilterSection';
import { InfoCard } from '../components/InfoCard';

const mockData = [
  {
    id: '1',
    title: 'Calendário Acadêmico 2025/2',
    category: 'Acadêmico',
    department: 'Secretaria Acadêmica',
    date: '2024-01-15',
    description:
      'Confira as datas importantes do semestre letivo 2025/2, incluindo início das aulas, períodos de matrícula e provas.',
    link: 'https://www.utfpr.edu.br/cursos/coordenacoes/stricto-sensu/ppgpgp-ct/area-academica/calendarios-academicos',
  },
  {
    id: '2',
    title: 'Horário de Atendimento da Biblioteca',
    category: 'Serviços',
    department: 'Sistema de Bibliotecas',
    date: '2024-02-01',
    description:
      'Biblioteca: Seg-Sex 7h30-22h30. Bibliotecas setoriais têm horários específicos| debib-dv@utfpr.edu.br | (46) 3536- 8917 |Chefia: Keli Rodrigues do Amaral Benin - Bibliotecária (CRB-9/1559)',
  },
  {
    id: '3',
    title: 'Engenharia de Software - Coordenação',
    category: 'Acadêmico',
    department: 'Coordenação de Curso',
    date: '2024-01-10',
    description:
      'coens-dv@utfpr.edu.br | (46) 3536-8947 | G10',
    link: 'https://www.utfpr.edu.br/cursos/graduacao/bacharelado/engenharia-de-software',
  },
  {
    id: '4',
    title: 'DIRGRAD - DV',
    category: 'Serviços',
    department: 'Pró-Reitoria de Graduação',
    date: '2024-02-10',
    description:
      'Diretoria de Graduação e Educação Profissional - DV | dirgrad-dv@utfpr.edu.br | (46) 3536-8908',
  },
  {
    id: '5',
    title: 'Restaurante Universitário - Cardápio',
    category: 'Serviços',
    department: 'Divisão de Alimentação',
    date: '2024-03-01',
    description: 'Cardápio semanal do RU com opções vegetarianas e veganas disponíveis.',
    link: 'https://docs.google.com/spreadsheets/d/1tqRCVao9ASbAdwLE7vrcdL57O_vUuaAHoQ8tlFKJnyk/edit?gid=0#gid=0',
  },
];

export function UniversityInfoScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const categories = Array.from(new Set(mockData.map((item) => item.category)));
  const departments = Array.from(new Set(mockData.map((item) => item.department)));

  const filteredData = mockData.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedDepartment && item.department !== selectedDepartment)
      return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedDepartment(null);
  };

  const hasActiveFilters = selectedCategory || selectedDepartment;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.description}>
            Informações institucionais, regulamentos, serviços e calendários da
            universidade
          </Text>

          <FilterSection
            visible={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
          >
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Categoria</Text>
              <View style={styles.filterOptions}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={[
                      styles.filterChip,
                      selectedCategory === category && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setSelectedCategory(
                        selectedCategory === category ? null : category
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedCategory === category &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Departamento</Text>
              <View style={styles.filterOptions}>
                {departments.map((dept) => (
                  <TouchableOpacity
                    key={dept}
                    style={[
                      styles.filterChip,
                      selectedDepartment === dept && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setSelectedDepartment(
                        selectedDepartment === dept ? null : dept
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedDepartment === dept &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {dept}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {hasActiveFilters && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={clearFilters}
              >
                <Text style={styles.clearButtonText}>Limpar Filtros</Text>
              </TouchableOpacity>
            )}
          </FilterSection>

          <View style={styles.results}>
            <Text style={styles.resultsText}>
              {filteredData.length}{' '}
              {filteredData.length === 1 ? 'resultado' : 'resultados'}
            </Text>
          </View>

          <View style={styles.list}>
            {filteredData.map((item) => (
              <InfoCard key={item.id} data={item} type="university" />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: '#717182',
    marginBottom: 16,
    lineHeight: 20,
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#030213',
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#f3f3f5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  filterChipActive: {
    backgroundColor: '#030213',
  },
  filterChipText: {
    fontSize: 12,
    color: '#030213',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  clearButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#d4183d',
    fontWeight: '500',
  },
  results: {
    marginVertical: 12,
  },
  resultsText: {
    fontSize: 12,
    color: '#717182',
  },
  list: {
    gap: 12,
  },
});
