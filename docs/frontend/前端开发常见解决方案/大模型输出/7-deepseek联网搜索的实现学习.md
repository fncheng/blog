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

最新的联网搜索输出内容

```json
{
  "v": [
    {
      "url": "https://www.news.cn/politics/20250826/5bc5327a27314b69b19790400a98424d/c.html",
      "title": "海河流域启动防汛Ⅳ级应急响应和洪水防御Ⅳ级应急响应",
      "snippet": "新华社天津8月26日电（记者 徐思钰）记者从水利部海河水利委员会获悉，自8月26日12时起，海河防总启动防汛Ⅳ级应急响应，海委启动洪水防御Ⅳ级应急响应。  据预报，8月26日至28日，海河流域中北部自西向东先后有中到大雨，部分地区有暴雨，局地有大暴雨。受降雨影响，滦河、北三河、永定河、大清河将出现明显涨水过程。经研究，自8月26日12时起，海河防总启动防汛Ⅳ级应急响应，海委启动洪水防御Ⅳ级应急响应",
      "cite_index": 1,
      "published_at": 1756137600.0,
      "site_name": "新华网",
      "site_icon": "https://cdn.deepseek.com/site-icons/news.cn"
    },
    {
      "url": "https://k.sina.cn/article_1643971635_61fd04330200150pc.html?from=news&subch=onews",
      "title": "今天全世界都在看的新闻 2025.8.26",
      "snippet": "特朗普期待与金正恩会面  美国总统特朗普25日与到访的韩国总统李在明会晤，推进朝鲜半岛和平成为两人会晤的焦点议题。特朗普表示，他与朝鲜领导人金正恩的关系非常好，并期待与他再次会面。  以军空袭加沙医院5名记者遇难  以军25日对位于汗尤尼斯的加沙南部最大医院、纳赛尔医院连续发动两次袭击，已造成至少20人死亡。哈马斯媒体办公室25日表示，以军发动袭击时，各大媒体记者正在纳赛尔医院进行新闻报道，袭击造",
      "cite_index": 2,
      "published_at": 1756137600.0,
      "site_name": "新浪新闻",
      "site_icon": "https://cdn.deepseek.com/site-icons/sina.cn"
    },
  ]
}
```







## 此外deepseek的历史会话内容是如何缓存的呢

其实是存储在indexDB中，通过历史记录中的id一一对应
