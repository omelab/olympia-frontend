type CategoryType = {
  id: number;
  title: string;
  children: ChildType[];
};

type ChildType = {
  id: number;
  key?: string;
  title: string;
  children: ChildType[];
};

// need to change this function

export const treeData = (categories: any) => {
  return categories?.map((category: CategoryType) => ({
    value: category.id.toString(),
    title: category.title,
    children: category.children.map(mapChildrenValue),
  }));
};
export const treeDataWithKey = (categories: any) => {
  return categories?.map((category: CategoryType) => ({
    key: category.id.toString(),
    title: category.title,
    children: category.children.map(mapChildren),
  }));
};

function mapChildren(child: ChildType): ChildType {
  return {
    id: child.id,
    key: child.id.toString(),
    title: child.title,
    children: child.children.length ? child.children.map(mapChildren) : [],
  };
}
function mapChildrenValue(child: any) {
  return {
    id: child.id,
    value: child.id.toString(),
    title: child.title,
    children: child.children.length ? child.children.map(mapChildren) : [],
  };
}
// need to change this function
