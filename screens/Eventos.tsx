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
    title: 'Codecon Summit 2025 - Festival de Inovação e Tecnologia',
    type: 'Festival',
    date: '18/07/2025 – 19/07/2025',
    time: '09:00',
    location: 'Viasoft Experience - Curitiba',
    organizer: 'Codecon',
    description:
      'A Codecon Summit é um festival que reunirá inovação, tecnologia, código e diversão.',
    capacity: '50',
    link: 'https://eventos.codecon.dev/codecon-summit-25/',
  },
  {
    id: '2',
    title: 'Hackathon Jovem Programador 2024',
    type: 'Competição',
    date: '30/11/2024',
    time: '08:00',
    location: 'Teatro Universitário',
    organizer: 'SENAC Santa Catarina',
    description:
      'O Hackathon Jovem Programador visa estimular os alunos no desenvolvimento de soluções para problemas complexos, utilizando os conhecimentos adquiridos durante o curso.',
    capacity: '200',
    link: 'https://www.jovemprogramador.com.br/hackathon/',
  },
  {
    id: '3',
    title: 'Latinoware 2025',
    type: 'Feira de Tecnologia',
    date: '22/10/2025 – 25/10/2025',
    time: '08:00',
    location: 'Itaipu Parquetec - Foz do Iguaçu',
    organizer: 'Itaipu Binacional',
    description:
      'O Latinoware 2025, maior evento de Software Livre e Tecnologias Abertas da América Latina, acontecerá de 22 a 25 de outubro no Itaipu Parquetec, em Foz do Iguaçu.',
    capacity: '1000+',
    link: 'https://latinoware.org/credenciamento-latinoware-2025/',
  },
  {
    id: '4',
    title: 'Web Summit Rio 2026',
    type: 'Conferência de Tecnologia',
    date: '08/06/2026 – 11/06/2026',
    time: '08:00',
    location: 'Rio de Janeiro',
    organizer: 'Web Summit',
    description:
      'A Web Summit é uma das maiores conferências de tecnologia do mundo, reunindo startups, investidores e líderes da indústria para discutir as últimas tendências e inovações tecnológicas.',
    capacity: '30.000+',
    link: 'https://rio.websummit.com',
  },
  {
    id: '5',
    title: 'DevPR Conf 25 - Especial 10 anos',
    type: 'Palestras e Networking',
    date: '13/09/2025',
    time: '07:30  – 18:00',
    location: 'Ginásio do Colégio Objetivo - Maringá, PR',
    organizer: 'DevParana',
    description:
      'O DevParaná é uma comunidade 100 % voluntária que promove meetups, coding dojos, a DevPR Conf e o projeto itinerante DevPR na Estrada.',
    capacity: null,
    link: 'https://doity.com.br/devpr-conf-25',
  },
];

export function EventsScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const types = Array.from(new Set(mockData.map((item) => item.type)));

  const filteredData = mockData.filter((item) => {
    if (selectedType && item.type !== selectedType) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedType(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.description}>
            Eventos acadêmicos, workshops, palestras e atividades extracurriculares
          </Text>

          <FilterSection
            visible={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
          >
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Tipo de Evento</Text>
              <View style={styles.filterOptions}>
                {types.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.filterChip,
                      selectedType === type && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setSelectedType(selectedType === type ? null : type)
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedType === type && styles.filterChipTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {selectedType && (
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
              {filteredData.length === 1 ? 'evento' : 'eventos'}
            </Text>
          </View>

          <View style={styles.list}>
            {filteredData.map((item) => (
              <InfoCard key={item.id} data={item} type="event" />
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
