export const TagTile = (newtitle: any = '') => {
  return (newtitle ? document.title = newtitle : null);
};