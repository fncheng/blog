## DeepSeek联网搜索中的文本溯源超链接跳转是如何实现的呢

首先是模型输出的第三行：

会将所有搜索的网页通过search_results返回


```json
{
  "choices": [
    {
      "index": 0,
      "delta": {
        "type": "search_result",
        "search_results": [
          {
            "url": "https://new.qq.com/rain/a/20250304A09HVA00",
            "title": "区委书记李晨昊调研宝钢工程技术集团有限公司",
            "snippet": "中钢国际党委书记､董事长,宝钢工程技术集团有限公司董事长陆鹏程,中钢国际党委副书记､副董事长,宝钢工程技术集团有限公司总经理赵恕昆等领导参加｡      李晨昊指出,近年来,面对复杂多变的外部环境和多重因素挑战,宝钢工程技术集团有限公司以科技创新为驱动,推进产业数字化智能化绿色化深度融合,积极推动企业转型,不断开拓国际市场,为宝山经济社会发展作出了重要贡献｡面向未来,宝山对企业的发展充满信心｡",
            "published_at": 1741089640.0,
            "site_name": "腾讯网",
            "site_icon": "https://cdn.deepseek.com/site-icons/qq.com"
          }
        ]
      }
    }
  ],
  "model": "",
  "chunk_token_usage": 0,
  "created": 1743410334,
  "message_id": 17,
  "parent_id": 16
}
```

而大模型输出的内容为[citation:2]，显示出来为4，对应search_results中下标为3的值



## 此外deepseek的历史会话内容是如何缓存的呢

其实是存储在indexDB中，通过历史记录中的id一一对应
