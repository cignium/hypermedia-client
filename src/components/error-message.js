export default ({ requestError, documentErrors }) => {
  if (requestError) {
    return (
      <div className='ct-error-container'>
        {requestError.message}
      </div>
    )
  }

  if (documentErrors && documentErrors.length) {
    return (
      <div className='ct-error-container'>
        <ul className='ct-error-list'>
          {documentErrors.map((error, index) =>
            <li className='ct-error-list-message' key={index}>{error}</li>
          )}
        </ul>
      </div>
    )
  }

  if (documentErrors && documentErrors.length) {
    return (
      <div className='ct-error-container'>
        <ul className='ct-error-list'>
          {documentErrors.map((error, index) =>
            <li className='ct-error-list-message' key={index}>{error}</li>
          )}
        </ul>
      </div>
    )
  }

  return <div />
}
