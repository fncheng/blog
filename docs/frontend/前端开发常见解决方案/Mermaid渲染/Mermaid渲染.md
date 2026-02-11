## mermaid.render和mermaid.run

| 对比点         | mermaid.render | mermaid.run |
| -------------- | -------------- | ----------- |
| 输入           | Mermaid 字符串 | DOM         |
| 输出           | SVG 字符串     | 直接改 DOM  |
| 控制力         | ⭐⭐⭐⭐⭐          | ⭐⭐          |
| 适合 Vue/React | ✅ 非常适合     | ❌ 不推荐    |
| 错误处理       | 好做           | 难          |
| 动态更新       | 好做           | 容易翻车    |

