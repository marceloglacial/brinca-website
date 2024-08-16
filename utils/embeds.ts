export const getYouTubeId = (url: any) => {
    var ID = '';
    url = url
        ? url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
        : [];
    if (url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    } else {
        ID = url;
    }
    return ID;
};

// @see https://stackoverflow.com/questions/2916544/parsing-a-vimeo-id-using-javascript
export const getVimeoId = (url: string) => {
    const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
    const parseUrl = regExp.exec(url) || [];
    return parseUrl[5];
};
