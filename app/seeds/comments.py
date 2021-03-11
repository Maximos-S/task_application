from app.models import db, Comment

# Adds a demo user, you can add other users here if you want


def seed_comments():

    comment1 = Comment(content='Laura tried to do this but failed', taskId=1)
    comment2 = Comment(content='Bob was able to finish this task', taskId=1)
    comment3 = Comment(content='Good job Bob', taskId=1)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_comments():
    db.session.execute('TRUNCATE comments;')
    db.session.commit()
