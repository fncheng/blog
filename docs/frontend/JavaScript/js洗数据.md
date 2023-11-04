一维数组结构转tree

https://stackoverflow.com/questions/18017869/build-tree-array-from-flat-array-in-javascript

类比小孩点名

```js
const People = [
  {
    id: '12',
    parentId: '0',
    text: 'Man',
    level: '1',
    children: null,
  },
  {
    id: '6',
    parentId: '12',
    text: 'Boy',
    level: '2',
    children: null,
  },
  {
    id: '7',
    parentId: '12',
    text: 'Other',
    level: '2',
    children: null,
  },
  {
    id: '9',
    parentId: '0',
    text: 'Woman',
    level: '1',
    children: null,
  },
  {
    id: '11',
    parentId: '9',
    text: 'Girl',
    level: '2',
    children: null,
  },
];

function list_to_tree(list) {
  let map = {},
    roots = [];
  for (const item of list) {
    item.children = []; // initialize the children
    map[item.id] = item; // initialize the map  // map里面的数据就是数组里面的数组
  }
  console.log(map);
  for (const item of list) {
    // if element know his parentId
    if (item.parentId) {
      // not the first element
      if (item.parentId !== '0') {
        map[item.parentId].children.push(item);
      } else {
        roots.push(item);
      }
    } else {
      roots.push(item);
    }
  }
  return roots;
}
console.log(list_to_tree(People));
```

映射

使用递归的方法

```js
function arrayToTree(arr, parent = null) {
  const tree = [];
  for (const item of arr) {
    if (item.parentId === parent) {
      const children = arrayToTree(arr, item.id);
      if (children.length) {
        item.children = children;
      }
      tree.push(item);
    }
  }
  return tree;
}

// 示例数据
const data = [
  { id: 1, name: 'Node 1', parentId: null },
  { id: 2, name: 'Node 2', parentId: 1 },
  { id: 3, name: 'Node 3', parentId: 1 },
  { id: 4, name: 'Node 4', parentId: 2 },
  { id: 5, name: 'Node 5', parentId: 3 },
];

const tree = arrayToTree(data);

```





## 从树结构中查找指定节点

```js
function findNodeByTitle(tree, targetTitle) {
  for (const node of tree) {
    if (node.title === targetTitle) {
      return node; // 找到匹配的对象
    }

    if (node.children && node.children.length > 0) {
      const result = findNodeByTitle(node.children, targetTitle);
      if (result) {
        return result; // 在子树中找到匹配的对象
      }
    }
  }

  return null; // 未找到匹配的对象
}

const targetTitle = "应用";
const foundNode = findNodeByTitle(treeData, targetTitle);

if (foundNode) {
  console.log("找到目标对象:", foundNode);
} else {
  console.log("未找到目标对象");
}
```

如果你担心性能问题，可以考虑使用循环迭代而不是递归。以下是一个示例，使用迭代方法来查找目标对象的代码：

```js
function findNodeByTitleIterative(tree, targetTitle) {
  const stack = [...tree];

  while (stack.length > 0) {
    const node = stack.pop();

    if (node.title === targetTitle) {
      return node; // 找到匹配的对象
    }

    if (node.children && node.children.length > 0) {
      stack.push(...node.children);
    }
  }

  return null; // 未找到匹配的对象
}

const targetTitle = "应用";
const foundNode = findNodeByTitleIterative(treeData, targetTitle);

if (foundNode) {
  console.log("找到目标对象:", foundNode);
} else {
  console.log("未找到目标对象");
}
```

