// document.createDocumentFragment()
// - append children elts to it one by one -> is not written to the dom
// - then append it to the parent div -> all elts are written at once

function buildHnElement(sourceData) {
    if (!sourceData) return null

    const hnArticleElement = document.createElement('a')
    hnArticleElement.setAttribute('href', sourceData.source.targetUrl)
    hnArticleElement.innerText = sourceData.title

    return hnArticleElement
}

const currentTimeMs = new Date().getTime()

fetch(`https://cdnapi.pnd.gs/v2/feeds?limit=30&page=1&sort=popular&sources=hackerNews&timestamp=${currentTimeMs}`)
    .then(hnData => hnData.json())
    .then(hnDataJsonBody => {
        const hnListDiv = document.getElementById('hn-list')
        const hnListFragment = document.createDocumentFragment()
        const hnUlDiv = document.createElement('ul')

        hnUlDiv.append(
            ...hnDataJsonBody
                .map(buildHnElement)
                .map(el => {
                    const hnLi = document.createElement('li')
                    hnLi.appendChild(el)

                    return hnLi
                })
        )

        hnListFragment.appendChild(hnUlDiv)
        hnListDiv.appendChild(hnListFragment)
    })