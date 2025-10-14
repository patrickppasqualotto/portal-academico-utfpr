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
    title: 'Estagiário de Desenvolvimento de Software',
    company: 'Certus',
    location: 'Dois Vizinhos, PR',
    modality: 'Presencial',
    department: 'Tecnologia',
    description:
      'Buscamos estudante de Engenharia de Software ou áreas afins para atuar no desenvolvimento de aplicações web com React e Node.js. Requisitos: conhecimento em JavaScript, Git e bancos de dados.',
    salary: 'R$ 300,00',
    workload: '6h/dia',
    date: '2024-03-15',
    link: 'https://certtus.com.br/trabalhe-conosco/',
  },
  {
    id: '2',
    title: 'Estagiário Administrativo',
    company: 'CISS',
    location: 'Dois Vizinhos, PR',
    modality: 'Presencial',
    department: 'Administração',
    description:
      'poiar a equipe de contratos administrativos em atividades operacionais e de controle, contribuindo para a organização, análise e acompanhamento dos processos contratuais.',
    salary: 'R$ 1.200,00',
    workload: '4h/dia',
    date: '2024-03-14',
    link: 'https://prd-pc1.lg.com.br/Vagas/c/6C6ABB4D-4AA7-448F-9F0A-0CB9E95E0345/p/portaldocandidato/pt-BR/Vaga/Divulgacao?codigo=204',
  },
  {
    id: '3',
    title: 'Estagiário Contábil/Fiscal',
    company: 'CISS',
    location: 'Dois Vizinhos, PR',
    modality: 'Presencial',
    department: 'Contabilidade',
    description:
      'Apoiar a equipe contábil e fiscal nas rotinas operacionais e de controle, contribuindo para a organização dos processos, cumprimento das obrigações legais e desenvolvimento técnico na área.',
    salary: 'R$ 1.600,00',
    workload: '6h/dia',
    date: '2024-03-13',
    link: 'https://prd-pc1.lg.com.br/Vagas/c/6C6ABB4D-4AA7-448F-9F0A-0CB9E95E0345/p/portaldocandidato/pt-BR/Vaga/Divulgacao?codigo=205',
  },
  {
    id: '4',
    title: 'Estagiário Desenvolvimento',
    company: 'CISS',
    location: 'Dois Vizinhos, PR',
    modality: 'Remoto',
    department: 'Tecnologia',
    description:
      'Apoiar a equipe de desenvolvimento de software em atividades de codificação, testes e manutenção de sistemas, proporcionando aprendizado prático em metodologias e ferramentas utilizadas no ciclo de vida de aplicações.',
    salary: 'R$ 2.000,00',
    workload: '6h/dia',
    date: '2024-03-12',
    link: 'https://prd-pc1.lg.com.br/Vagas/c/6C6ABB4D-4AA7-448F-9F0A-0CB9E95E0345/p/portaldocandidato/pt-BR/Vaga/Divulgacao?codigo=206',
  },
  {
    id: '5',
    title: 'Estágiario Suporte Técnico',
    company: 'CISS',
    location: 'Dois Vizinhos, PR',
    modality: 'Presencial',
    department: 'Suporte Técnico',
    description:
      'Apoiar a equipe de Suporte Técnico nas rotinas de atendimento a usuários, auxiliando na resolução de chamados e dúvidas relacionadas aos software, desenvolvendo habilidades práticas em TI e atendimento ao cliente.',
    salary: 'R$ 1.400,00',
    workload: '5h/dia',
    date: '2024-03-11',
    link: 'https://prd-pc1.lg.com.br/Vagas/c/6C6ABB4D-4AA7-448F-9F0A-0CB9E95E0345/p/portaldocandidato/pt-BR/Vaga/Divulgacao?codigo=207',
  },
  {
    id: '6',
    title: 'Estágiario | Programa de Estágio Cresol União',
    company: 'Cresol',
    location: 'Coronel Vivida, PR',
    modality: 'Presencial',
    department: 'Estágio',
    description:
      'O estagiário (a) terá oportunidade de conhecer todas as áreas da Cresol União!',
    salary: 'R$ 1.400,00',
    workload: '5h/dia',
    date: '2024-03-11',
    link: 'https://cresolcarreiras.gupy.io/jobs/9992249?jobBoardSource=gupy_public_page',
  },
  {
    id: '7',
    title: 'Estágio em Gestão de Projetos de P&D (PMO)',
    company: 'Nitro Agro',
    location: 'Sao Paulo, SP',
    modality: 'Presencial',
    department: 'Estágio',
    description:
      'Na Nitro somos apaixonados pelo que fazemos, agimos com senso de dono e valorizamos a vida. Acreditamos na importância da sustentabilidade, agimos sempre com responsabilidade e segurança. Somos parceiros dos nossos clientes e buscamos levar excelência à sociedade por meio de produtos, serviços e processos que promovem soluções, brilho e vida.',
    salary: 'R$ 1.400,00',
    workload: '5h/dia',
    date: '2024-03-11',
    link: 'https://www.glassdoor.com.br/Vaga/est%C3%A1gio-de-agronomia-vagas-SRCH_KO0,20.htm',
  },
  {
    id: '8',
    title: 'Estágio obrigatório AGRONOMIA',
    company: 'Cravil',
    location: 'Rio do Sul',
    modality: 'Presencial',
    department: 'Estágio',
    description:
      'Chegou a sua chance! Estágio obrigatório em Agronomia na CRAVIL – inscreva-se até 08 de setembro. Importante: é preciso já ter finalizado todas as matérias, ficando pendente somente o estágio. Não perca essa oportunidade!',
    salary: 'R$ 1.400,00',
    workload: '5h/dia',
    date: '2024-03-11',
    link: 'https://www.glassdoor.com.br/Vaga/est%C3%A1gio-de-agronomia-vagas-SRCH_KO0,20.htm',
  },
];

export function InternshipsScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedModality, setSelectedModality] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const modalities = Array.from(new Set(mockData.map((item) => item.modality)));
  const departments = Array.from(new Set(mockData.map((item) => item.department)));

  const filteredData = mockData.filter((item) => {
    if (selectedModality && item.modality !== selectedModality) return false;
    if (selectedDepartment && item.department !== selectedDepartment)
      return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedModality(null);
    setSelectedDepartment(null);
  };

  const hasActiveFilters = selectedModality || selectedDepartment;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.description}>
            Vagas de estágio em empresas parceiras e oportunidades profissionais para estudantes
          </Text>

          <FilterSection
            visible={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
          >
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Modalidade</Text>
              <View style={styles.filterOptions}>
                {modalities.map((modality) => (
                  <TouchableOpacity
                    key={modality}
                    style={[
                      styles.filterChip,
                      selectedModality === modality && styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setSelectedModality(
                        selectedModality === modality ? null : modality
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedModality === modality &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {modality}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Área</Text>
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
              {filteredData.length === 1 ? 'vaga disponível' : 'vagas disponíveis'}
            </Text>
          </View>

          <View style={styles.list}>
            {filteredData.map((item) => (
              <InfoCard key={item.id} data={item} type="internship" />
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
