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
const Animals = [
  {
    id: '5',
    parentId: '0',
    text: 'Dog',
    level: '1',
    children: null,
  },
  {
    id: '8',
    parentId: '5',
    text: 'Puppy',
    level: '2',
    children: null,
  },
  {
    id: '10',
    parentId: '13',
    text: 'Cat',
    level: '1',
    children: null,
  },
  {
    id: '14',
    parentId: '13',
    text: 'Kitten',
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

