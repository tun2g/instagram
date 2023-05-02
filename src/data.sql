DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS refreshtokens;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
	userid int4 PRIMARY KEY,
	username varchar(30) NOT NULL,
	password varchar(100) NOT NULL,
	fullname varchar(20) NOT NULL,
	avatar varchar(100) NOT NULL,
  	createdAt TIMESTAMP WITH TIME ZONE
);
CREATE TABLE posts(
	postid int4 PRIMARY KEY,
	userid int4 NOT NULL,
	description varchar,
	imageurl varchar(100),
	createdAt TIMESTAMP WITH TIME ZONE
)
;
CREATE TABLE likes(
	userid int4 NOT NULL,
	postid int4 NOT NULL
);
CREATE TABLE comments(
	commentid int4 PRIMARY KEY,
	userid int4 NOT NULL,
	postid int4 NOT NULL,
	content varchar NOT NULL,
	createdAt TIMESTAMP WITH TIME ZONE
);
CREATE TABLE refreshtokens(
	userid int4 PRIMARY KEY,
	refreshtoken varchar
);
ALTER TABLE posts
ADD CONSTRAINT posts_user_id_fkey
FOREIGN KEY (userid)
REFERENCES users (userid);


ALTER TABLE likes
ADD CONSTRAINT like_user_id_fkey
FOREIGN KEY (userid)
REFERENCES users (userid);

ALTER TABLE likes
ADD CONSTRAINT like_post_id_fkey
FOREIGN KEY (postid)
REFERENCES posts (postid);


ALTER TABLE refreshtokens
ADD CONSTRAINT token_user_id_fkey
FOREIGN KEY (userid)
REFERENCES users (userid);

ALTER TABLE comments
ADD CONSTRAINT comment_post_id_fkey
FOREIGN KEY (postid)
REFERENCES posts (postid);

ALTER TABLE comments
ADD CONSTRAINT comment_user_id_fkey
FOREIGN KEY (userid)
REFERENCES users (userid);

ALTER TABLE users ADD COLUMN description varchar;

CREATE TABLE follows(
	userid int4,
	followuser int4,
);

ALTER TABLE follows
ADD CONSTRAINT follow_user_id_fkey
FOREIGN KEY (userid)
REFERENCES users (userid);

ALTER TABLE follows
ADD CONSTRAINT follow_fl_user_id_fkey
FOREIGN KEY (followuser)
REFERENCES users (userid);


