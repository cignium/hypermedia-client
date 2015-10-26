let responseTransformer = null

export function getResponseTransformer() {
  return responseTransformer
}

export default {
  setResponseTransformer(transformer) {
    responseTransformer = transformer
  },
}
