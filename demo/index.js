document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('demo-app')

  Cignium.init(element, {
    actionListPosition: 'bottom',
    debug: true,
    endpoint: location.hash.substring(1),

    onRedirect: (url, content) => {
      console.info('onRedirect - before url change')

      setTimeout(() => {
        console.info('onRedirect - after url change')
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
