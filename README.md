Convert MySql DDL to Typescript Interface

![guide](https://github.com/bluehymn/ddl-to-ts/raw/develop/images/guide.gif)

```
CREATE TABLE `account_period` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `month` varchar(20) DEFAULT NULL COMMENT '月份',
  `start_date` varchar(19) DEFAULT NULL COMMENT '开始日期',
  `end_date` varchar(19) DEFAULT NULL COMMENT '结束日期',
  `company_id` bigint(20) DEFAULT NULL COMMENT '公司id',
  `company_name` varchar(20) DEFAULT NULL COMMENT '公司名称',
  `create_id` bigint(20) DEFAULT NULL COMMENT '创建用户id',
  `create_username` varchar(50) DEFAULT NULL COMMENT '创建用户登陆名',
  `create_time` varchar(19) DEFAULT NULL COMMENT '创建时间',
  `update_id` bigint(20) DEFAULT NULL COMMENT '更新用户id',
  `update_username` varchar(50) DEFAULT NULL COMMENT '更新用户登录名',
  `update_time` varchar(19) DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='对账期间表';
```



```
export interface AccountPeriod {
  id?: number;
  /**
   * 月份
   */
  month?: string;
  /**
   * 开始日期
   */
  start_date?: string;
  /**
   * 结束日期
   */
  end_date?: string;
  /**
   * 公司id
   */
  company_id?: number;
  /**
   * 公司名称
   */
  company_name?: string;
  /**
   * 创建用户id
   */
  create_id?: number;
  /**
   * 创建用户登陆名
   */
  create_username?: string;
  /**
   * 创建时间
   */
  create_time?: string;
  /**
   * 更新用户id
   */
  update_id?: number;
  /**
   * 更新用户登录名
   */
  update_username?: string;
  /**
   * 更新时间
   */
  update_time?: string;
  [k: string]: any;
}
```
