import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type ContentType = 'university' | 'news' | 'opportunity' | 'internship' | 'event';

interface CreateFormsProps {
  type: ContentType;
  onBack: () => void;
  onSuccess: () => void;
}

export function CreateForms({ type, onBack, onSuccess }: CreateFormsProps) {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const formConfigs = {
    university: {
      title: 'Nova Informação Institucional',
      icon: 'school',
      fields: [
        { key: 'title', label: 'Título', placeholder: 'Ex: Calendário Acadêmico 2024' },
        { key: 'category', label: 'Categoria', placeholder: 'Ex: Acadêmico' },
        { key: 'department', label: 'Departamento', placeholder: 'Ex: Secretaria' },
        {
          key: 'description',
          label: 'Descrição',
          placeholder: 'Descreva a informação...',
          multiline: true,
        },
        { key: 'link', label: 'Link (opcional)', placeholder: 'https://...' },
      ],
    },
    news: {
      title: 'Nova Notícia',
      icon: 'newspaper',
      fields: [
        { key: 'title', label: 'Título', placeholder: 'Título da notícia' },
        { key: 'category', label: 'Categoria', placeholder: 'Ex: Pesquisa' },
        { key: 'department', label: 'Departamento', placeholder: 'Ex: Comunicação' },
        {
          key: 'content',
          label: 'Conteúdo',
          placeholder: 'Escreva o conteúdo da notícia...',
          multiline: true,
        },
        { key: 'author', label: 'Autor', placeholder: 'Nome do autor' },
      ],
    },
    opportunity: {
      title: 'Nova Oportunidade Acadêmica',
      icon: 'trophy',
      fields: [
        { key: 'title', label: 'Título', placeholder: 'Nome da oportunidade' },
        {
          key: 'type',
          label: 'Tipo',
          placeholder: 'Ex: Bolsa, Intercâmbio, Competição',
        },
        { key: 'institution', label: 'Instituição', placeholder: 'Nome da instituição' },
        { key: 'deadline', label: 'Prazo', placeholder: 'DD/MM/AAAA' },
        {
          key: 'description',
          label: 'Descrição',
          placeholder: 'Descreva a oportunidade...',
          multiline: true,
        },
        { key: 'value', label: 'Valor (opcional)', placeholder: 'R$ 0,00' },
        { key: 'link', label: 'Link para inscrição', placeholder: 'https://...' },
      ],
    },
    internship: {
      title: 'Nova Vaga de Estágio',
      icon: 'briefcase',
      fields: [
        { key: 'title', label: 'Cargo', placeholder: 'Ex: Estagiário em TI' },
        { key: 'company', label: 'Empresa', placeholder: 'Nome da empresa' },
        { key: 'location', label: 'Localização', placeholder: 'Cidade, Estado' },
        { key: 'modality', label: 'Modalidade', placeholder: 'Presencial/Híbrido/Remoto' },
        { key: 'department', label: 'Área', placeholder: 'Ex: Tecnologia' },
        {
          key: 'description',
          label: 'Descrição',
          placeholder: 'Descreva as atividades e requisitos...',
          multiline: true,
        },
        { key: 'salary', label: 'Bolsa', placeholder: 'R$ 0,00' },
        { key: 'workload', label: 'Carga Horária', placeholder: 'Ex: 6h/dia' },
      ],
    },
    event: {
      title: 'Novo Evento',
      icon: 'calendar',
      fields: [
        { key: 'title', label: 'Nome do Evento', placeholder: 'Nome do evento' },
        { key: 'type', label: 'Tipo', placeholder: 'Ex: Workshop, Palestra' },
        { key: 'date', label: 'Data', placeholder: 'DD/MM/AAAA' },
        { key: 'time', label: 'Horário', placeholder: 'HH:MM' },
        { key: 'location', label: 'Local', placeholder: 'Local do evento' },
        { key: 'organizer', label: 'Organizador', placeholder: 'Quem organiza' },
        {
          key: 'description',
          label: 'Descrição',
          placeholder: 'Descreva o evento...',
          multiline: true,
        },
        { key: 'capacity', label: 'Vagas (opcional)', placeholder: 'Número de vagas' },
      ],
    },
  };

  const config = formConfigs[type];

  const handleSubmit = () => {
    // Validate required fields
    const emptyFields = config.fields
      .filter((field) => !field.key.includes('opcional') && !formData[field.key])
      .map((field) => field.label);

    if (emptyFields.length > 0) {
      Alert.alert('Campos obrigatórios', `Preencha: ${emptyFields.join(', ')}`);
      return;
    }

    // Simulate submission
    Alert.alert(
      'Sucesso!',
      `${config.title.replace('Nov', 'Cadastrad')} com sucesso!`,
      [{ text: 'OK', onPress: onSuccess }]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name={config.icon as any} size={32} color="#030213" />
          </View>
          <Text style={styles.formTitle}>{config.title}</Text>
        </View>

        <View style={styles.form}>
          {config.fields.map((field) => (
            <View key={field.key} style={styles.inputGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={[
                  styles.input,
                  field.multiline && styles.textArea,
                ]}
                placeholder={field.placeholder}
                value={formData[field.key] || ''}
                onChangeText={(text) =>
                  setFormData({ ...formData, [field.key]: text })
                }
                multiline={field.multiline}
                numberOfLines={field.multiline ? 4 : 1}
                textAlignVertical={field.multiline ? 'top' : 'center'}
              />
            </View>
          ))}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onBack}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#f3f3f5',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#030213',
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#030213',
  },
  input: {
    backgroundColor: '#f3f3f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#030213',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ececf0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#717182',
  },
  submitButton: {
    backgroundColor: '#030213',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
