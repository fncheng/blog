## classNames条件判断

```tsx
import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.css';

function Button(props) {
  const { primary } = props;
  const btnClass = classNames(styles.btn, {
    [styles.primary]: primary,
  });
  return <button className={btnClass}>按钮</button>;
}
```



### classnames样式拼接

```tsx
<p className={classnames(styles.form_item_icon, styles.prefix)}></p>
```

classnames条件判断

```tsx
<p className={classNames({
        [styles.adisabled]: !IS_NBU,
    })}></p>
```

