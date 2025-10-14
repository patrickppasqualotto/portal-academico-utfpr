import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FilterSection } from '../components/FilterSection';
import { InfoCard } from '../components/InfoCard';

const mockData = [
  {
    id: '1',
    title: 'UTFPR está entre as melhores universidades da América Latina no QS Ranking 2026',
    category: 'Conquistas',
    department: 'Campus',
    date: '08/10/2025',
    content:
      'Instituição é a 34ª no Brasil e 101ª na América do Sul e 122ª no continente.',
    author: 'Assessoria de Comunicação',
    link: 'https://www.utfpr.edu.br/noticias/geral/utfpr-esta-entre-as-melhores-universidades-da-america-latina-1',
  },
  {
    id: '2',
    title: 'UTFPR e IPB lançam editais internacionais para doutorandos e professores visitantes',
    category: 'Oportunidades',
    department: 'Pró-Reitoria de Pesquisa e Pós-Graduação',
    date: '22/09/2025',
    content:
      'Seis estudantes e três docentes de Portugal poderão participar de mobilidade no Brasil.',
    author: 'Assessoria de Comunicação',
    link: 'https://www.utfpr.edu.br/noticias/geral/utfpr-e-ipb-lancam-editais-internacionais-para-doutorandos-e-professores-visitantes',
  },
  {
    id: '3',
    title: 'UTFPR promove Feiras de Profissões em diferentes cidades do Paraná',
    category: 'Comunidade',
    department: 'Comunicação Social',
    date: '16/09/2025',
    content:
      'Eventos trazem apresentação de cursos e possibilidades de carreira a partir de setembro.',
    author: 'Assessoria de Comunicação',
    link: 'https://www.utfpr.edu.br/noticias/geral/utfpr-promove-feiras-de-profissoes-em-diferentes-cidades-do-parana',
  },
  {
    id: '4',
    title: 'Cerimônia oficializa posse da vice-reitora e do diretor-geral do Campus Curitiba',
    category: 'Eventos',
    department: 'Reitoria e Campus Curitiba',
    date: '08/03/2024',
    content:
      'Vanessa Ishikawa é empossada como vice-reitora e Paulo Daniel assume Campus Curitiba.',
    author: 'Assessoria de Comunicação',
    link: 'https://www.utfpr.edu.br/noticias/geral/solenidade-marca-posse-da-vice-reitoria-e-direcao-geral-do-campus-curitiba',
  },
];

export function NewsScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(mockData.map((item) => item.category)));

  const filteredData = mockData.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedCategory(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.description}>
            Notícias institucionais, pesquisas, eventos e conquistas da comunidade universitária
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

            {selectedCategory && (
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
              <InfoCard key={item.id} data={item} type="news" />
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
