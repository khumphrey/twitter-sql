DELETE FROM Users;
VACUUM;

INSERT INTO Users (name, pictureUrl) VALUES ('Donald Trump', 'http://i.imgur.com/CTil4ns.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Ted Cruz', 'http://i.imgur.com/Ru6KUIm.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Bernie Sanders', 'http://i.imgur.com/KhisgEO.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Hillary Clinton', 'http://i.imgur.com/XbsjDcr.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Marco Rubio', 'http://i.imgur.com/cYxVyyg.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('John Kasich', 'http://i.imgur.com/I8WtzSw.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Kanye West', 'http://i.imgur.com/MItGWVS.jpg');
INSERT INTO Users (name, pictureUrl) VALUES ('Taylor Swift', 'http://i.imgur.com/JKInSVz.jpg');

DELETE FROM Tweets;
VACUUM;

INSERT INTO Tweets (userId, content) VALUES (1, 'Make Fullstack great again!');
INSERT INTO Tweets (userId, content) VALUES (2, 'We need a shutdown of Fullstack until Avalon is allowed again.');
INSERT INTO Tweets (userId, content) VALUES (3, 'Fullstack should be free for all!');
INSERT INTO Tweets (userId, content) VALUES (4, 'It takes a village to raise a programmer.');
INSERT INTO Tweets (userId, content) VALUES (5, 'They''re making Promises they cannot resolve.');
INSERT INTO Tweets (userId, content) VALUES (6, 'Only one person tweeting here has ever written Hello World.');
INSERT INTO Tweets (userId, content) VALUES (7, 'I''ma let you finish coding, but…');
INSERT INTO Tweets (userId, content) VALUES (8, 'I knew you were trouble when you forgot to handle errors.');
INSERT INTO Tweets (userId, content) VALUES (7, 'I think what Kanye West is going to mean is something similar to what Steve Jobs means.');
INSERT INTO Tweets (userId, content) VALUES (8, 'I''ve got some whitespace baby — and I''ll write your `.name`');
