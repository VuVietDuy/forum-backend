USE forum_dev;

SELECT * FROM question
INNER JOIN question_tag ON question_tag.questionId = question.id;

SELECT * FROM question;

SELECT q.id, q.title, q.detail, q.expecting, q.context, q.createdBy, u.fullname AS author, u.id, GROUP_CONCAT(t.name SEPARATOR '#') AS tags
      FROM question q
      LEFT JOIN question_tag qt ON q.id = qt.questionId
      LEFT JOIN tag t ON qt.tagName = t.name
      LEFT JOIN user u ON u.id = q.createdBy
      GROUP BY q.id;
      
SELECT DISTINCT q.id, q.title, q.detail, q.expecting, q.context, q.createdBy, u.fullname AS author, u.id, GROUP_CONCAT(t.name SEPARATOR '#') AS tags
      FROM question q
      LEFT JOIN question_tag qt ON q.id = qt.questionId
      LEFT JOIN tag t ON qt.tagName = t.name
      LEFT JOIN user u ON u.id = q.createdBy
      WHERE q.id = 1
      GROUP BY q.id      
      
      
      