CREATE TABLE "users" (
    id  INT PRIMARY KEY NOT NULL,
    username    CHAR(50) NOT NULL,
    password    CHAR(100) NOT NULL,
    salt        CHAR(50) NOT NULL
);

CREATE TABLE "queue" (
    id  INT PRIMARY KEY NOT NULL,
    url TEXT NOT NULL,
    author      INT NOT NULL,
    upVotes     INT NOT NULL,
    downnVotes  INT NOT NULL
);