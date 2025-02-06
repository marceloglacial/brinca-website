export const getYouTubeId = (url: string): string => {
  if (!url) return '';
  const regex = /(?:https?:\/\/(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*\?v=|\S*\/v\/|v=)|youtu\.be\/))([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : '';
};


// @see https://stackoverflow.com/questions/2916544/parsing-a-vimeo-id-using-javascript
export const getVimeoId = (url: string) => {
  const regExp = /^.*(vimeo\.com\/)((channels\/[A-z]+\/)|(groups\/[A-z]+\/videos\/))?([0-9]+)/;
  const parseUrl = regExp.exec(url) || [];
  return parseUrl[5];
};
export default getVimeoId;
