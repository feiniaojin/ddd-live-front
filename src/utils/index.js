import {message} from 'antd';

//样式名称合并
export const clsnames = (...args) => {
    return args.filter(p => typeof p === 'string' && p.trim()).join(' ')
}
//根据平层数据组装为树形数据
export const cloneTree = (score, parentId = "0") => {
    let tree = []
    score.map(item => {
        if (item.parentCode === parentId) {
            item.children = cloneTree(score, item.itemCode)
            tree.push(item)
        }
    })
    return tree;
}
export const appendScript = (url) => {
    let head = document.getElementsByTagName("head")[0];
    let script = document.createElement("script");
    script.src = url;
    script.type = "text/javascript";
    head.appendChild(script);
}
export const appendLink = (url) => {
    let head = document.getElementsByTagName("head")[0];
    let link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    head.appendChild(link);
};
export const getUrlParam = (name) => {
    let getPath =  window.location.search;
    const reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)");
    const r = getPath.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    } else {
        const getPaths =  window.location.hash;
        const l = getPaths.substr(1).match(reg);
        if (l != null) {
            return unescape(l[2]);
        }
    }
    return "";
};
export  function writeToClipboard(text,desc) {
    // navigator.clipboard.writeText(text)
    //   .then(() => {
    //     message.success("文本已成功复制到剪贴板！");
    //   })
    //   .catch((error) => {
    //     console.error("无法复制文本到剪贴板：", error);
    //   });
    var textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    message.success(desc||"文本已成功复制到剪贴板！");
  }