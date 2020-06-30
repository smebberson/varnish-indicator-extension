const button = {
    active: false,
    status: null,
};

const buttonActive = {
    [true]: 'blue',
    [false]: 'grey',
};

const buttonStatus = {
    hit: 'green',
    miss: 'red',
};

const isVarnishPresent = ({ headers = [] } = {}) =>
    headers.some(({ name }) => ['x-varnish', 'x-varnish-cache'].includes(name));

const varnishStatus = ({ headers = [] } = {}) => {
    const hitMissHeader = headers.find(
        ({ name }) => name === 'x-varnish-cache',
    );

    if (hitMissHeader) {
        return hitMissHeader.value.toLowerCase();
    }

    const varnishHeader = headers.find(({ name }) => name === 'x-varnish');

    if (varnishHeader) {
        return varnishHeader.value.split(' ').length >= 2 ? 'hit' : 'miss';
    }

    return null;
};

chrome.webRequest.onHeadersReceived.addListener(
    (details) => {
        if (details.type === 'main_frame') {
            const headers = details.responseHeaders;
            button.active = isVarnishPresent({ headers });
            button.status = varnishStatus({ headers });
        }
    },
    {
        urls: ['http://*/*', 'https://*/*'],
    },
    ['responseHeaders'],
);

chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.frameId === 0) {
        chrome.pageAction.setIcon({
            path: `img/${
                (button.status && buttonStatus[button.status]) ||
                buttonActive[button.active]
            }.png`,
            tabId: details.tabId,
        });
    }
});
