// https://cdnapi.pnd.gs/v2/feeds?limit=30&page=1&sort=popular&sources=productHunt&timestamp=1517487663211

function buildColumnElement(sourceData) {
    if (!sourceData) return null

    const columnEntryElement = document.createElement('a')
    columnEntryElement.setAttribute('href', sourceData.source.targetUrl)
    columnEntryElement.setAttribute('target', '_blank')
    columnEntryElement.innerText = sourceData.title

    return columnEntryElement
}

// const currentTimeMs = new Date().getTime()

enum FeedSource {
    HackerNews = 'https://cdnapi.pnd.gs/v2/feeds?limit=30&page=1&sort=popular&sources=hackerNews',
    ProductHunt = 'https://cdnapi.pnd.gs/v2/feeds?limit=30&page=1&sort=popular&sources=productHunt'
}

async function fetchColumnData(sourceUrl: FeedSource) {
    const rawResponse = await fetch(sourceUrl)

    return rawResponse.json()
}

function buildColumn(anchorDivId: string, sourceData: object[]) {
    const columnDiv = document.getElementById(anchorDivId)
    const columnFragment = document.createDocumentFragment()
    const entryUlDiv = document.createElement('ul')

    entryUlDiv.append(
        ...sourceData
            .map(buildColumnElement)
            .map(el => {
                const hnLi = document.createElement('li')
                hnLi.appendChild(el)

                return hnLi
            })
    )

    columnFragment.appendChild(entryUlDiv)
    columnDiv.appendChild(columnFragment)

    return columnDiv
}

async function loadAndBuildColumn(anchorDivId: string, sourceUrl: FeedSource) {
    const feedEntries = await fetchColumnData(sourceUrl)

    return buildColumn(anchorDivId, feedEntries)
}

Promise.all(
    [
        loadAndBuildColumn('hn-list', FeedSource.HackerNews),
        loadAndBuildColumn('ph-list', FeedSource.ProductHunt)
    ]
)