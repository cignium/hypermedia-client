document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('demo-app')

  Cignium.init(element, {
    actionListPosition: 'bottom',
    endpoint: location.hash.substring(1),

    onProcessComplete: (url, content) => {
      console.info('process complete - before url change')

      setTimeout(() => {
        console.info('process complete - after url change')
      })

      if (content) {
        return {
          content: (content.match(/<body>((.|\r|\n)*)<\/body>/) || [])[1] || content,
          title: 'Process Complete',
        }
      }
    },

    onUrlChange: url => {
      console.info(`url: '${url}'`)
    },

    onValueChange: (id, value) => {
      console.info(`id: '${id}' value: '${value}'`)
    },
  })
})

window.addEventListener('hashchange', () => {
  Cignium.navigate(location.hash.substring(1))
})
