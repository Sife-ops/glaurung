// todo: too much any
export const mapDataToIds = (ids: any[], key: any) => (data: any) => {
  return ids.map((id) => data.filter((datum: any) => datum[key] === id));
};
