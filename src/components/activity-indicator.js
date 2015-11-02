import React from 'react'
import StyleSheet from 'stilr'

export default ({requests}) => {
  if (!Object.keys(requests).length) {
    return <div />
  }

  return (
    <div className={`${styles.root} ct-activity-indicator`}>
      loading...
    </div>
  )
}

const styles = StyleSheet.create({
  root: {
    color: '#aaa',
    fontSize: 12,
    height: 10,
    marginBottom: 25,
    marginRight: -30,
    marginTop: -35,
    textTransform: 'uppercase',
    textAlign: 'right',
  },
})
