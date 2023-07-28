export const getPathFragment = (url: string) => {
  const pathList = url.split('/');

  const lastIndex = pathList.length - 1;

  if (Number(pathList[lastIndex]) > 0) {
    pathList.pop();

    return pathList.join('/');
  }

  return url;
};
