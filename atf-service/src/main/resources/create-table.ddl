#########

DROP TABLE IF EXISTS shop_ad;
DROP TABLE IF EXISTS shop_ad_kind;
DROP TABLE IF EXISTS payment_method;
DROP TABLE IF EXISTS withdrawal_date;
DROP TABLE IF EXISTS shop_ad_deal;

CREATE TABLE shop_ad (
  id bigint not null auto_increment,
  shop_id integer not null,
  shop_owner_id integer not null,
  category_id integer,
  address varchar(255),
  latitude bigint not null,
  longitude bigint not null,
  start_date datetime,
  end_date datetime,
  shop_ad_deal_id bigint null,
  payment_method_id bigint null,
  shop_ad_kind_id bigint null,
  withdrawal_date_id bigint null,
  deleted bool default false,
  created_date datetime,
  modified_date datetime,
  primary key (id)
) ENGINE=InnoDB;

CREATE TABLE payment_method (
  id bigint not null auto_increment,
  shop_owner_id bigint not null,
  payment_method_type varchar(255) not null,
  account_number varchar(255),
  credit_card_number varchar(255),
  deleted bool default false,
  created_date datetime,
  modified_date datetime,
  primary key (id)
) ENGINE=InnoDB;

CREATE TABLE shop_ad_kind (
  id integer not null auto_increment,
  name varchar(255) not null,
  description varchar(255),
  price integer not null,
  deleted bool default false,
  created_date datetime,
  modified_date datetime,
  primary key (id)
) ENGINE=InnoDB;

CREATE TABLE withdrawal_date (
  id bigint not null auto_increment,
  day integer not null,
  primary key (id)
) ENGINE=InnoDB;


CREATE TABLE shop_ad_deal (
  id bigint auto_increment primary key,
  registration_date datetime not null,
  comment varchar(255) null,
  status varchar(100) not null,
  dsm_id bigint(20) null,
  dsm_user_id varchar(255) null,
  dsm_name varchar(255) null,
  deleted tinyint(1) default '0' null,
  created_date datetime null,
  modified_date datetime null
) ENGINE=InnoDB;


CREATE TABLE `payment_method` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `shop_owner_id` bigint(20) NOT NULL,
  `payment_method_type` varchar(255) NOT NULL,
  `account_number` varchar(255) DEFAULT NULL,
  `credit_card_number` varchar(255) DEFAULT NULL,
  `payment_id` bigint(20) NOT NULL,
  `bank_id` bigint(20) DEFAULT NULL,
  `authentication_number` varchar(45) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=365 DEFAULT CHARSET=utf8;



INSERT INTO shop_ad_kind (id, name, description, price, created_date, modified_date) VALUES (1, "울트라콜T1", "울트라콜 테스트 1", 7000, now(), now());
INSERT INTO shop_ad_kind (id, name, description, price, created_date, modified_date) VALUES (2, "울트라콜T2", "울트라콜 테스트 2", 8000, now(), now());

INSERT INTO withdrawal_date (id, day) VALUES (1, 5);
INSERT INTO withdrawal_date (id, day) VALUES (2, 15);
INSERT INTO withdrawal_date (id, day) VALUES (3, 25);

INSERT INTO payment_method (id, shop_owner_id, payment_method_type, credit_card_number, created_date, modified_date) VALUES (1, 0, "CreditCard", "00-credit-card", now(), now());
INSERT INTO payment_method (id, shop_owner_id, payment_method_type, account_number, created_date, modified_date) VALUES (2, 0, "BankAccount", "000-bank-account", now(), now());

