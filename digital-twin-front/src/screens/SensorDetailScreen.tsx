import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Alert,
  Dimensions,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import {
  Canvas,
  Path,
  Skia,
  Line,
  Text as SkiaText,
  Circle,
  useFont,
} from "@shopify/react-native-skia";
import { useApiUrl } from "../context/ApiUrlContext";

type SensorDetailRouteParams = {
  sensor: {
    id: string;
    name: string;
    unit: string;
    currentValue: number;
    status: "OK" | "Alerta";
  };
};

type SensorDetailScreenRouteProp = RouteProp<
  { SensorDetail: SensorDetailRouteParams },
  "SensorDetail"
>;

interface Reading {
  id: number;
  sensorId: string;
  value: number;
  timestamp: string;
}

const SkiaChart: React.FC<{ readings: Reading[] }> = ({ readings }) => {
  const { width } = Dimensions.get("window");
  const chartWidth = width - 32;
  const chartHeight = 250;
  const padding = { top: 20, bottom: 40, left: 50, right: 20 };

  const font = useFont(require("../../assets/fonts/Roboto-Regular.ttf"), 10);

  // Filter readings to show only last 30 minutes and take max 8 readings
  const now = new Date().getTime();
  const thirtyMinutesAgo = now - 30 * 60 * 1000; // 30 minutes in milliseconds

  const filteredReadings = readings.filter((reading) => {
    const readingTime = new Date(reading.timestamp).getTime();
    return readingTime >= thirtyMinutesAgo;
  });

  // Take the last 8 readings for a smaller time window
  const recentReadings = filteredReadings.slice(-8);

  if (!recentReadings || recentReadings.length < 1) {
    return (
      <View
        style={{
          width: chartWidth,
          height: chartHeight,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#666", fontSize: 16 }}>
          Dados insuficientes para exibir o gráfico
        </Text>
      </View>
    );
  }

  if (!font) {
    return (
      <View
        style={{
          width: chartWidth,
          height: chartHeight,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Carregando fonte...</Text>
      </View>
    );
  }

  const data = recentReadings.map((r) => ({
    x: new Date(r.timestamp).getTime(),
    y: r.value,
  }));

  const minX = Math.min(...data.map((d) => d.x));
  const maxX = Math.max(...data.map((d) => d.x));

  // Use actual data values for Y scale with some padding
  const minY = Math.min(...data.map((d) => d.y));
  const maxY = Math.max(...data.map((d) => d.y));
  const yPadding = (maxY - minY) * 0.1; // 10% padding
  const adjustedMinY = Math.max(0, minY - yPadding);
  const adjustedMaxY = maxY + yPadding;

  const domainX = maxX - minX === 0 ? 1 : maxX - minX;
  const domainY =
    adjustedMaxY - adjustedMinY === 0 ? 1 : adjustedMaxY - adjustedMinY;

  const scaleX = (x: number) =>
    padding.left +
    ((x - minX) / domainX) * (chartWidth - padding.left - padding.right);
  const scaleY = (y: number) =>
    chartHeight -
    padding.bottom -
    ((y - adjustedMinY) / domainY) *
      (chartHeight - padding.top - padding.bottom);

  // Create path for the line
  const path = Skia.Path.Make();
  data.forEach((point, index) => {
    const x = scaleX(point.x);
    const y = scaleY(point.y);
    if (index === 0) {
      path.moveTo(x, y);
    } else {
      path.lineTo(x, y);
    }
  });

  // Generate Y labels based on actual data range
  const yStep = (adjustedMaxY - adjustedMinY) / 4;
  const yLabels = [];
  for (let i = 0; i <= 4; i++) {
    yLabels.push(adjustedMinY + yStep * i);
  }

  // Generate X labels - show more time points for better readability
  const xLabelCount = Math.min(6, Math.max(3, data.length));
  const xLabels = [];
  for (let i = 0; i < xLabelCount; i++) {
    const index = Math.floor(((data.length - 1) * i) / (xLabelCount - 1));
    xLabels.push(data[index].x);
  }

  return (
    <Canvas style={{ width: chartWidth, height: chartHeight }}>
      {/* Grid lines */}
      {yLabels.map((label, index) => {
        const y = scaleY(label);
        return (
          <Line
            key={`grid-y-${index}`}
            p1={{ x: padding.left, y }}
            p2={{ x: chartWidth - padding.right, y }}
            color="#f0f0f0"
            strokeWidth={1}
          />
        );
      })}

      {/* Axes */}
      <Line
        p1={{ x: padding.left, y: padding.top }}
        p2={{ x: padding.left, y: chartHeight - padding.bottom }}
        color="gray"
        strokeWidth={2}
      />
      <Line
        p1={{ x: padding.left, y: chartHeight - padding.bottom }}
        p2={{ x: chartWidth - padding.right, y: chartHeight - padding.bottom }}
        color="gray"
        strokeWidth={2}
      />

      {/* Data line */}
      <Path path={path} style="stroke" color="#007bff" strokeWidth={3} />

      {/* Data points */}
      {data.map((point, index) => {
        const x = scaleX(point.x);
        const y = scaleY(point.y);
        return (
          <Circle key={`point-${index}`} cx={x} cy={y} r={4} color="#007bff" />
        );
      })}

      {/* Y-axis labels */}
      {yLabels.map((label, index) => (
        <SkiaText
          key={`y-${index}`}
          x={padding.left - 45}
          y={scaleY(label) + 4}
          text={label.toFixed(1)}
          font={font}
          color="gray"
        />
      ))}

      {/* X-axis labels */}
      {xLabels.map((ts, index) => (
        <SkiaText
          key={`x-${index}`}
          x={scaleX(ts) - 15}
          y={chartHeight - padding.bottom + 20}
          text={new Date(ts).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
          font={font}
          color="gray"
        />
      ))}
    </Canvas>
  );
};

const SensorDetailScreen: React.FC = () => {
  const route = useRoute<SensorDetailScreenRouteProp>();
  const navigation = useNavigation();
  const { sensor } = route.params;
  const { apiUrl } = useApiUrl();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReadings = useCallback(
    async (isManualRefresh = false) => {
      if (!apiUrl) {
        setError("URL da API não configurada. Por favor, configure-a.");
        return;
      }
      try {
        if (isManualRefresh) {
          setIsRefreshing(true);
        }
        setError(null);
        const response = await fetch(`${apiUrl}/readings/${sensor.id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Erro ao buscar leituras: Status ${response.status}. Detalhes: ${
              errorText || "N/A"
            }`
          );
        }
        const data: Reading[] = await response.json();
        setReadings(data);
        if (isManualRefresh) {
          Alert.alert("Sucesso", "Gráfico atualizado com sucesso!");
        }
      } catch (err: any) {
        console.error("Erro ao buscar leituras:", err);
        setError(`Não foi possível carregar as leituras: ${err.message}`);
        if (isManualRefresh) {
          Alert.alert(
            "Erro",
            `Falha ao carregar leituras do sensor. Detalhes: ${err.message}`
          );
        }
      } finally {
        if (isManualRefresh) {
          setIsRefreshing(false);
        }
      }
    },
    [apiUrl, sensor.id]
  );

  useEffect(() => {
    setLoading(true);
    fetchReadings().finally(() => setLoading(false));
  }, [fetchReadings]);

  // Auto-refresh readings every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (apiUrl && !loading && !isPosting && !isRefreshing) {
        fetchReadings(false);
      }
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [apiUrl, loading, isPosting, isRefreshing, fetchReadings]);

  const handleRegisterReading = useCallback(async () => {
    if (!apiUrl) {
      Alert.alert(
        "Erro",
        "URL da API não configurada. Por favor, configure-a."
      );
      return;
    }
    try {
      setIsPosting(true);
      const randomValue = (Math.random() * 100).toFixed(2);
      const timestamp = new Date().toISOString();

      const params = new URLSearchParams();
      params.append("sensorId", sensor.id);
      params.append("value", randomValue);
      params.append("timestamp", timestamp);

      const response = await fetch(`${apiUrl}/readings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Erro ao registrar leitura: Status ${response.status}. Detalhes: ${
            errorText || "N/A"
          }`
        );
      }

      Alert.alert("Sucesso", "Nova leitura registrada com sucesso!");
      await fetchReadings();
    } catch (err: any) {
      console.error("Erro ao registrar leitura:", err);
      Alert.alert(
        "Erro",
        `Não foi possível registrar a leitura: ${err.message}`
      );
    } finally {
      setIsPosting(false);
    }
  }, [apiUrl, sensor.id, fetchReadings]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Carregando leituras...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchReadings}>
          <Text style={styles.retryButtonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sensor.name}</Text>
      <Text style={styles.currentValue}>
        Valor Atual: {sensor.currentValue} {sensor.unit}
      </Text>
      <Text
        style={{
          color: sensor.status === "OK" ? "green" : "red",
          fontWeight: "bold",
        }}
      >
        Status: {sensor.status}
      </Text>

      <Text style={styles.subtitle}>Histórico de Leituras:</Text>
      {readings.length > 1 ? (
        <SkiaChart readings={readings} />
      ) : (
        <Text style={styles.noReadingsText}>
          Nenhuma leitura registrada para este sensor
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title={isRefreshing ? "Atualizando..." : "Atualizar Gráfico"}
          onPress={() => fetchReadings(true)}
          disabled={isPosting || isRefreshing}
        />
        <Button
          title="Registrar Leitura"
          onPress={handleRegisterReading}
          disabled={isPosting}
        />
      </View>
      {isPosting && <ActivityIndicator style={{ marginTop: 10 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  currentValue: {
    fontSize: 18,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  noReadingsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});

export default SensorDetailScreen;
