from app.models import db, Task

# Adds a demo user, you can add other users here if you want


def seed_tasks():

    daily = Task(
                listId=1, 
                title="Walk Dog",
                description="Walk the dog around the block, make sure he does his business ;)"
                )
    daily2 = Task(
                listId=1, 
                title="Make Coffee",
                description="This is very important, don't forget"
                )
    weekly = Task(
                listId=2, 
                title="Water Plants",
                description="This is also very important, don't forget"
                )
    monthly = Task(
                listId=3, 
                title="Pay Rent",
                description="This is also very, very important, don't forget"
                )

    db.session.add(daily)
    db.session.add(daily2)
    db.session.add(weekly)
    db.session.add(monthly)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_tasks():
    db.session.execute('TRUNCATE tasks;')
    db.session.commit()
