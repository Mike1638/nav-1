const $siteList = $('.siteList')
const $last = $siteList.find('.last')
const x = localStorage.getItem('x');
const xObject = JSON.parse(x)
const hashMap = xObject || [{
        logo: 'A',
        logoType: 'text',
        url: 'https://www.acfun.cn',
    },
    {
        logo: 'B',
        logoType: 'text',
        url: 'https://www.bilibili.com',
    }
]


const simpleX = (url) => {
    return url.replace('https://', '')
        .replace('https://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //. 正则表达式 删除/开头的内容
}

const render = () => {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        console.log(index);
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">
                    ${node.logo}
                </div>
                <div class="link">${simpleX(node.url)}</div>
             <div class='close'> <svg class="icon">
             <use xlink:href="#icon-close"></use>
         </svg></div>
                </div>  
        </li>
        `).insertBefore($last);
        $li.on('click', () => {
            window.open(node.url);
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        })
    })
}
render();

$('.addButton').on('click', (e) => {
    let url = window.prompt('请输入想要保存的网址')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    hashMap.push({
        logo: simpleX(url)[0].toUpperCase(),
        logoType: 'text',
        url: url,
    })
    render();
})

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string)
};

$(document).on('keypress', (e) => {
    const key = e.key;
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})