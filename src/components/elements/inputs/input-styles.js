import StyleSheet from 'stilr'

export default StyleSheet.create({
  input: {
    border: '1px solid #eee',
    borderRadius: 3,
    color: '#444',
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: 300,
    padding: 8,
    width: '100%',

    ':hover': {
      border: '1px solid #ddd',
      boxShadow: 'none',
    },
  },

  invalid: {
    borderColor: '#ED1631',

    ':hover': {
      borderColor: '#CC0302',
    },
  },
})
