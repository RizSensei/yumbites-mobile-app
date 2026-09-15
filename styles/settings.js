import { StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const settingsStyles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, marginHorizontal: 20 },
  header: { alignItems: 'center', paddingTop: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.primary, marginBottom: 8 },
  headerSubtitle: { fontSize: 16, color: '#666', textAlign: 'center' },
  section: { marginBottom: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 12, marginLeft: 4 },
  sectionContent: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  settingsItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, paddingHorizontal: 16, minHeight: 60 },
  itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  itemTextContainer: { marginLeft: 12, flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: '500', color: '#333', marginBottom: 2 },
  itemDescription: { fontSize: 13, color: '#666' },
  itemSeparator: { height: 1, backgroundColor: '#f0f0f0', marginLeft: 48 },
  badge: { backgroundColor: Colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  appInfo: { alignItems: 'center', paddingVertical: 20 },
  appInfoText: { fontSize: 13, color: '#999', marginBottom: 4 },
});
