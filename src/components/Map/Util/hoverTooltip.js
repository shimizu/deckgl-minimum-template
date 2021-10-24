//マウスオーバーした際にツールチップを表示する
export default  (d, i) => {
    if (!d || !d.object) return null;
    let obj = null;
    obj = d.object;

    if (d.object.properties) obj = d.object.properties;
    const trs = Object.keys(obj)
        .map(key => `<tr><th style="text-align:right">${key}</th><td>${obj[key]}</td></tr>`)
        .join("\n");
    
    const table = [
        '<table>',
        trs,
        '</table>'
    ].join("\n");
    return {
        html: table,
        style: {
            fontSize: '0.5em'
        }
    }
}