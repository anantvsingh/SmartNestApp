import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { DeviceContext } from '../context/DeviceContext';
import { useTheme } from '../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { devices, updateDevice } = useContext(DeviceContext);
  const { colors } = useTheme();

  const renderControls = (item: any) => {
    switch (item.type) {
      case 'lights':
        return (
          <Pressable
            style={[
              styles.toggle,
              {
                backgroundColor: item.state.on
                  ? '#4CAF50'
                  : '#ccc',
              },
            ]}
            onPress={() =>
              updateDevice(item._id, {
                on: !item.state.on,
              })
            }
          >
            <Text style={styles.toggleText}>
              {item.state.on ? 'ON' : 'OFF'}
            </Text>
          </Pressable>
        );

      case 'thermostat':
        return (
          <View style={styles.row}>
            <Pressable
              style={styles.circleBtn}
              onPress={() =>
                updateDevice(item._id, {
                  temperature:
                    item.state.temperature - 1,
                })
              }
            >
              <Text style={styles.circleText}>−</Text>
            </Pressable>

            <Text style={styles.temp}>
              {item.state.temperature}°C
            </Text>

            <Pressable
              style={styles.circleBtn}
              onPress={() =>
                updateDevice(item._id, {
                  temperature:
                    item.state.temperature + 1,
                })
              }
            >
              <Text style={styles.circleText}>+</Text>
            </Pressable>
          </View>
        );

      case 'Main Door Lock':
        return (
          <Pressable
            style={[
              styles.lockBtn,
              {
                backgroundColor: item.state.locked
                  ? '#e53935'
                  : '#43a047',
              },
            ]}
            onPress={() =>
              updateDevice(item._id, {
                locked: !item.state.locked,
              })
            }
          >
            <Text style={styles.lockText}>
              {item.state.locked
                ? 'LOCKED'
                : 'UNLOCKED'}
            </Text>
          </Pressable>
        );

      default:
        return null;
    }
  };

  const renderStatus = (item: any) => {
    if (item.type === 'light')
      return item.state.on ? 'ON' : 'OFF';
    if (item.type === 'thermostat')
      return `${item.state.temperature}°C`;
    if (item.type === 'lock')
      return item.state.locked
        ? 'LOCKED'
        : 'UNLOCKED';
  };

  return (
    <SafeAreaView style={styles.container}>
    <Text style={styles.heading}>Smart Nest</Text>
    <FlatList
      data={devices}
      keyExtractor={(item: any) => item._id}
      renderItem={({ item }) => (
        <Animated.View
          style={[
            styles.card,
            { backgroundColor: colors.cardBackground },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { color: colors.text },
              ]}
            >
              {item.type.toUpperCase()}
            </Text>
            <Text
              style={[
                styles.status,
                { color: colors.textSecondary },
              ]}
            >
              {renderStatus(item)}
            </Text>
          </View>

          {renderControls(item)}
        </Animated.View>
      )}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
  },

  /* Light toggle */
  toggle: {
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
  },
  toggleText: {
    color: '#fff',
    fontWeight: '600',
  },

  /* Thermostat */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  temp: {
    fontSize: 20,
    fontWeight: '600',
  },

  /* Lock */
  lockBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  lockText: {
    color: '#fff',
    fontWeight: '600',
  },
});
