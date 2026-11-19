
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

export default function HomeScreen() {
  const [registro, setRegistro] = useState('');
  const [valor, setValor] = useState('');

  const [registros, setRegistros] = useState([
    {
      id: 1,
      texto: 'Exemplo de gasto',
      tipo: 'gasto',
      valor: '100.00',
    },
    {
      id: 2,
      texto: 'Exemplo de ganho',
      tipo: 'ganho',
      valor: '200.00',
    },
  ]);

  function adicionarRegistro() {
    if (!registro.trim() || !valor.trim()) return;

    const novoRegistro = {
      id: Date.now(),
      texto: registro.trim(),
      tipo: 'gasto',
      valor: valor.replace(',', '.'),
    };

    setRegistros([...registros, novoRegistro]);
    setRegistro('');
    setValor('');
  }

  function mudarTipoRegistro(id: number) {
    setRegistros(
      registros.map((registro) =>
        registro.id === id
          ? {
            ...registro,
            tipo:
              registro.tipo === 'gasto' ? 'ganho' : 'gasto',
          }
          : registro
      )
    );
  }

  function excluirRegistro(id: number) {
    setRegistros(
      registros.filter((registro) => registro.id !== id)
    );
  }

  const receitas = registros.reduce(
    (acc, registro) =>
      registro.tipo === 'ganho'
        ? acc + Number(registro.valor.replace(',', '.'))
        : acc,
    0
  );

  const despesas = registros.reduce(
    (acc, registro) =>
      registro.tipo === 'gasto'
        ? acc + Number(registro.valor.replace(',', '.'))
        : acc,
    0
  );

  const saldo = receitas - despesas;

  function formatarValor(valor: number) {
    return valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.blocoResumo}>
        <Text style={styles.labelSaldo}>
          Saldo total
        </Text>

        <Text style={styles.saldo}>
          R$ {formatarValor(saldo)}
        </Text>

        <View style={styles.resumoValores}>
          <View style={styles.resumoItem}>
            <View style={styles.resumoTitulo}>
              <Ionicons
                name="trending-up"
                size={18}
                color="#2e9c2e"
              />
              <Text style={styles.labelResumo}>
                Receitas
              </Text>
            </View>

            <Text style={styles.receita}>
              R$ {formatarValor(receitas)}
            </Text>
          </View>

          <View style={styles.resumoItem}>
            <View style={styles.resumoTitulo}>
              <Ionicons
                name="trending-down"
                size={18}
                color="#e53935"
              />
              <Text style={styles.labelResumo}>
                Despesas
              </Text>
            </View>

            <Text style={styles.despesa}>
              R$ {formatarValor(despesas)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bloco}>
        <View style={styles.cabecalho}>
          <Ionicons
            name="list-circle"
            size={28}
            color="#2e9c2e"
          />

          <Text style={styles.title}>
            Controle Financeiro
          </Text>
        </View>

        <Text style={styles.label}>Nome:</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome do registro"
          value={registro}
          onChangeText={setRegistro}
        />

        <Text style={styles.label}>Valor (R$):</Text>

        <TextInput
          style={styles.input}
          placeholder="R$ 0,00"
          keyboardType="decimal-pad"
          value={valor}
          onChangeText={(text) => {
            const numeros = text.replace(/\D/g, '');
            const centavos = (Number(numeros) / 100).toFixed(2);
            setValor(centavos.replace('.', ','));
          }}
        />

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarRegistro}
        >
          <Ionicons
            name="add-circle"
            size={22}
            color="#fff"
          />

          <Text style={styles.botaoAdicionarTexto}>
            ADICIONAR REGISTRO
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bloco}>
        <Text style={styles.tituloLista}>
          Transações
        </Text>

        {registros.map((registro) => (
          <View
            key={registro.id}
            style={styles.registroContainer}
          >
            <TouchableOpacity
              style={styles.registroTexto}
              onPress={() => mudarTipoRegistro(registro.id)}
            >
              <Ionicons
                name={
                  registro.tipo === 'ganho'
                    ? 'arrow-up-circle-outline'
                    : 'arrow-down-circle-outline'
                }
                size={24}
                color={
                  registro.tipo === 'ganho'
                    ? '#2e9c2e'
                    : '#e53935'
                }
              />

              <View style={styles.registroInfo}>
                <Text>
                  {registro.texto}
                </Text>

                <Text style={styles.registroSubtitulo}>
                  {registro.tipo === 'ganho'
                    ? 'Receita'
                    : 'Despesa'}
                </Text>
              </View>

              <Text
                style={[
                  styles.registroValor,
                  {
                    color:
                      registro.tipo === 'ganho'
                        ? '#2e9c2e'
                        : '#e53935',
                  },
                ]}
              >
                {registro.tipo === 'ganho' ? '+' : '-'} R${' '}
                {formatarValor(
                  Number(registro.valor.replace(',', '.'))
                )}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoExcluir}
              onPress={() => excluirRegistro(registro.id)}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#e53935"
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
  },

  blocoResumo: {
    backgroundColor: '#fff',
    margin: 16,
    marginBottom: 8,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },

  labelSaldo: {
    fontSize: 14,
    color: '#667085',
  },

  saldo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e9c2e',
    marginTop: 4,
    marginBottom: 20,
  },

  resumoValores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },

  resumoItem: {
    flex: 1,
  },

  resumoTitulo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 6,
  },

  labelResumo: {
    fontSize: 13,
    color: '#667085',
  },

  receita: {
    color: '#2e9c2e',
    fontSize: 18,
    fontWeight: 'bold',
  },

  despesa: {
    color: '#e53935',
    fontSize: 18,
    fontWeight: 'bold',
  },

  bloco: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },

  cabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#20252b',
  },

  label: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    color: '#222',
  },

  botaoAdicionar: {
    backgroundColor: '#2e9c2e',
    padding: 14,
    borderRadius: 8,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  botaoAdicionarTexto: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },

  tituloLista: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#20252b',
    marginBottom: 8,
  },

  registroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  registroTexto: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    minWidth: 0,
  },

  registroInfo: {
    flex: 1,
    marginLeft: 10,
    minWidth: 0,
  },

  registroNome: {
    fontSize: 14,
    color: '#333',
  },

  registroSubtitulo: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
  },

  registroValor: {
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 8,
  },

  botaoExcluir: {
    paddingLeft: 12,
    paddingVertical: 4,
  },
});
