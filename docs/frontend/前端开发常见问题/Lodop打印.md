## 引入LODOP

```html
<script language="javascript" src="LodopFuncs.js"></script>
<script src="http://localhost:8000/CLodopFuncs.js"></script>
```



## 打印html(超文本打印)

```html
<div id="app">1323</div>
  <script src="http://localhost:8000/CLodopFuncs.js"></script>
  <script>
    var LODOP=getLodop();
    console.log('LODOP: ', LODOP);
    LODOP.PRINT_INIT('firstprint')
    // LODOP.SET_PRINT_PAGESIZE(1,500,300,)
    LODOP.ADD_PRINT_HTM(88, 200, 350, 600,document.getElementById('app').innerHTML)
    LODOP.PRINT()
  </script>
```



## 打印条码

ADD_PRINT_BARCODE(Top, Left,Width, Height, CodeType, CodeValue)

前四个参数为number时默认单位px，string时需要加上单位 mm、cm、pt、%

```js
var LODOP=getLodop();
    console.log('LODOP: ', LODOP);
    LODOP.PRINT_INIT('firstprint')
LODOP.ADD_PRINT_BARCODE(88, 200, 350, 600, '128A','12312312')
LODOP.PRINT()
```

```js
const dataObj = {
      name: '杨林林',
      gender: '男',
      age: '59',
      filingDate: '2022-04-21',
      number: 'cervicalCancerNum'
    }
    var LODOP = getLodop();
    console.log('LODOP: ', LODOP);
    LODOP.PRINT_INIT('firstprint')
    LODOP.ADD_PRINT_BARCODE('2mm', '2mm', '48mm', '18mm', '128A', '12312312')
    LODOP.ADD_PRINT_TEXT('22mm', '3mm', '', '', dataObj.name)
    LODOP.ADD_PRINT_TEXT('22mm', '16mm', '', '', dataObj.gender)
    LODOP.ADD_PRINT_TEXT('22mm', '23mm', '', '', dataObj.age + '岁')
    LODOP.ADD_PRINT_TEXT('22mm', '32mm', '', '', '妇保科')
    LODOP.ADD_PRINT_TEXT('26mm', '3mm', '', '', '宫颈癌检查')
    LODOP.ADD_PRINT_TEXT('26mm', '28mm', '', '', dataObj.filingDate)
    LODOP.PRINT()
```

