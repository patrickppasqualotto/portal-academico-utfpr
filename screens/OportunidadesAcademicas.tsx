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
    title: 'Bolsa de Iniciação Científica - CNPq',
    type: 'Bolsa',
    institution: 'CNPq',
    deadline: '30/03/2024',
    description:
      'Programa de bolsas para estudantes de graduação desenvolverem projetos de pesquisa científica sob orientação de professores doutores.',
    value: 'R$ 700,00/mês',
    link: 'https://cnpq.br/ic',
  },
  {
    id: '2',
    title: 'Programa de Dupla Diplomação',
    type: 'Intercâmbio',
    institution: 'UTFPR & IPB',
    deadline: '15/04/2024',
    description:
      'A Pró-Reitoria de Graduação e Educação Profissional (PROGRAD) da UTFPR anuncia a abertura das inscrições para o Programa de Dupla Diplomação em Engenharia entre a UTFPR e o Groupe INSA (INSA Lyon, Rennes, Rouen Normandie, Strasbourg e Centre Val de Loire - França)',
    value: null,
    link: 'https://www.utfpr.edu.br/editais/graduacao-e-educacao-profissional/doisvizinhos/edital-no-27-2025-dirgrad-dirge-dv-programa-de-dupla-diplomacao-entre-o-curso-engenharia-de-bioprocessos-e-biotecnologia-utfpr-campus-dois-vizinhos-brasil-e-o-instituto-politecnico-de-braganca-ipb-portugal',
  },
  {
    id: '3',
    title: 'Hackathon Jovem Programador 2024',
    type: 'Competição',
    institution: 'SENAC Santa Catarina',
    deadline: '30/11/2024',
    description:
      'O Hackathon Jovem Programador visa estimular os alunos no desenvolvimento de soluções para problemas complexos, utilizando os conhecimentos adquiridos durante o curso.',
    value: null,
    link: 'https://www.jovemprogramador.com.br/hackathon/',
  },
  {
    id: '4',
    title: 'UTFPR abre inscrições para o Programa Soma com bolsas de R$ 700',
    type: 'Bolsa',
    institution: 'UTFPR - Universidade Tecnológica Federal do Paraná',
    deadline: '10/06/2025',
    description:
      'Estudantes selecionados irão atuar no suporte aos colegas junto aos Nuapes.',
    value: 'R$ 700,00/mês',
    link: 'https://www.utfpr.edu.br/noticias/londrina/utfpr-abre-inscricoes-para-o-programa-soma-com-bolsas-de-r-700',
  },
  {
    id: '5',
    title: 'UTFPR Londrina abre inscrições para o Programa de Monitoria 2025.2',
    type: 'Bolsa',
    institution: 'UTFPR - Universidade Tecnológica Federal do Paraná',
    deadline: '11/08/2025',
    description:
      'Programa de monitoria para alunos auxiliarem professores em disciplinas específicas.',
    value: null,
    link: 'https://www.utfpr.edu.br/noticias/londrina/utfpr-londrina-abre-inscricoes-para-o-programa-de-monitoria-2025-2',
  },
  {
    id: '6',
    title: 'Programa de Educação Tutorial - PET',
    type: 'Programa Acadêmico',
    institution: 'UTFPR',
    deadline: '20/04/2024',
    description:
      'O Programa de Educação Tutorial (PET) é composto por grupos tutoriais de aprendizagem e busca propiciar aos alunos, sob a orientação de um professor tutor, condições para a realização de atividades extracurriculares, que têm como objetivo garantir aos alunos do curso oportunidades de vivenciar experiências não presentes em estruturas curriculares convencionais, visando a sua formação global e favorecendo a formação acadêmica, tanto para a integração no mercado profissional quanto para o desenvolvimento de estudos em programas de pós-graduação. O apoio financeiro do MEC/SESu pode ser concedido ao estudante bolsista até a conclusão da sua graduação e ao professor tutor por três anos, podendo ser prorrogável por iguais períodos, conforme parecer da Comissão de Avaliação do PET.',
    value: null,
    link: 'https://www.utfpr.edu.br/editais#c5=abertos&b_start=0&c7=%2FPlone%2Feditais%2Fgraduacao-e-educacao-profissional&c12=tutorial',
  },
];

export function AcademicOpportunitiesScreen() {
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
            Bolsas de estudo, programas de intercâmbio, competições acadêmicas e oportunidades de desenvolvimento
          </Text>

          <FilterSection
            visible={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
          >
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Tipo</Text>
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
              {filteredData.length === 1 ? 'oportunidade' : 'oportunidades'}
            </Text>
          </View>

          <View style={styles.list}>
            {filteredData.map((item) => (
              <InfoCard key={item.id} data={item} type="opportunity" />
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
