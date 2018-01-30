

const hnListDiv = document.getElementById('hn-list')
const hnElement = document.createElement('a')
hnElement.setAttribute('href', 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement')
hnElement.innerText = 'This is a link to a doc'

hnListDiv.appendChild(hnElement)

console.log('hnListDivhnListDiv: ', hnListDiv)

// document.createDocumentFragment()
// - append children elts to it one by one -> is not written to the dom
// - then append it to the parent div -> all elts are written at once