// HomeScreenStyles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topSection: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dateText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sortBtn: {
    color: '#fff',
    marginRight: 10,
    fontSize: 14,
    fontWeight: '600',
  },
  searchInput: {
    backgroundColor: '#f3f2ff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
    color: '#333',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d1c4e9',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  filter: {
    color: '#888',
    fontSize: 14,
  },
  activeFilter: {
    fontWeight: 'bold',
    color: '#6C63FF',
  },
  middleSection: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 4,
    color: '#6C63FF',
  },
  taskItem: {
    flexDirection: 'row',
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 30,
    color: '#fff',
  },
  bottomTabs: {
    flexDirection: 'row',
    height: 90,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#f3f2ff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 14,
  },
});
