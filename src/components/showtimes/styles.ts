import { StyleSheet } from "react-native"
export default StyleSheet.create({
    container: {
    gap: 24,
  },
  cinemaSection: {
    gap: 12,
  },
  cinemaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cinemaName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timePill: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  timePillSelected: {
    backgroundColor: '#fff',
    borderColor: '#e50914',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  timeTextSelected: {
    color: '#e50914',
    fontWeight: '600',
  },
  buyButton: {
    backgroundColor: '#e50914',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buyButtonDisabled: {
    backgroundColor: '#ccc',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
})