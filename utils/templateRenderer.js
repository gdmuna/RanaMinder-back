const fs = require('fs');

/**
 * 用变量替换html模板中的${xxx}
 * @param {string} templatePath 模板文件路径
 * @param {object} data 变量对象
 * @returns {string} 渲染后的html
 */
function renderHtmlTemplate(templatePath, data) {
    let html = fs.readFileSync(templatePath, 'utf-8');
    for (const key in data) {
        const reg = new RegExp(`\\$\\{${key}\\}`, 'g');
        html = html.replace(reg, data[key]);
    }
    return html;
}

module.exports = { renderHtmlTemplate };

